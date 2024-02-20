import { Divider, Typography } from 'antd';

const Favorite = () => {
    return (
        <>
            <div>
                <Typography.Title className="text-center" level={3}>
                    Khóa học yêu thích
                </Typography.Title>
                <Divider />
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3"></div>
            </div>
        </>
    );
};

export default Favorite;
