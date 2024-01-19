import { Skeleton } from 'antd';
import { CourseSection } from '../../components';
import { useGetCourseIDQuery } from '../../services';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    onCloseClick: () => void;
}

const SideBar = ({ onCloseClick }: Props) => {
    const { data, isLoading } = useGetCourseIDQuery(7);
    return (
        <>
            <div
                className="xs:hidden absolute  md:fixed md:bottom-0 md:top-6 md:disabled:absolute" //fixed bottom-0 top-6 absolute hidden md:invisible md:fixed md:bottom-0 md:top-6 md:disabled:absolute
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
                {!isLoading && <CourseSection active courseSections={data?.tracks} />}
            </div>
        </>
    );
};

export default SideBar;
