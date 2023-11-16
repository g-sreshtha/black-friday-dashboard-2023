import s from './App.styling.jsx';
import React from 'react';
import { MapChart } from './Mapchart.jsx';
import BarChart from './newGraph.jsx';
import image from './colourscale.png';

import { useState, useRef, useEffect } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { defaultCountryState } from './newDataStructure.jsx';

const time = Date.now();
export const App = () => {
  const [countryState, setCountryState] = useState(defaultCountryState);
  const [worldTotal, setWorldTotal] = useState(0);
  //const total = useRef(0);

  useEffect(() => {
    // TODO: abort controller stuff

    fetchEventSource('https://accelerator.thgaccess.com/events', {
      onmessage(event) {
        let message = JSON.parse(event.data);
        //console.log(message);
        handleMessage(message);
      },
      onerror(e) {
        console.error(e);
      },
      credentials: 'include',
    });

    // return a signal.abort()
  }, []);

  const handleMessage = event => {
    if (event && event.total_items_price) {
      const newTime = Date.now();
      const totalGbpPrice = event.total_items_price.gbp_value;
      const channel = event.property.channel;
      const countryCode = event.shipping.country_code;
      let newWorldTotal = worldTotal + totalGbpPrice;
      setWorldTotal(newWorldTotal);
      console.log(newWorldTotal);
      //console.log(newTime - time);
      if (channel !== 'pmint') {
        if (newTime - time < 180000) {
          let newCountryState = [...defaultCountryState];
          newCountryState.forEach(country => {
            if (country.countryCode === countryCode) {
              country.total = country.total + totalGbpPrice;
            }
          });
          console.log(channel);
          setCountryState(newCountryState);
          //console.log(countryCode)
          console.log(
            countryState.filter(el => {
              return el.countryCode === countryCode;
            }),
          );
        } else {
          setCountryState(defaultCountryState);
          setWorldTotal(0);
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
      </div>
    </>
  );
};
