import { useEffect, useState } from 'react';
import { Course } from '../../../../types/Course.type';
import { formatNumberWithCommas } from '../../../../utils/NumberFormater';
import { useGetCourseIDQuery } from '../../../../services';
import { Link } from 'react-router-dom';

interface Props {
    courseId: number;
}

const WishListItem = ({ courseId }: Props) => {
    const [course, setCourse] = useState<Course>();
    const { data, isSuccess } = useGetCourseIDQuery(courseId.toString());

    useEffect(() => {
        if (isSuccess) {
            setCourse(data);
        }
    }, [isSuccess]);

    return (
        <>
            <Link to={`/courses/${courseId}`}>
                <div className="flex cursor-pointer gap-2 px-2 hover:text-[#a435f0]">
                    <div className="flex h-[55px] w-[80px] items-center justify-center overflow-hidden bg-black py-1">
                        <img className="w-full" src={course?.imageUrl} alt="" />
                    </div>
                    <div className="flex-1 flex-col">
                        <h2 className="line-clamp-2 text-ellipsis text-sm font-medium leading-4 text-[inherit]">
                            {course?.title}
                        </h2>
                        <h2 className="mt-1 text-sm font-medium text-red-400">
                            {formatNumberWithCommas(course?.price)}₫
                        </h2>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default WishListItem;
