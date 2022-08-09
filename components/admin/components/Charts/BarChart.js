import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    maintainAspectRatio: false,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                }
            }
        ]
    }
};

const labels = ['NORMAL', 'WARNING', 'CRITICAL'];

const getData = (normalReports, warningReports, criticalReports) => {
 return {
        labels,
        datasets: [
            {
                label: ['Reports'],
                data: [
                    normalReports,
                    warningReports,
                    criticalReports
                ],
                backgroundColor: [
                    'rgba(0, 130, 18, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(255, 99, 132, 0.4)',
                ],
                borderColor: [
                    'rgba(0, 130, 18, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 2,
            }
        ],
    };
}


const BarChart = (props) => {
    const { normalReports, warningReports, criticalReports } = props;

    return (
        <React.Fragment>
            <Bar
                data={getData(normalReports, warningReports, criticalReports)}
                height={150}
                width={100}
                options={options}
            />
        </React.Fragment>
    );
}

export default BarChart;