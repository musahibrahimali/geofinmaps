import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const getData = (normalReports, warningReports, criticalReports) => {
    return {
        labels: ['NORMAL', 'WARNING', 'CRITICAL'],
        datasets: [
            {
                label: ['Reports'],
                data: [
                    normalReports,
                    warningReports,
                    criticalReports
                ],
                backgroundColor: [
                    'rgba(0, 130, 18, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                ],
                borderColor: [
                    'rgba(0, 130, 18, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            }
        ]
    }
}

const options = {
    maintainAspectRatio: false,
}

const DoughnutChart = (props) => {

    const { normalReports, warningReports, criticalReports } = props;

    return (
        <React.Fragment>
            <Doughnut
                data={getData(normalReports, warningReports, criticalReports)}
                height={150}
                width={100}
                options={options}
            />
        </React.Fragment>
    );
}

export default DoughnutChart;