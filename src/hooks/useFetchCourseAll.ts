import { useEffect, useState } from 'react';
import { PagingParam } from '../types/TableParam';
import { useCourseAll } from './useCourseAll';
import { Course } from '../types/Course.type';

const useFetchCourseAll = (input: PagingParam) => {
    const { state, response } = useCourseAll(input);
    const [fetchedData, setFetchedData] = useState<Course[] | null>(null);

    useEffect(() => {
        if (response) {
            setFetchedData(response.courses);
        }
    }, [response]);

    return { state, fetchedData };
};

export default useFetchCourseAll;
