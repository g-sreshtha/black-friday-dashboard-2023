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
          'rgba(53, 92, 125, 0.7)',
          'rgba(108,91,123, 0.7)',
          'rgba(192,108,132, 0.7)',
          'rgba(148,223,255, 0.7)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Top Divisions',
        color: 'white',
        font: {
          family: 'monospace',
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Divisions',
          color: 'white',
          font: {
            family: 'monospace',
          },
        },
        ticks: {
          color: 'white',
          font: {
            family: 'monospace',
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Total Revenue in £',
          color: 'white',
          font: {
            family: 'monospace',
          },
        },
        ticks: {
          color: 'white',
          font: {
            family: 'monospace',
          },
        },
      },
    },
  };

  return (
    <>
      <div style={container}>
        <div>
          <div style={container}></div>
        </div>
        <div style={{ width: '700px', height: '300px', color: 'white' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default BarChart;
