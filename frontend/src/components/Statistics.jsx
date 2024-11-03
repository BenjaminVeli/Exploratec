import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../api';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Statistics = () => {
    const [stats, setStats] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSpecialties();
    }, []);

    const fetchSpecialties = async () => {
        try {
            const response = await api.get('/api/specialty-stats/');
            setStats(response.data);
        } catch (err) {
            setError('Error fetching stats: ' + err.message);
        }
    };

    
    const colors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
    ];

    const borderColors = colors.map(color => color.replace('0.5', '1'));

    const data = {
        labels: stats.map(stat => stat.specialty__name),
        datasets: [
            {
                label: 'Conteo',
                data: stats.map(stat => stat.total),
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        indexAxis: 'y', // Cambia a barras horizontales
        scales: {
            x: {
                grid: {
                    display: true, // Opcional: Mostrar líneas de la cuadrícula en el eje x
                },
            },
            y: {
                grid: {
                    display: false, // Ocultar líneas de la cuadrícula en el eje y
                },
            },
        },
    };

    return (
            <div className="chart-container w-full">
                <h2 className='section-tittle--career'>Estadística de Carreras Seleccionadas por los Usuarios</h2>
                <Bar data={data} options={options} />
            </div>
    );
}

export default Statistics;