import { Skeleton } from 'antd';
import CourseSection from '../../components/CourseSection/CourseSection';
import { useGetCourseIDQuery } from '../../services';

const CourseDetailsPage = () => {
    const { data, isLoading } = useGetCourseIDQuery(7);

    return (
        <>
            <div>
                CourseDetails
                {isLoading && <Skeleton active />}
                {!isLoading && <CourseSection courseSections={data?.tracks} />}
            </div>
        </>
    );
};

export default CourseDetailsPage;
