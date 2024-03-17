import { Divider, Skeleton, Typography } from 'antd';
import CourseCardProgress from '../../../../components/CourseCardProgress/CourseCardProgress';
import { useGetRegisterCourseByAccountIdQuery } from '../../../../services/registrationCourse.services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const MyLearningCourses = () => {
    const accountId = useSelector((state: RootState) => state.user.id);
    const { data, isLoading } = useGetRegisterCourseByAccountIdQuery(accountId);

    return (
        <>
            <div>
                <Typography.Title className="text-center" level={3}>
                    Khóa học của tôi
                </Typography.Title>
                <Divider />
                <div className="flex flex-wrap gap-4">
                    {!isLoading &&
                        data &&
                        data.map((regisCourse) => (
                            <div className="h-[235px] w-[220px]">
                                <CourseCardProgress registrationCourse={regisCourse} />
                            </div>
                        ))}
                    {isLoading && <Skeleton active />}
                </div>
            </div>
        </>
    );
};

export default MyLearningCourses;
