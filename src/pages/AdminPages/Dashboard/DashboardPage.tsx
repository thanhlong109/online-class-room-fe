import BarChart from './chart/BarChart';
import LineChart from './chart/LineChart';
import PieChart from './chart/PieChart';

const DashboardPage = () => {
    return (
        <div>
            <div className="m-4 flex">
                <PieChart />
                <LineChart />
            </div>
            <div>
                <BarChart />
            </div>
        </div>
    );
};

export default DashboardPage;
