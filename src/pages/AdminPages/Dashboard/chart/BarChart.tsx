import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { BarChartData } from '../data/BarChart.data';
import { Card } from 'antd';
import { useState } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const options = {
    chart: {
        title: 'Biểu đồ lượt đăng kí của các thể loại khóa học',
        subtitle: 'Từ tháng 1 - tháng 12',
    },
    colors: ['rgb(53, 138, 148)', 'rgb(37, 11, 165)', '#188310', '#000000'],
};

const BarChart = () => {
    const [userData, setUserData] = useState({
        labels: BarChartData.map((data) => data.month),
        datasets: [
            {
                label: 'Lập trình JS',
                data: BarChartData.map((data) => data.viewlaptrinhjs),
                backgroundColor: ['rgba(75,192,192,1)'],
            },
            {
                label: 'Lập trình Unity',
                data: BarChartData.map((data) => data.viewlaptrinhunity),
                backgroundColor: ['#FFB6C1'],
            },
            {
                label: 'Lập trình Java',
                data: BarChartData.map((data) => data.viewlaptrinhjava),
                backgroundColor: ['#DA70D6'],
            },
            {
                label: 'Lập trình Flutter',
                data: BarChartData.map((data) => data.viewlaptrinhflutter),
                backgroundColor: ['#f3ba2f'],
            },
            {
                label: 'Khác',
                data: BarChartData.map((data) => data.viewkhac),
                backgroundColor: ['#DDDDDD'],
            },
        ],
    });
    const options = {
        plugins: {
            tooltip: {
                enabled: true,
            },

            legend: {
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    borderRadius: 1,
                },
            },
        },
    };
    return (
        <Card
            title="Biểu đồ lượt đăng kí của các thể loại khóa học"
            className="h-[700px] max-w-full"
        >
            <Bar width="750px" height="350px" data={userData} options={options} />
        </Card>
    );
};

export default BarChart;
