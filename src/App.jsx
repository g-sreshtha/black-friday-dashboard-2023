import s from './App.styling.jsx';
import React from 'react';
import { MapChart } from './MapChart.jsx';
import BarChart from './newGraph.jsx';
import image from '/colourscale.png';

import { useState, useEffect } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { defaultCountryState } from './newDataStructure.jsx';
import { getDivisionFromChannel } from './ChannelMapping.jsx';
import { Tooltip } from 'react-tooltip';

const time = Date.now();
export const App = () => {
  const [countryState, setCountryState] = useState(defaultCountryState);
  const [stateWorldTotal, setStateWorldTotal] = useState(0);
  const [divisionContent, setDivisionContent] = useState('');
  const [countryContent, setCountryContent] = useState('');

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
      const countryCode = event.shipping.country_code;
      //console.log(newTime - time);
      if (channel !== 'pmint') {
        if (newTime - time < 180000) {
          //console.log(channel);
          setStateWorldTotal(stateWorldTotal => {
            // console.log(stateWorldTotal);
            return stateWorldTotal + totalGbpPrice;
          });
          setCountryState(countryState => {
            //console.log(countryState);
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
          setCountryState(defaultCountryState);
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
          <h1>
            <span>The Lovelace Dashboard</span>
          </h1>
        </s.heading>
        <div style={displayStyles}>
          <img
            style={{
              borderRadius: '20px',
              margin: '5px 100px',
              height: '30rem',
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
        <BarChart />
      </div>
    </>
  );
};
