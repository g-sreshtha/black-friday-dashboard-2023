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
          'rgba(255, 99, 132)',
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
        },
        ticks: {
          color: 'white',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Total Revenue in £',
          color: 'white',
        },
        ticks: {
          color: 'white',
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
