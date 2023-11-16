import MapChart from './MapChart.jsx';
import s from './App.styling.jsx';
import { useState, useRef } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { defaultCountryState } from './newDataStructure.jsx';

const time = Date.now();
export const App = () => {
  const [countryState, setCountryState] = useState(defaultCountryState);
  const [worldTotal, setWorldTotal] = useState(0);
  //change to useState
  //const total = useRef(0);
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

  //try to filter out load test orders coming in from pmint channel
  const handleMessage = event => {
    if (event && event.total_items_price) {
      const newTime = Date.now();
      const totalGbpPrice = event.total_items_price.gbp_value;
      const channel = event.property.channel;
      const countryCode = event.shipping.country_code;
      let newWorldTotal = worldTotal + totalGbpPrice;
      setWorldTotal(newWorldTotal);
      console.log(newWorldTotal);
      //wrong!
      console.log(newTime - time);
      if (channel !== 'pmint') {
        if (newTime - time < 60000) {
          let newCountryState = [...defaultCountryState];
          newCountryState.forEach(country => {
            if (country.countryCode === countryCode) {
              country.total = country.total + totalGbpPrice;
            }
          });
          //console.log(channel);
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

  return (
    <>
      <s.heading>
        <h1>LoveLace Dashboard</h1>
      </s.heading>
      <s.mapStyle>
        <MapChart />
      </s.mapStyle>
    </>
  );
};
