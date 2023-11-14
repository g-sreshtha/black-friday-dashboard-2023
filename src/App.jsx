import s from './App.styling.jsx';
import React from 'react';
import { MapChart } from './Mapchart.jsx';
import { Graph } from './Key.jsx';

export const App = () => {
  return (
    <>
      <s.heading>
        <h1>Lovelace Dashboard</h1>
      </s.heading>
      <s.mapStyle>
        <MapChart />
      </s.mapStyle>
      <div>
        <div>
          <p>key</p>
        </div>
        <Graph />
      </div>
    </>
  );
};
