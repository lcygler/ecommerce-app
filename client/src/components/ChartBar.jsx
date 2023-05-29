import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const ChartBar = (props) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const ventas = props.data;
  const dataBars = {
    labels: months,
    datasets: [
      {
        label: 'ventas',
        data: ventas,
        backgroundColor: 'rgba(0, 51, 220, 0.349)',
      },
    ],
  };
  let max = Math.max(...ventas) > 100 ? Math.max(...ventas) : 100;
  const optionsBars = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: max,
      },
      x: {
        ticks: { color: 'blue' },
      },
    },
  };

  return <Bar data={dataBars} options={optionsBars} />;
};

export default ChartBar;
