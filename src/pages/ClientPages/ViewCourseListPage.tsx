import { List, Select, Skeleton, Typography } from 'antd';
import FilterListIcon from '@mui/icons-material/FilterList';
import { DefaultOptionType } from 'antd/es/select';
import { useGetAllCoursesQuery } from '../../services/course.services';
import { useEffect, useState } from 'react';
import { PagingParam } from '../../types/TableParam';
import { GetAllCourse } from '../../types/Course.type';
import { formatNumberWithCommas } from '../../utils/NumberFormater';

const options: DefaultOptionType[] = [
    { label: 'Mới nhất', value: 'Mới nhất' },
    { label: 'Phổ biến', value: 'Phổ biến' },
    { label: 'Đánh giá cao', value: 'Đánh giá cao' },
];

const ViewCourseListPage = () => {
    const [pagingParam, setPagingParam] = useState<PagingParam>({
        pageNumber: 1,
        pageSize: 15,
        search: '',
    });
    const [coursesRepsone, setCoursesRespone] = useState<GetAllCourse>();

    const { data, isSuccess, isLoading } = useGetAllCoursesQuery(pagingParam);

    useEffect(() => {
        if (isSuccess && data) {
            setCoursesRespone(data);
        }
    }, [isSuccess]);

    return (
        <div className="container">
            <Typography.Title level={3}>Tất cả khóa học</Typography.Title>
            <div className="flex gap-2">
                <span className="border-[1px] p-4">
                    <FilterListIcon /> Lọc theo
                </span>
                <Select className="!h-16" defaultValue={'Mới nhất'} options={options} />
            </div>
            <div className="flex">
                <div></div>
                <div className="flex-1 text-[#2d2f31]">
                    {!isLoading && coursesRepsone && (
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={coursesRepsone.courses}
                            renderItem={(course, index) => (
                                <List.Item key={index}>
                                    <div className="flex gap-3">
                                        <div className=" max-h-[170px] w-[965px] max-w-[300px] overflow-y-hidden">
                                            <img
                                                className="w-full object-fill"
                                                src={course.imageUrl}
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col gap-1">
                                            <div className="flex w-full justify-between">
                                                <p className="flex-1 text-base font-bold">
                                                    {course.title}
                                                </p>
                                                <span className="text-lg font-bold">
                                                    {formatNumberWithCommas(course.price)} VND
                                                </span>
                                            </div>
                                            <p> {course.description}</p>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        ></List>
                    )}

                    {isLoading && <Skeleton active />}
                </div>
            </div>
        </div>
    );
};

export default ViewCourseListPage;
