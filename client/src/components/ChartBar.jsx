import React, { useState } from 'react';
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
  const [data, setData] = useState(props.data); // Estado para almacenar los datos del gráfico
  const [toggle, setToggle] = useState(false); // Estado para alternar entre los datos originales y nuevos

  const handleClick = () => {
    // Función para alternar entre los datos originales y nuevos
    if (toggle) {
      setData(props.data); // Restaurar los datos originales
    } else {
      // Nuevos datos para el gráfico
      const newChartData = [72, 56, 20, 36, 80, 40, 30, 20, 25, 30, 123, 60];
      setData(newChartData); // Actualizar los datos del gráfico con los nuevos datos
    }
    setToggle(!toggle); // Alternar el estado de "toggle"
  };

  const dataBars = {
    labels: months,
    datasets: [
      {
        label: 'ventas',
        data: data, // Usar los datos almacenados en el estado
        backgroundColor: 'rgba(0, 51, 220, 0.349)',
      },
    ],
  };
  let maxx = Math.max(...data) > 100 ? Math.max(...data) : 100;
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
        max: maxx,
      },
      x: {
        ticks: { color: 'blue' },
      },
    },
  };

  return (
    <div>
      <Bar data={dataBars} options={optionsBars} />
      <button onClick={handleClick}>
        {toggle ? 'Switch To Real Data' : 'Switch To Test Data'}
      </button>
    </div>
  );
};

export default ChartBar;
