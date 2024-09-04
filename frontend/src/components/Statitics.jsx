import React, { useState, useEffect } from 'react';
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

function Statitics() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        fetchSpecialties();
    }, []);

    const fetchSpecialties = () => {
        api.get('/api/specialty-stats/')
            .then(res => res.data)
            .then(data => {
                setStats(data);
            })
            .catch(err => alert('Error fetching stats: ' + err));
    };

    // Define una lista de colores predefinidos
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
        scales: {
            x: {
                grid: {
                    display: false, // Ocultar líneas de la cuadrícula en el eje x
                },
            },
        },
    };

    return (
        <div>
            <div className='table__body'>
                <table>
                    <thead>
                        <tr>
                            <th>Carreras</th>
                            <th>Conteo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.specialty__name}</td>
                                <td>{stat.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="chart-container">
                <h2 className='section-tittle--career'>Estadística de Carreras Seleccionadas por los Usuarios</h2>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default Statitics;
