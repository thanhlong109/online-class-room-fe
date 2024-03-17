import { Checkbox, List, Select, Skeleton, Tag, Typography } from 'antd';
import FilterListIcon from '@mui/icons-material/FilterList';
import { DefaultOptionType } from 'antd/es/select';
import { useGetCourselistPaginationQuery } from '../../services/course.services';
import { useEffect, useState } from 'react';
import { CourselistPaginationRequest, CourselistPaginationRespone } from '../../types/Course.type';
import { formatNumberWithCommas } from '../../utils/NumberFormater';
import moment from 'moment/min/moment-with-locales';
import { FormatType, secondsToTimeString } from '../../utils/TimeFormater';
import { Link } from 'react-router-dom';
import { useGetCategoryQuery } from '../../services/categoryService';
import { Button } from '@mui/material';

const options: DefaultOptionType[] = [
    { label: 'Mới nhất', value: 'Mới nhất' },
    { label: 'Phổ biến', value: 'Phổ biến' },
    { label: 'Đánh giá cao', value: 'Đánh giá cao' },
];

const ViewCourseListPage = () => {
    const [courselistPaginationRequest, setCourselistPaginationRequest] =
        useState<CourselistPaginationRequest>({});
    const [coursesRepsone, setCoursesRespone] = useState<CourselistPaginationRespone>();
    const [category, setCategory] = useState<number[]>([]);

    const { data, isSuccess, isLoading, refetch } = useGetCourselistPaginationQuery(
        courselistPaginationRequest,
    );
    const { data: categoryData } = useGetCategoryQuery();

    useEffect(() => {
        if (isSuccess && data) {
            setCoursesRespone(data);
        }
    }, [isSuccess, data]);

    const handleOnCategoryChange = (checkedValue: number[]) => {
        setCategory(checkedValue);
    };

    const onFilterClick = () => {
        setCourselistPaginationRequest({ categoryIds: category.length > 0 ? category : undefined });
        refetch();
    };

    return (
        <div className="container flex flex-col gap-6">
            <Typography.Title level={3}>Tất cả khóa học</Typography.Title>
            <div className="flex gap-2">
                <span className="cursor-pointer border-[1px] p-4">
                    <FilterListIcon /> Lọc theo
                </span>
                <Select className="!h-16" defaultValue={'Mới nhất'} options={options} />
            </div>
            <div className="flex gap-4">
                <div className="flex flex-col gap-6">
                    <div>
                        <Typography.Title level={4}>Thể loại:</Typography.Title>
                        <div>
                            <Checkbox.Group
                                className="flex flex-col gap-2 font-medium italic"
                                options={categoryData?.map((category) => ({
                                    label: category.name,
                                    value: category.catgoryId,
                                }))}
                                onChange={handleOnCategoryChange}
                            />
                        </div>
                    </div>

                    <div>
                        <Button onClick={onFilterClick} variant="contained">
                            lọc ngay
                        </Button>
                    </div>
                </div>

                <div className="flex-1 text-[#2d2f31]">
                    {coursesRepsone && (
                        <List
                            loading={isLoading}
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                pageSize: 5,
                            }}
                            dataSource={coursesRepsone.courses.filter((course) => course.isPublic)}
                            renderItem={(course, index) => (
                                <List.Item key={index}>
                                    <Link to={'/courses/' + course.courseId}>
                                        <div className="flex gap-3">
                                            <div className="max-h-[170px]  w-[965px] max-w-[300px] overflow-y-hidden border">
                                                <img
                                                    className="w-full object-fill"
                                                    src={course.imageUrl}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col gap-2">
                                                <div className="flex w-full justify-between">
                                                    <p className="flex-1 text-base font-bold">
                                                        {course.title}
                                                    </p>
                                                    <span className="text-lg font-bold">
                                                        {formatNumberWithCommas(course.price)} VND
                                                    </span>
                                                </div>
                                                <div>
                                                    <Typography.Text>
                                                        <strong className="mr-1">Thể loại: </strong>
                                                        {course.courseCategory
                                                            .split(',')
                                                            .map((value) => (
                                                                <Tag color="cyan-inverse">
                                                                    {value}
                                                                </Tag>
                                                            ))}
                                                    </Typography.Text>
                                                </div>
                                                <div>
                                                    <Typography.Text>
                                                        <strong className="mr-1">
                                                            Lần cập nhật gần nhất:{' '}
                                                        </strong>
                                                        <span className="font-semibold italic text-[#13c2c2]">
                                                            {moment(course.updateAt)
                                                                .locale('vi')
                                                                .format('L')}
                                                        </span>
                                                    </Typography.Text>
                                                </div>
                                                <div>
                                                    <Typography.Text>
                                                        <strong className="mr-1">
                                                            Tổng số giờ học:{' '}
                                                        </strong>
                                                        <span className="font-semibold italic text-[#13c2c2]">
                                                            {secondsToTimeString(
                                                                course.totalDuration,
                                                                FormatType.HH_MM,
                                                                [' Giờ', ' Phút'],
                                                            )}
                                                        </span>
                                                    </Typography.Text>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
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
