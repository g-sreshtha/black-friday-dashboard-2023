import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const Graph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const data = {
      labels: ['Nutrition', 'Beauty', 'Ingenuity'],
      datasets: [
        {
          label: 'Top Divisions',
          data: [100, 200, 300],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const ctx = document.getElementById('divisions').getContext('2d');
    (chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: data,
    })),
      [];
  });
  return (
    <>
      <canvas id="divisions" width="200px" height="200px"></canvas>
    </>
  );
};
