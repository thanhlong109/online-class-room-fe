import { Divider, Typography } from 'antd';
import { CourseCard } from '../../../../components';

const Favorite = () => {
    return (
        <>
            <div>
                <Typography.Title className="text-center" level={3}>
                    Khóa học yêu thích
                </Typography.Title>
                <Divider />
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
            </div>
        </>
    );
};

export default Favorite;
