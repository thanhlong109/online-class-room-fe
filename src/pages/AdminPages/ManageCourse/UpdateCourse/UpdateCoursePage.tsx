import { useEffect, useState } from 'react';
import { useGetCourseIDQuery } from '../../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { CouseMode, setCourseMode, setCourseUpdate } from '../../../../slices/courseSlice';
import { RootState } from '../../../../store';
import CourseContent from '../AddCourse/CourseContent';

const UpdateCoursePage = () => {
    const dispatch = useDispatch();
    const [courseId, setCourseId] = useState('');
    const courseMode = useSelector((state: RootState) => state.course.currentMode);

    useEffect(() => {
        const getCourseId = location.pathname.split('/').pop();
        if (getCourseId) {
            setCourseId(getCourseId);
        }
    }, []);
    const { isSuccess, data } = useGetCourseIDQuery(courseId);

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setCourseUpdate(data));
            dispatch(setCourseMode(CouseMode.UPDATE));
        }
    }, [isSuccess]);

    return <div>{courseMode === CouseMode.UPDATE && <CourseContent />}</div>;
};

export default UpdateCoursePage;
