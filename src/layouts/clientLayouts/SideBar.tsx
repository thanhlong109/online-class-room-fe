import { Skeleton } from 'antd';
import { CourseSection } from '../../components';
import { useGetCourseIDQuery } from '../../services';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SideBar = () => {
    const { data, isLoading } = useGetCourseIDQuery(7);
    return (
        <>
            <div className="fixed bottom-0 top-6" style={{ width: '-webkit-fill-available' }}>
                <div className="flex items-center justify-between">
                    <h1 className="pl-5 text-xl font-bold">Course content</h1>
                    <IconButton className="ml-4">
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
            <div className="fixed bottom-0 top-[80px] overflow-y-scroll">
                {isLoading && <Skeleton active />}
                {!isLoading && <CourseSection active courseSections={data?.tracks} />}
            </div>
        </>
    );
};

export default SideBar;
