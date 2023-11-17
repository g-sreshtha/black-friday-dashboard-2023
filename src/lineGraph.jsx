import React from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  CategoryScale,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  CategoryScale,
);

export const LineChart = () => {
  const options = {
    responive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total World Revenue',
      },
    },
  };
  const data = {
    labels: ['mon', 'tue', 'wed'],
    datasets: [
      {
        label: 'current Set',
        data: [10, 20, 30],
        borderColor: 'rgba(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ width: '400px', height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
};
