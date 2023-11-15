import React, { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

import Tippy from '@tippyjs/react';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

const colorScale = scaleLinear()
  .domain ([0, 1000])
  .range(["#6ecbfa","#0238fa"]) // Between light blue and dark blue - can be changed to different colours

export const MapChart = ({defaultCountryData}) => {
  const [product, setProduct] = useState(undefined);


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
                const countryData = defaultCountryData && defaultCountryData.length > 0
                ? defaultCountryData.find(
                    data => data.countryName === geo.properties.name
                  )
                : undefined;

                const fillColor = countryData
                  ? colorScale(countryData.total)
                  : '#F5F4F6'; 
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    id={geo.rsmKey}
                    fill={fillColor}
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
