import s from './App.styling.jsx';
import React from 'react';
import { MapChart } from './MapChart.jsx';
import BarChart from './barChart.jsx';
import image from '/colourscale.png';
import { LineChart } from './lineGraph.jsx';

import { useState, useEffect, useRef } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { defaultCountryState } from './newDataStructure.jsx';
import { getDivisionFromChannel } from './ChannelMapping.jsx';

const time = Date.now();

export const App = () => {
  const [countryState, setCountryState] = useState(defaultCountryState);
  const [stateWorldTotal, setStateWorldTotal] = useState([
    {
      total: 0,
      timestamp: Date.now(),
    },
  ]);

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

  // info for lineGraph world total i.e timestamps + total revenue.
  const convertTime = timeStamp => {
    const timestampInMill = timeStamp * 1000;
    const date = new Date(timestampInMill);

    const hours = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();

    const formattedTime = `${hours}:${mins < 10 ? '0' : ''}${mins}:${
      secs < 10 ? '0' : ''
    }${secs}`;
    return formattedTime;
  };

  const sumTotals = totalGbpPrice => {
    const newTotal =
      stateWorldTotal.total !== undefined
        ? (stateWorldTotal.total += totalGbpPrice)
        : (stateWorldTotal.total = totalGbpPrice);
    return newTotal;
  };

  const handleMessage = event => {
    if (event && event.total_items_price.gbp_value) {
      const newTime = Date.now();
      //console.log(event);
      const totalGbpPrice = event.total_items_price.gbp_value;

      const channel = event.property.channel;

      const countryCode = event.shipping.country_code;
      //console.log(newTime - time);
      if (channel !== 'pmint') {
        if (newTime - time < 180000) {
          //console.log(channel);
          setStateWorldTotal(sumTotals(totalGbpPrice)); //will it save the timestamps ?
          setStateWorldTotal(
            (stateWorldTotal.timestamp = convertTime(event.created_timestamp)),
          );
          console.log(stateWorldTotal.timestamp);
          const division = getDivisionFromChannel(channel);
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
            <MapChart defaultCountryData={countryState} />
          </s.mapStyle>
        </div>
        <BarChart />
        <LineChart defaultWorldRevenue={{ stateWorldTotal }} />
      </div>
    </>
  );
};
