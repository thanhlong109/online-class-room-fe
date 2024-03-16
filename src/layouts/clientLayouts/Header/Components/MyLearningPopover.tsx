import { List, Typography } from 'antd';
import { Link } from 'react-router-dom';
import RegistrationCourseItem from './RegistrationCourseItem';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useGetRegisterCourseByAccountIdQuery } from '../../../../services/registrationCourse.services';
import { RegistrationCourse } from '../../../../types/RegistrationCourse.type';

const MyLearningPopover = () => {
    const accountId = useSelector((state: RootState) => state.user.id);
    const [registrationCourses, setRegistrationCourses] = useState<RegistrationCourse[]>([]);
    const { isLoading, isSuccess, data } = useGetRegisterCourseByAccountIdQuery(accountId);

    useEffect(() => {
        if (isSuccess && data) {
            setRegistrationCourses(data);
        }
    }, [isSuccess, data]);

    return (
        <div className="w-[300px]">
            <div className="p-[5px]">
                <Typography.Text className="text-xl font-bold"> Thông báo </Typography.Text>
                <Link to={'user/12'} className="ml-[60px] text-[#f05123]">
                    Xem tất cả
                </Link>
            </div>
            <div className="max-h-[300px] overflow-auto">
                <List
                    dataSource={registrationCourses}
                    loading={isLoading}
                    renderItem={(course) => (
                        <List.Item>
                            <RegistrationCourseItem courseId={course.courseId} />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};
export default MyLearningPopover;

// chienthang1020@gmail.com
// 12345@Fpt
