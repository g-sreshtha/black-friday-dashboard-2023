import { React } from 'react';
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
  CategoryScale,
  Title,
  Tooltip,
);

export const LineChart = ({ defaultWorldRevenue }) => {
  const options = {
    responive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total World Revenue',
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
          text: 'Revenue in £',
          color: 'white',
          font: {
            family: 'monospace',
          },
        },
        ticks: {
          color: 'white',
          font: {
            family: 'monospace',
          }, // Set the color for the y-axis tick labels
        },
      },
      x: {
        title: {
          display: true,
          text: 'Timestamp in hh:mm',
          color: 'white',
          font: {
            family: 'monospace',
          },
        },
        ticks: {
          color: 'white',
          font: {
            family: 'monospace',
          }, // Set the color for the y-axis tick labels
        },
      },
    },
  };

  const data = {
    labels: Object.keys(defaultWorldRevenue).map(timestamp => {
      const date = new Date(+timestamp);
      const formattedTime = `${date.getHours()}:${
        date.getMinutes() < 10 ? '0' : ''
      }${date.getMinutes()}`;
      return formattedTime; // fix the formatting!! 11:07 instead of 11:7 etc
    }), //label on x axis
    datasets: [
      {
        label: 'revenue over time',
        data: Object.keys(defaultWorldRevenue).map(
          timestamp => defaultWorldRevenue[timestamp],
        ), // label on y axis here would be world revenue total
        borderColor: 'rgba(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ width: '700px', height: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};
