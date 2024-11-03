import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const UsersWeek = () => {
    const [userStats, setUserStats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserRegistrations();
    }, []);

    const fetchUserRegistrations = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/weekly-user-registrations/');
            setUserStats(response.data.weekly_user_registrations);
        } catch (err) {
            setError('Error fetching user registrations: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const data = {
        labels: userStats.map(stat => stat.day),
        datasets: [
            {
                label: 'Usuarios Registrados',
                data: userStats.map(stat => stat.count),
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.1)');     // Transparente abajo
                    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.8)');   // Semi-transparente arriba
                return gradient;
                },
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,  // Esto hace las líneas más suaves
                pointRadius: 4,
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: true,
                },
            },
            y: {
                grid: {
                    display: true,
                },
                border: {
                    width: 0 // Ajusta el grosor de la línea del eje
                }
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    boxHeight: 10,
                    color: 'rgb(128 202 238)',
                    font: {
                        weight: 'bold', // Hace el texto bold
                        size: 14 // Tamaño del texto (ajústalo según necesites)
                    }
                }
            },
        }
    };

    return (
        <div className="w-full">
            {loading ? (
                <div className="text-center text-white">Cargando estadísticas...</div>
            ) : error ? (
                <div className="text-red-500 mb-4">{error}</div>
            ) : (
                <Line data={data} options={options} />
            )}
        </div>
    );
}

export default UsersWeek;