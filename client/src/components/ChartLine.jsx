import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChartLine = (props) => {
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
  let users = props.data;

  const dataLine = {
    labels: months,
    datasets: [
      {
        label: 'users',
        data: users,
        tension: 0.5,
        fill: true,
        borderColor: 'rgba(15, 63, 235, 0.308)',
        backgroundColor: 'rgba(0, 51, 220, 0.349)',
        pointRadius: 5,
        pointBorderColor: 'rgb(0, 58, 248)',
        pointBackgroundColor: 'rgb(0, 58, 248)',
      },
    ],
  };

  // let max = Math.max(...users) > 100 ? Math.max(...users) : 100;

  const optionsLine = {
    scales: {
      y: {
        min: 0,
        max: 100,
      },
      x: {
        ticks: { color: 'blue' },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Line data={dataLine} options={optionsLine} />;
};

export default ChartLine;
