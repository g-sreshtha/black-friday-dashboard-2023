import MapChart from './MapChart.jsx';
import s from './App.styling.jsx';

export const App = () => {
  return (
    <>
      <s.heading>
        <h1>LoveLace Dashboard</h1>
      </s.heading>
      <s.mapStyle>
        <MapChart />
      </s.mapStyle>
    </>
  );
};
