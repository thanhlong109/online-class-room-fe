import BarChart from './chart/BarChart';
import LineChart from './chart/LineChart';
import PieChart from './chart/PieChart';

const DashboardPage = () => {
    return (
        <div className=" max-w-[100vh]">
            <div className="flex">
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
