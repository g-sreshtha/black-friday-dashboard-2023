import { useRef, useEffect } from 'react';

const countryArray = [
  'United Kingdom',
  'United States',
  'France',
  'Germany',
  'Italy',
  'Spain',
  'Australia',
];

export const useAutomation = updateTooltipContent => {
  const currentCountryIndex = useRef(0);

  useEffect(() => {
    let timeout;
    const interval = setInterval(() => {
      console.log(countryArray[currentCountryIndex.current]);
      updateTooltipContent(countryArray[currentCountryIndex.current]);
      currentCountryIndex.current++;
      if (currentCountryIndex.current >= countryArray.length) {
        currentCountryIndex.current = 0;
      }
      timeout = setTimeout(() => {
        updateTooltipContent(null);
      }, 5000);
    }, 10000);

    return () => {
      clearInterval(interval);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);
};
