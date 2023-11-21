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
    labels: ['Nutrition', 'Beauty', 'Lifestyle'],
    datasets: [
      {
        label: 'Top Divisions',
        data: [
          categoryTotal[0].categoryTotal,
          categoryTotal[1].categoryTotal,
          categoryTotal[2].categoryTotal,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
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
          {/* <div style={buttons}>
            <button style={{ margin: '10px' }}>click me </button>
            <button style={{ margin: '10px' }}>click me </button>
          </div> */}
        </div>
        <div style={{ width: '400px', height: '300px' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default BarChart;
