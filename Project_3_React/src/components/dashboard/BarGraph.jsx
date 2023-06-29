import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const BarGraph = ({ targetAmount, currentlySavedAmount }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartElement = chartRef.current;
    const chartInstance = new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: ['Target Amount', 'Currently Saved Amount'],
        datasets: [
          {
            label: 'Goal Progress',
            data: [targetAmount, currentlySavedAmount],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)', // Blue color for target amount
              'rgba(255, 99, 132, 0.2)', // Red color for currently saved amount
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [targetAmount, currentlySavedAmount]);

  return <canvas ref={chartRef} />;
};

export default BarGraph;
