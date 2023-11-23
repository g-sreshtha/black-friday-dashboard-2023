import React, { useCallback, useRef } from 'react';
import s from './App.styling.jsx';
import { MapChart } from './MapChart.jsx';
import BarChart from './barChart.jsx';
import image from '/new-bar.png';
import { LineChart } from './lineGraph.jsx';
import { useState, useEffect } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { defaultCountryState } from './countryDataStructure.jsx';
import { getDivisionFromChannel } from './ChannelMapping.jsx';
import { Tooltip } from 'react-tooltip';
import { defaultCategoryTotal } from './categoryTotalDataStructure.jsx';
import { channelMapping } from './ChannelMapping.jsx';
import { Header } from './Header/Header.jsx';

const time = Date.now();

const reduceToMinute = date => {
  const minTime = new Date(date);
  minTime.setSeconds(0);
  minTime.setMilliseconds(0);
  return minTime.getTime();
};

const countryGeos = {
  'United Kingdom': 'geo-56',
  'United States': 'geo-164',
  France: 'geo-53',
  Germany: 'geo-39',
  Italy: 'geo-77',
  Spain: 'geo-48',
  Australia: 'geo-7',
  Japan: 'geo-80',
};

const countryArray = [
  'United Kingdom',
  'United States',
  'France',
  'Germany',
  'Italy',
  'Spain',
  'Australia',
  'Japan',
];

export const App = () => {
  // Get the data required
  // Coordinate which tooltip to show on hover
  // Coordinate which random badge / box to show when intervals in seconds have passed

  const [stateWorldTotal, setStateWorldTotal] = useState({
    [reduceToMinute(Date.now())]: 0.0,
  });
  console.log(stateWorldTotal);
  const [countryState, setCountryState] = useState(defaultCountryState);
  const [divisionContent, setDivisionContent] = useState('');
  const [countryContent, setCountryContent] = useState('');
  const [categoryTotal, setCategoryTotal] = useState(defaultCategoryTotal);
  const [brandState, setBrandState] = useState(channelMapping);

  const [automationData, setAutomationData] = useState(null);
  const currentCountryIndex = useRef(0);
  const [currentCountry, setCurrentCountry] = useState(null);

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

  const getHighestDivision = useCallback(
    country => {
      const desiredData = countryState?.find(
        data => data.countryName === country,
      );

      if (desiredData) {
        const div0 = desiredData.div0;
        const div1 = desiredData.div1;
        const div2 = desiredData.div2;
        const div3 = desiredData.div3;

        let highestDiv = '';
        if (div0 > div1 && div0 > div2 && div0 > div3) {
          highestDiv = `Nutrition: £${div0.toFixed(0)}`;
        } else if (div1 > div2 && div1 > div0 && div1 > div3) {
          highestDiv = `Beauty: £${div1.toFixed(0)}`;
        } else if (div2 > div1 && div2 > div0 && div2 > div3) {
          highestDiv = `Lifestyle: £${div2.toFixed(0)}`;
        } else if (div3 > div0 && div3 > div1 && div3 > div2) {
          highestDiv = `Ingenuity: £${div3.toFixed(0)}`;
        } else {
          highestDiv = '';
        }

        return highestDiv;
      }
    },
    [countryState],
  );

  useEffect(() => {
    const id = countryGeos[currentCountry];
    const country = document.getElementById(id);

    if (country) {
      const position = country.getBoundingClientRect();
      const countryStructure = {};
      //console.log(position);

      countryStructure.name = currentCountry;
      if (currentCountry === 'United States') {
        countryStructure.right = position.right - 20;
        countryStructure.bottom = position.top + 100;
        countryStructure.highestDiv = getHighestDivision(currentCountry);
      } else {
        countryStructure.right = position.right;
        countryStructure.bottom = position.bottom - 30;
        countryStructure.highestDiv = getHighestDivision(currentCountry);
      }

      setAutomationData(countryStructure);
    } else {
      setAutomationData(null);
    }
  }, [currentCountry]);

  useEffect(() => {
    let timeout;
    const interval = setInterval(() => {
      const countryNameToShow = countryArray[currentCountryIndex.current];
      setCurrentCountry(countryNameToShow);
      currentCountryIndex.current++;
      if (currentCountryIndex.current >= countryArray.length) {
        currentCountryIndex.current = 0;
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const updateTooltipContent = hoveredCountry => {
    const h = getHighestDivision(hoveredCountry);
    if (h !== '') {
      setDivisionContent(h);
      setCountryContent(hoveredCountry);
    } else {
      setDivisionContent('');
      setCountryContent(hoveredCountry);
    }
  };

  const handleMessage = event => {
    if (event && event.total_items_price.gbp_value) {
      const newTime = Date.now();

      const totalGbpPrice = event.total_items_price.gbp_value;
      const channel = event.property.channel;
      const countryCode = event.shipping.country_code;
      const division = getDivisionFromChannel(channel);

      if (channel !== 'pmint') {
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
          // console.log(tempDict);

          if (reduceToMinute(newTime) - oldestTimestamp > 600000) {
            delete tempDict[oldestTimestamp];
          }
          setStateWorldTotal(tempDict);

          const found = channelMapping.some(el => el.channelName === channel);
          setCategoryTotal(categoryTotal => {
            let newCategoryTotal = JSON.parse(JSON.stringify(categoryTotal));

            // console.log(newCategoryTotal);
            const orderCategoryIndex = newCategoryTotal.findIndex(
              category => category.category === division,
            );
            newCategoryTotal[orderCategoryIndex].categoryTotal += totalGbpPrice;
            return newCategoryTotal;
          });
          setBrandState(brandState => {
            let newBrandState = JSON.parse(JSON.stringify(brandState));
            //console.log(newBrandState);
            //console.log(channel);
            //console.log(newBrandState);
            //console.log(channel);
            if (channel !== null && found) {
              const orderBrandIndex = newBrandState.findIndex(
                brand => brand.channelName === channel,
              );
              //console.log(orderBrandIndex);
              //console.log(orderBrandIndex);
              newBrandState[orderBrandIndex].total += totalGbpPrice;
              return newBrandState;
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
            console.log(newCountryState[orderCountryIndex]);
            return newCountryState;
          });
        } else {
          setCountryState(defaultCountryState);
          window.location.reload();
        }
      }
    }
  };

  const top10brands = brandState
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
    .map(brand => <li key={brandState.brandName}>{brand.brandName}</li>);

  const handleMouseEnter = geo => {
    const countryName = geo.properties.name;
    updateTooltipContent(countryName);
  };

  const handleMouseLeave = () => {
    setDivisionContent('');
    setCountryContent('');
  };

  //inline styles
  const displayStyles = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  };
  const buttonStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    width: '200px',
    height: '35px',
  };
  const imageStyles = {
    borderRadius: '20px',
    // margin: '100px 10px 10px 30px ',
    margin: '6.25rem 0.65rem 0.65rem 1.875rem ',
    height: '35vw',
    width: '1.75vw',
    // margin: '100px 10px 10px 30px ',
    margin: '6.25rem 0.65rem 0.65rem 1.875rem ',
    height: '35vw',
    width: '1.75vw',
  };

  return (
    <>
      <div style={{ display: 'grid' }}>
        <Header />
        <div style={displayStyles}>
          <img style={imageStyles} src={image} alt="scale gradient" />
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
              id="Map"
              defaultCountryData={countryState}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              // setTooltipDivisionContent={setDivisionContent}
              // setTooltipCountryContent={setCountryContent}
              automationData={automationData}
            />
          </s.mapStyle>
        </div>

        <div
          style={{ ...displayStyles, marginBottom: '70px' }}
          className="button-container"
        >
          <button style={buttonStyles} data-tooltip-id="my-tooltip">
            Revenue
          </button>
          <button data-tooltip-id="my-tootltip2" style={buttonStyles}>
            Top Divisions
          </button>
          <button style={buttonStyles} data-tooltip-id="my-tootltip3">
            Top Brands
          </button>

          <Tooltip
            id="my-tooltip"
            opacity={0.98}
            className="tooltip-rounded"
            openOnClick={['click']}
          >
            <LineChart defaultWorldRevenue={stateWorldTotal} />
          </Tooltip>

          <Tooltip
            id="my-tootltip2"
            opacity={0.98}
            openOnClick={['click']}
            className="tooltip-rounded"
          >
            <BarChart categoryTotal={categoryTotal} />
          </Tooltip>
          <Tooltip
            id="my-tootltip3"
            openOnClick={['click']}
            className="tooltip-rounded"
          >
            <h3 style={{ fontSize: '20px' }}>Current Top 10 Brands</h3>
            <ol style={{ fontSize: '17px' }}>{top10brands}</ol>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
