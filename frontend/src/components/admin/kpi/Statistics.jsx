import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../../../api';

import {
    Chart as ChartJS,
    BarElement,
    Title,
    Legend
} from 'chart.js';

ChartJS.register(
    BarElement,
    Title,
    Legend
);

const Statistics = () => {
    const [stats, setStats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSpecialties();
    }, []);

    const fetchSpecialties = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/specialty-stats/');
            setStats(response.data);
        } catch (err) {
            setError('Error fetching stats: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    
    const colors = [
        'rgba(255, 159, 64, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 50, 50, 0.5)',
        'rgba(255, 206, 86, 0.5)',
    ];

    const borderColors = colors.map(color => color.replace('0.5', '1'));

    const data = {
        labels: stats.map(stat => stat.specialty__name),
        datasets: [
            {
                label: 'Specialties Selected by Users',
                data: stats.map(stat => stat.total),
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 2,
                barThickness: 15,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite ajustar la relación de aspecto
        indexAxis: 'y', // Cambia a barras horizontales
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
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    boxHeight: 10,
                    color: 'rgb(60 80 224)',
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
                <div className="text-center text-white">Loading statistic...</div>
            ) : error ? (
                <div className="text-red-500 mb-4">{error}</div>
            ) : (
                <Bar data={data} options={options} height={240}/>
            )}
        </div>
    );
}

export default Statistics;