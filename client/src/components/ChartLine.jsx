import React, { useState } from 'react';
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
  const [toggle, setToggle] = useState(false); // Estado para alternar entre los datos originales y nuevos

  const handleClick = () => {
    // Función para alternar entre los datos originales y nuevos
    setToggle(!toggle); // Alternar el estado de "toggle"
  };

  const dataLine = {
    labels: months,
    datasets: [
      {
        label: 'users',
        data: toggle ? [12, 36, 220, 56, 20, 70, 30, 80, 65, 90, 72, 199] : users,
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

  let maxx =
    Math.max(...dataLine.datasets[0].data) > 100 ? Math.max(...dataLine.datasets[0].data) : 100;

  const optionsLine = {
    scales: {
      y: {
        min: 0,
        max: maxx,
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

  return (
    <div>
      <Line data={dataLine} options={optionsLine} />
      <button onClick={handleClick}>
        {toggle ? 'Switch To Real Data' : 'Switch To Test Data'}
      </button>
    </div>
  );
};

export default ChartLine;
