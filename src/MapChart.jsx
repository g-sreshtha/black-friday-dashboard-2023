import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from 'react-simple-maps';

const countries = {
  name: 'United Kingdom', // ISO code for United Kingdom
  color: '#000000', // Black color
};

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const MapChart = () => {
  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <ComposableMap data-tip="">
        <Sphere stroke="#E4E5E6" strokeWidth={0.1} />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const isEngland = geo.properties.name === countries.name;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isEngland ? countries.color : '#F5F4F6'}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
