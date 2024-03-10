import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { PieChartData } from '../data/PieChart.data';
import { Card } from 'antd';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const [userData, setUserData] = useState({
        labels: PieChartData.map((data) => data.category),
        datasets: [
            {
                label: 'Tổng Lượt Đăng Kí Khóa Học',
                data: PieChartData.map((data) => data.view),
                backgroundColor: ['rgba(75,192,192,1)', '#FFB6C1', '#DA70D6', '#f3ba2f', '#DDDDDD'],
            },
            {
                label: 'Tổng Số Lượng Khóa Học',
                data: PieChartData.map((data) => data.amount),
                backgroundColor: ['rgba(75,192,192,1)', '#FFB6C1', '#DA70D6', '#f3ba2f', '#DDDDDD'],
            },
        ],
    });
    const options = {
        plugins: {
            tooltip: {
                enabled: true,
            },
            // datalabels: {
            //     formatter: (value: JSX.Element, context: JSX.Element) =>{
            //         return '';
            //     }
            // },
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
        <Card
            title="Biểu đồ tỉ suất lượt đăng kí và tổng số khóa học của các thể loại khóa học"
            className="ml-6 max-w-[450px]"
        >
            <Pie data={userData} options={options} />
        </Card>
    );
};

export default PieChart;
