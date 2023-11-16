import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

import Tippy from '@tippyjs/react';

const geoUrl = '/map.json';

const colorScale = scaleLinear()
  .domain([0, 1000])
  .range(['#6ecbfa', '#0238fa']); // Between light blue and dark blue - can be changed to different colours

export const MapChart = ({ defaultCountryData }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);

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
            height: '80%',
            padding: '0px',
            marginBottom: '0px',
          }}
        >
          {/* <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const countryData =
                  defaultCountryData && defaultCountryData.length > 0
                    ? defaultCountryData.find(
                        data => data.countryName === geo.properties.name,
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
                      const countryName = geo.properties.name;
                      setHoveredCountry(countryName);
                    }}
                    onMouseLeave={() => {
                      setHoveredCountry(null);
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
        {hoveredCountry && (
          <Tippy content={hoveredCountry}>
            <span>{hoveredCountry}</span>
          </Tippy>
        )}
      </div>
    </>
  );
};

export default MapChart;
