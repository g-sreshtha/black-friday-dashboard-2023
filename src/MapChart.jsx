import { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
// import { useAutomation } from './useAutomation';

const geoUrl = './map.json';

const colorScale = scaleLinear()
  .domain([0, 15000, 50000, 100000])
  .range(['#a6f6ff', '#0f00e0', '#8857fa', '#9d00ab']); // Between light blue and dark blue - can be changed to different colours

const ChartComponent = ({
  defaultCountryData,
  onMouseEnter,
  onMouseLeave,

  automationData,
}) => {
  return (
    <>
      <div
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '-20rem',
          marginRight: '-10rem',
          marginBottom: '-12rem',
        }}
      >
        <ComposableMap
          data-tip=""
          style={{
            height: '10%',
            padding: '0px',
            marginBottom: '0px',
          }}
        >
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
                  : '#6ecbfa';
                return (
                  <Geography
                    data-tooltip-id="myTooltip"
                    key={geo.rsmKey}
                    geography={geo}
                    id={geo.rsmKey}
                    fill={fillColor}
                    onMouseEnter={() => {
                      onMouseEnter(geo);
                    }}
                    onMouseLeave={onMouseLeave}
                    style={{
                      hover: {
                        fill: '#FFFFFF',
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
      {automationData && (
        <div
          style={{
            left: automationData.right,
            top: automationData.bottom,
            position: 'fixed',
            color: 'white',
            backgroundColor: 'rgba(0,0,0, .8)',
            padding: '0.5rem',
            textAlign: 'center',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            borderRadius: '10px',
          }}
        >
          {automationData.name}
          <br />
          {automationData.highestDiv}
        </div>
      )}
    </>
  );
};
export const MapChart = memo(ChartComponent);
