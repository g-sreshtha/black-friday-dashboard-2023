import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from 'react-simple-maps';

const marker = {
  iso: 'GBR', // ISO code for United Kingdom
  color: '#000000', // Black color
};

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const MapChart = () => {
  return (
    <ComposableMap data-tip="">
      <Sphere stroke="#E4E5E6" strokeWidth={0.1} />
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const isEngland = geo.properties.ISO_A3 === marker.iso;

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isEngland ? marker.color : '#F5F4F6'}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
