import React from 'react';
import s from './App.styling.jsx';
import { MapChart } from './MapChart.jsx';
import BarChart from './barChart.jsx';
import image from '/colourscale.png';
import { LineChart } from './lineGraph.jsx';
import { useState, useEffect } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { defaultCountryState } from './countryDataStructure.jsx';
import { getDivisionFromChannel } from './ChannelMapping.jsx';
import { Tooltip } from 'react-tooltip';
import { defaultCategoryTotal } from './categoryTotalDataStructure.jsx';
import { channelMapping } from './ChannelMapping.jsx';

const time = Date.now();

const reduceToMinute = date => {
  const minTime = new Date(date);
  minTime.setSeconds(0);
  minTime.setMilliseconds(0);
  return minTime.getTime();
};

export const App = () => {
  const [stateWorldTotal, setStateWorldTotal] = useState({
    [reduceToMinute(Date.now())]: 0.0,
  });
  console.log(stateWorldTotal);
  const [countryState, setCountryState] = useState(defaultCountryState);
  const [countryContent, setCountryContent] = useState('');
  const [divisionContent, setDivisionContent] = useState('');
  const [categoryTotal, setCategoryTotal] = useState(defaultCategoryTotal);
  const [brandState, setBrandState] = useState(channelMapping);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchEventSource('https://accelerator.thgaccess.com/events', {
      onmessage(event) {
        let message = JSON.parse(event.data);
        handleMessage(message);
      },
      onerror(e) {
        console.error(e);
      },
      signal,
      credentials: 'include',
    });
    return () => abortController.abort();
  }, []);

  const handleMessage = event => {
    if (event && event.total_items_price.gbp_value) {
      const newTime = Date.now();
      //console.log(event);
      const totalGbpPrice = event.total_items_price.gbp_value;
      const channel = event.property.channel;
      const division = getDivisionFromChannel(channel);
      const found = channelMapping.some(el => el.channelName === channel);
      const countryCode = event.shipping.country_code;

      if (channel !== 'pmint' && found) {
        if (newTime - time < 180000) {
          // add the new timestamp in
          const tempDict = stateWorldTotal;
          if (tempDict[reduceToMinute(newTime)] !== undefined) {
            // do check for placeholder and add
            tempDict[`${reduceToMinute(newTime)}`] += totalGbpPrice;
          } else {
            tempDict[`${reduceToMinute(newTime)}`] = totalGbpPrice;
          }
          // check if the dict goes more than 10 minutes back, if it does delete the oldest
          const oldestTimestamp = Math.min(...Object.keys(tempDict));
          console.log(tempDict);

          if (reduceToMinute(newTime) - oldestTimestamp > 600000) {
            delete tempDict[oldestTimestamp];
          }
          console.log(tempDict);
          setStateWorldTotal(tempDict);

          setCategoryTotal(categoryTotal => {
            let newCategoryTotal = JSON.parse(JSON.stringify(categoryTotal));
            console.log(newCategoryTotal);
            const orderCategoryIndex = newCategoryTotal.findIndex(
              category => category.category === division,
            );
            newCategoryTotal[orderCategoryIndex].categoryTotal += totalGbpPrice;
            return newCategoryTotal;
          });
          setBrandState(brandState => {
            let newBrandState = JSON.parse(JSON.stringify(brandState));
            if (channel !== null) {
              const orderBrandIndex = newBrandState.findIndex(
                brand => brand.channelName === channel,
              );
              newBrandState[orderBrandIndex].total += totalGbpPrice;
              let newIndex = 0;
              newBrandState.slice(0, 5).forEach((element, index) => {
                if (element.total !== 0) {
                  newIndex = index;
                }
                return newIndex;
              });
              console.log(newBrandState.slice(0, newIndex + 1));
              return newBrandState.sort((a, b) => b.total - a.total);
            }
          });
          setCountryState(countryState => {
            let newCountryState = JSON.parse(JSON.stringify(countryState));
            const orderCountryIndex = newCountryState.findIndex(
              country => country.countryCode === countryCode,
            );
            newCountryState[orderCountryIndex].total += totalGbpPrice;
            if (division === 0) {
              newCountryState[orderCountryIndex].div0 += totalGbpPrice;
            } else if (division === 1) {
              newCountryState[orderCountryIndex].div1 += totalGbpPrice;
            } else if (division === 2) {
              newCountryState[orderCountryIndex].div2 += totalGbpPrice;
            }
            // console.log(newCountryState[orderCountryIndex]);
            return newCountryState;
          });
        } else {
          window.location.reload();
        }
      }
    }
  };

  const displayStyles = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
  };

  return (
    <>
      <div style={{ display: 'grid' }}>
        <s.heading>
          <div className="height">
            <h1>
              <span>The Lovelace Dashboard</span>
            </h1>
          </div>
        </s.heading>
        <div style={displayStyles}>
          <img
            style={{
              borderRadius: '20px',
              margin: '0px 10px',
              height: '40vw',
            }}
            src={image}
            alt="scale gradient"
          />
          <s.mapStyle>
            <Tooltip
              style={{ fontSize: '18px', fontFamily: 'sans-serif' }}
              id="myTooltip"
              opacity={1}
            >
              {countryContent}
              <br />
              {divisionContent}
            </Tooltip>
            <MapChart
              defaultCountryData={countryState}
              setTooltipDivisionContent={setDivisionContent}
              setTooltipCountryContent={setCountryContent}
            />
          </s.mapStyle>
        </div>
        <BarChart categoryTotal={categoryTotal} />
        <LineChart defaultWorldRevenue={{ stateWorldTotal }} />
      </div>
    </>
  );
};
