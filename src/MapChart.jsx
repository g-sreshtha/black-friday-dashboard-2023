import React, { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from 'react-simple-maps';

import Tippy from '@tippyjs/react';

const countries = {
  name: 'United Kingdom',
  color: '#000000',
};

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

const MapChart = () => {
  const [product, setProduct] = useState(undefined);
  console.log(product);

  useEffect(() => {
    console.log({ product });

    const el = document.getElementById(product);
    console.log(el);

    Tippy(`#${product}`, {
      content: { product },
    });
  }, [product]);

  // const handleMouseEnter = () => {};
  return (
    <>
      <button id="test">test me</button>
      <div
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ComposableMap
          data-tip=""
          style={{
            height: '1000px',
          }}
        >
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    id={geo.rsmKey}
                    fill={
                      geo.properties.name === countries.name
                        ? countries.color
                        : '#F5F4F6'
                    }
                    onMouseEnter={() => {
                      const product = geo.properties.name;
                      setProduct(geo.rsmKey);
                    }}
                    onMouseLeave={() => {
                      setProduct(undefined);
                    }}
                    style={{
                      hover: {
                        fill: '#000000',
                        outline: 'none',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </>
  );
};

export default MapChart;
