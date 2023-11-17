import MapChart from './MapChart.jsx';
import s from './App.styling.jsx';
import { useState, useEffect } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { defaultCountryState } from './newDataStructure.jsx';
import { getDivisionFromChannel } from './channelMapping.jsx';

const time = Date.now();
export const App = () => {
  const [countryState, setCountryState] = useState(defaultCountryState);
  const [stateWorldTotal, setStateWorldTotal] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchEventSource('https://accelerator.thgaccess.com/events', {
      onmessage(event) {
        let message = JSON.parse(event.data);
        //console.log(message);
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
          console.log(channel);
          setStateWorldTotal(stateWorldTotal => {
            //console.log(stateWorldTotal);
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
            //console.log(newCountryState[orderCountryIndex]);
            return newCountryState;
          });
        } else {
          setCountryState(defaultCountryState);
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
        <MapChart defaultCountryData={countryState} />
      </s.mapStyle>
    </>
  );
};
