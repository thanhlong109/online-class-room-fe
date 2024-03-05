import { courseAllFailure, courseAllStart, courseAllSuccess } from '../slices/getCourseAllSlice';
import { useAppDispatch, useAppSelector } from './appHook';
import { useGetAllCoursesQuery } from '../services/course.services'; // Import the specific query hook
import { useEffect } from 'react';

export function useCourseAll() {
    const state = useAppSelector((state) => state.courseAll);
    const dispatch = useAppDispatch();

    const { data: response, error, isLoading } = useGetAllCoursesQuery(1); // Call the specific query hook

    // useEffect to dispatch actions based on the state of the query
    useEffect(() => {
        if (isLoading) {
            dispatch(courseAllStart());
        } else if (error) {
            console.log('Error fetching courses: ', error);
            dispatch(courseAllFailure());
        } else if (response) {
            dispatch(courseAllSuccess(response)); // Pass array of courses
        }
    }, [dispatch, isLoading, error, response]);

    return { state, isLoading, response }; // Return isLoading if you want to use it to show loading state in your component
}
