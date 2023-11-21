import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ categoryTotal }) => {
  const container = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  };
  const buttons = {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const data = {
    labels: ['Ingenuity', 'Beauty', 'Nutrition', 'Lifestyle'], // y axis
    datasets: [
      {
        label: 'Top Divisions',
        data: [
          categoryTotal[3].categoryTotal,
          categoryTotal[1].categoryTotal,
          categoryTotal[0].categoryTotal,
          categoryTotal[2].categoryTotal,
        ],
        backgroundColor: [
          'rgba(66, 72, 245, 0.5)',
          'rgba(245, 66, 93, 0.5)',
          'rgba(158, 245, 66, 0.5)',
          'rgba(132, 66, 245, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <>
      <div style={container}>
        <div>
          <div style={container}></div>
        </div>
        <div style={{ width: '400px', height: '300px' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default BarChart;
