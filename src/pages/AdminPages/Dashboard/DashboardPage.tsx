// import BarChart from './chart/BarChart';
// import LineChart from './chart/LineChart';
// import PieChart from './chart/PieChart';

import Card from './Card/Card';
import Chart from './chart/Chart';
import { cards } from './data/data';

const DashboardPage = () => {
    return (
        <div className="flex flex-col items-start gap-5">
            <div className="flex justify-between gap-4">
                {cards.map((item) => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
            <div className="flex flex-row gap-4">
                <div>
                    <Chart />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
