import { memo, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { useAutomation } from './useAutomation';

const geoUrl = '/map.json';

const colorScale = scaleLinear()
  .domain([0, 3000])
  .range(['#a6f6ff', '#0f00e0']); // Between light blue and dark blue - can be changed to different colours

const ChartComponent = ({
  defaultCountryData,
  setTooltipDivisionContent,
  setTooltipCountryContent,
}) => {
  const [component, setComponent] = useState(null);

  const getHighestDivision = country => {
    const desiredData =
      defaultCountryData && defaultCountryData.length > 0
        ? defaultCountryData.find(data => data.countryName === country)
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
      } else {
        highestDiv = '';
      }
      return highestDiv;
    }
  };

  const updateTooltipContent = hoveredCountry => {
    if (getHighestDivision(hoveredCountry) !== '') {
      setTooltipDivisionContent(getHighestDivision(hoveredCountry));
      setTooltipCountryContent(hoveredCountry);
    } else {
      setTooltipDivisionContent('');
      setTooltipCountryContent(hoveredCountry);
    }
  };
  const handleCyledCountry = countryNameToShow => {
    const countryGeos = {
      'United Kingdom': 'geo-56',
      'United States': 'geo-164',
      France: 'geo-53',
      Germany: 'geo-39',
      Italy: 'geo-77',
      Spain: 'geo-48',
      Australia: 'geo-7',
    };
    const id = countryGeos[countryNameToShow];
    console.log(id, countryNameToShow);
    const country = document.getElementById(id);
    if (country) {
      const position = country.getBoundingClientRect();
      const countryStructure = {};
      countryStructure['name'] = countryNameToShow;
      countryStructure['right'] = position.right;
      countryStructure['bottom'] = position.bottom;
      countryStructure['highestDiv'] = getHighestDivision(countryNameToShow);
      console.log(countryStructure);
      setComponent(countryStructure);
    } else {
      setComponent(null);
    }
  };

  useAutomation(handleCyledCountry);

  const handleMouseEnter = geo => {
    const countryName = geo.properties.name;
    updateTooltipContent(countryName);
  };

  const handleMouseLeave = () => {
    setTooltipDivisionContent('');
    setTooltipCountryContent('');
  };

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
      {component && (
        <div
          style={{
            left: component.right,
            top: component.bottom,
            position: 'fixed',
            color: 'white',
            backgroundColor: 'rgba(0,0,0, .8)',
            padding: '0.3rem',
            textAlign: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          {component.name}
          <br />
          {component.highestDiv}
        </div>
      )}
    </>
  );
};
export const MapChart = memo(ChartComponent);
