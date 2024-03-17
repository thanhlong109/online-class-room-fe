import { useEffect } from 'react';
import { useGetCourseIDQuery } from '../../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { CouseMode, setCourseMode, setCourseUpdate } from '../../../../slices/courseSlice';
import { RootState } from '../../../../store';
import CourseContent from '../AddCourse/CourseContent';
import { Skeleton } from 'antd';

const UpdateCoursePage = () => {
    const dispatch = useDispatch();
    const courseMode = useSelector((state: RootState) => state.course.currentMode);
    const courseId = location.pathname.split('/').pop();
    const { currentData, isSuccess, isLoading } = useGetCourseIDQuery(courseId ? courseId : '');
    useEffect(() => {
        if (isSuccess && currentData) {
            dispatch(setCourseUpdate(currentData));

            dispatch(setCourseMode(CouseMode.UPDATE));
        }
    }, [isSuccess, courseId, currentData]);

    return (
        <div>
            {!isLoading && courseMode === CouseMode.UPDATE && <CourseContent />}
            {isLoading && <Skeleton active />}
        </div>
    );
};

export default UpdateCoursePage;
