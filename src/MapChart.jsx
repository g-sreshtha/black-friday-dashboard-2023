import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

const geoUrl = './map.json';

const colorScale = scaleLinear()
  .domain([0, 3000])
  .range(['#a6f6ff', '#0f00e0']); // Between light blue and dark blue - can be changed to different colours

const ChartComponent = ({
  defaultCountryData,
  setTooltipDivisionContent,
  setTooltipCountryContent,
}) => {
  const updateTooltipContent = hoveredCountry => {
    const desiredData =
      defaultCountryData && defaultCountryData.length > 0
        ? defaultCountryData.find(data => data.countryName === hoveredCountry)
        : undefined;
    if (desiredData) {
      const div0 = desiredData.div0;
      const div1 = desiredData.div1;
      const div2 = desiredData.div2;

      let highestDiv = '';
      if (div0 > div1 && div0 > div2) {
        highestDiv = `Nutrition: £${div0.toFixed(0)}`;
      } else if (div1 > div2 && div1 > div0) {
        highestDiv = `Beauty: £${div1.toFixed(0)}`;
      } else if (div2 > div1 && div2 > div0) {
        highestDiv = `Lifestyle: £${div2.toFixed(0)}`;
      }
      setTooltipDivisionContent(highestDiv);
      setTooltipCountryContent(hoveredCountry);
    } else {
      setTooltipDivisionContent('');
      setTooltipCountryContent('');
    }
  };

  const handleMouseEnter = geo => {
    const countryName = geo.properties.name;
    updateTooltipContent(countryName);
  };

  const handleMouseLeave = () => {
    setTooltipDivisionContent('');
    setTooltipCountryContent('');
  };

  return (
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
                    handleMouseEnter(geo);
                  }}
                  onMouseLeave={handleMouseLeave}
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
  );
};
export const MapChart = memo(ChartComponent);
