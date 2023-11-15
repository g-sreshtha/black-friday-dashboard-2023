import s from './App.styling.jsx';
import React from 'react';
import { MapChart } from './Mapchart.jsx';
import { Scale } from './scale.jsx';
import { Graph } from './Key.jsx';
import b from './keystyles.jsx';

export const App = () => {
  return (
    <>
      <s.heading>
        <h1>Lovelace Dashboard</h1>
      </s.heading>
      <s.mapStyle>
        <MapChart />
      </s.mapStyle>

      <Scale />
      <Graph />
    </>
  );
};
