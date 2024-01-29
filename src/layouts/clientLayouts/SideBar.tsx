import { Skeleton } from 'antd';
import { CourseSection } from '../../components';
import { useGetCourseIDQuery } from '../../services';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useLastLocationPath } from '../../hooks/appHook';
import { Course } from '../../types/Course.type';

interface Props {
    onCloseClick: () => void;
}

const SideBar = ({ onCloseClick }: Props) => {
    const [courseId, setCourseId] = useState('');
    const [course, setCourse] = useState<Course | null>(null);
    useEffect(() => {
        const idCourse = useLastLocationPath();
        if (idCourse) {
            setCourseId(idCourse);
        }
    }, []);
    const { data, isLoading, isSuccess } = useGetCourseIDQuery(courseId);

    useEffect(() => {
        if (data) {
            setCourse(data);
        }
    }, [isSuccess]);

    return (
        <>
            <div
                className="xs:hidden absolute bg-white  md:fixed md:bottom-0 md:top-0 md:pt-3 md:disabled:absolute"
                style={{ width: '-webkit-fill-available' }}
            >
                <div className="flex items-center justify-between">
                    <h1 className="pl-5 text-xl font-bold">Course content</h1>
                    <IconButton onClick={onCloseClick} className="ml-4">
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
            <div className="block overflow-y-scroll  md:fixed md:bottom-0 md:top-[80px]">
                {isLoading && <Skeleton active />}
                {!isLoading && <CourseSection isWrap active courseSections={course?.sections} />}
            </div>
        </>
    );
};

export default SideBar;
