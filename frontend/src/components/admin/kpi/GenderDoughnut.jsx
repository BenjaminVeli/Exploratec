import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from '../../../api';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const GenderDoughnut = () => {
    const [genderStats, setGenderStats] = useState({ male_count: 0, female_count: 0 });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGenderRegistrations();
    }, []);

    const fetchGenderRegistrations = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/gender-count/');
            setGenderStats(response.data);
        } catch (err) {
            setError('Error fetching gender registrations: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const data = {
        labels: ['Masculino', 'Femenino'],
        datasets: [
            {
                data: [genderStats.male_count, genderStats.female_count],
                backgroundColor: ['#36A2EB', '#FF6384'], // Color para cada sección
                hoverBackgroundColor: ['#36A2EB90', '#FF638490'], // Color al hacer hover
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#4A5568', // Cambia el color de las etiquetas
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
        },
    };

    return (
        <div className="w-full">
            {loading ? (
                <div className="text-center text-white">Loading statistic...</div>
            ) : error ? (
                <div className="text-red-500 mb-4">{error}</div>
            ) : (
                <Doughnut data={data} options={options}/>
            )}
        </div>
    );
};

export default GenderDoughnut;
