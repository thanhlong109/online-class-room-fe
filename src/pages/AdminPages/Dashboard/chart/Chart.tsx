import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useCountStudentPerCourseQuery } from '../../../../services/course.services';

// const data = [
//     {
//         name: 'Sun',
//         visit: 4000,
//         click: 2400,
//     },
//     {
//         name: 'Mon',
//         visit: 3000,
//         click: 1398,
//     },
//     {
//         name: 'Tue',
//         visit: 2000,
//         click: 3800,
//     },
//     {
//         name: 'Wed',
//         visit: 2780,
//         click: 3908,
//     },
//     {
//         name: 'Thu',
//         visit: 1890,
//         click: 4800,
//     },
//     {
//         name: 'Fri',
//         visit: 2390,
//         click: 3800,
//     },
//     {
//         name: 'Sat',
//         visit: 3490,
//         click: 4300,
//     },
// ];

const Chart = () => {
    const { data: courseData, isLoading, isError } = useCountStudentPerCourseQuery();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    if (!courseData || courseData.length === 0) return <div>No data available</div>;
    const formattedData = courseData.map((course) => ({
        name: course.courseTitle,
        totalStudents: course.totalStudents,
        courseId: course.courseId,
    }));
    return (
        <div className="h-[100%] w-[850px] rounded-md bg-white p-4">
            <h2 className="mb-4 text-lg">Tổng số học sinh tham gia mỗi khóa học</h2>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    width={1000}
                    height={300}
                    data={formattedData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ background: '#151c2c', border: 'none' }} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="totalStudents"
                        stroke="#8884d8"
                        strokeDasharray="5 5"
                    />
                    <Line
                        type="monotone"
                        dataKey="name"
                        stroke="#82ca9d"
                        strokeDasharray="3 4 5 2"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
