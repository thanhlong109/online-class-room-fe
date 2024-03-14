import { useState } from 'react';
import { LineChartData } from '../data/LineChart.data';
import { Card } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
    const [userData, setUserData] = useState({
        labels: LineChartData.map((data) => data.month),
        datasets: [
            {
                label: 'Lượt Truy Cập',
                data: LineChartData.map((data) => data.access),
                backgroundColor: ['rgba(75,192,192,1)'],
            },
        ],
    });
    const options = {
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: {
                // display: false,
                position: 'bottom' as const,
                // align: 'start' as const,
                labels: {
                    usePointStyle: true,
                    borderRadius: 1,
                },
            },
        },
    };
    return (
        <Card title="Biểu đồ số lượng đăng kí khóa học" className="ml-6 max-w-[700px]">
            <Line data={userData} options={options} width="100%" />
        </Card>
    );
};

export default LineChart;
