import React, { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

// import Tippy from '@tippyjs/react';

const defaultCountryState = {
  countryName: 'United Kingdom',
  color: '#000000',
  total: 0,
};

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

const colorScale = scaleLinear()
  .domain([0.1, 0.8])
  .range(['#6ecbfa', '#0238fa']); // Between light blue and dark blue - can be changed to different colours

export const MapChart = () => {
  const [product, setProduct] = useState(undefined);
  console.log(product);

  useEffect(() => {
    console.log({ product });

    const el = document.getElementById(product);
    console.log(el);

    // Tippy(`#${product}`, {
    //   content: { product },
    // });
  }, [product]);

  // const handleMouseEnter = () => {};
  return (
    <>
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
                      geo.properties.name === defaultCountryState.name
                        ? defaultCountryState.color
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
