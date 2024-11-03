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
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
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

    const colors = [
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
    ];

    const borderColors = colors.map(color => color.replace('0.5', '1'));

    const data = {
        labels: userStats.map(stat => stat.day),
        datasets: [
            {
                label: 'Usuarios Registrados',
                data: userStats.map(stat => stat.count),
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 2,
                fill: true, // Hace que la línea no esté rellena
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
                    display: false,
                },
                ticks: {
                    callback: function(value) {
                        return Number(value).toFixed(0);
                    }
                }
            },
        },
    };

    return (
        <div className="chart-container w-full">
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