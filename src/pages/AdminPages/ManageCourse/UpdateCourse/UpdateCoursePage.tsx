import { useEffect, useState } from 'react';
import { useGetCourseIDQuery } from '../../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { CouseMode, setCourseMode, setCourseUpdate } from '../../../../slices/courseSlice';
import { RootState } from '../../../../store';
import CourseContent from '../AddCourse/CourseContent';
import { Skeleton } from 'antd';

const UpdateCoursePage = () => {
    const [courseId, setCourseId] = useState('');
    const dispatch = useDispatch();
    const courseMode = useSelector((state: RootState) => state.course.currentMode);

    useEffect(() => {
        const getCourseId = location.pathname.split('/').pop();
        if (getCourseId) {
            setCourseId(getCourseId);
        }
    }, []);
    const { data, isSuccess, isLoading } = useGetCourseIDQuery(courseId);

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setCourseUpdate(data));
            console.log(data);
            dispatch(setCourseMode(CouseMode.UPDATE));
        }
    }, [isSuccess]);

    return (
        <div>
            {!isLoading && courseMode === CouseMode.UPDATE && <CourseContent />}
            {isLoading && <Skeleton active />}
        </div>
    );
};

export default UpdateCoursePage;
