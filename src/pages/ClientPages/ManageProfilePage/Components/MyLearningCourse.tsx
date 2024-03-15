import { Divider, Typography } from 'antd';
import CourseCardProgress from '../../../../components/CourseCardProgress/CourseCardProgress';
import { useGetRegisterCourseByAccountIdQuery } from '../../../../services/registrationCourse.services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const MyLearningCourses = () => {
    const accountId = useSelector((state: RootState) => state.user.id);
    const { data, isLoading, isSuccess } = useGetRegisterCourseByAccountIdQuery(accountId);

    return (
        <>
            <div>
                <Typography.Title className="text-center" level={3}>
                    Khóa học của tôi
                </Typography.Title>
                <Divider />
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {!isLoading &&
                        data &&
                        data.map((regisCourse) => (
                            <CourseCardProgress registrationCourse={regisCourse} />
                        ))}
                </div>
            </div>
        </>
    );
};

export default MyLearningCourses;
