import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../../../api';

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    Tooltip,
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    Tooltip,
);

const VisitsMounthly = () => {
    const [visitStats, setVisitStats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVisitMounthlyRegistrations();
    }, []);

    const fetchVisitMounthlyRegistrations = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/visits-monthly/');
            setVisitStats(response.data);
        } catch (err) {
            setError('Error fetching visits monthly registrations: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Prepare data for the bar chart
    const months = visitStats.map((stat) => stat.month); // Get months (e.g., 'Jan', 'Feb', 'Mar')
    const visitCounts = visitStats.map((stat) => stat.visit_count); // Get visit counts for each month
    
    const data = {
        labels: months,
        datasets: [
            {
                label: 'Number visits',
                data: visitCounts,
                backgroundColor: 'rgb(60 80 224)',
                borderColor: '#ffffff',
                borderWidth: 1,
                borderRadius: 4,
                barThickness: 25,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,  // Desactiva la leyenda
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#96A2A9',
                }
            },
            y: {
                grid: {
                    display: true, 
                },
                border: {
                    width: 0 // Ajusta el grosor de la línea del eje
                },
                ticks: {
                    color: '#96A2A9',
                }
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
                <Bar data={data} options={options} height={130}/>
            )}
        </div>
    );
};

export default VisitsMounthly;
