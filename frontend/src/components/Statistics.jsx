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
        <div className="grid grid-cols-1 lg:grid-cols-2 ">

            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <div className="overflow-hidden border rounded-xl shadow-sm p-6 bg-neutral-800">
                            <table className="min-w-full divide-y divide-neutral-700">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase text-blue-500">Carreras</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase text-blue-500">N° de usuarios</th>
                                    </tr>
                                </thead>
                                <tbody className="min-w-full divide-y divide-neutral-700">
                                {stats.map((stat, index) => (
                                    <tr key={index} className="">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  dark:text-neutral-200">{stat.specialty__name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-neutral-200 text-center">{stat.total}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chart-container w-full">
                <h2 className='section-tittle--career'>Estadística de Carreras Seleccionadas por los Usuarios</h2>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default Statistics;