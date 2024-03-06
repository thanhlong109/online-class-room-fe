import { useEffect, useState } from 'react';
import { Button, Tag, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { useGetCourseIDQuery } from '../../../../services';
import { Course, Section } from '../../../../types/Course.type';
import { FormatType, secondsToTimeString } from '../../../../utils/TimeFormater';
import { formatNumberWithCommas } from '../../../../utils/NumberFormater';

const ViewCourseDetails = () => {
    const { Title } = Typography;
    const [courseId, setCourseId] = useState('');
    const location = useLocation();
    const [course, setCourse] = useState<Course | null>(null);
    useEffect(() => {
        const getCourseId = location.pathname.split('/').pop();
        if (getCourseId) {
            setCourseId(getCourseId);
        }
    }, []);
    const { data, isSuccess } = useGetCourseIDQuery(courseId);
    useEffect(() => {
        if (data) setCourse(data);
        console.log(data);
    }, [isSuccess]);

    const formattedTime = secondsToTimeString(course?.totalDuration, FormatType.HH_MM, ['h', 'm']);
    const handleCalLession = (sections: Section[]) => {
        let totalLession = 0;
        sections.forEach((section) => {
            totalLession += section?.steps?.length;
        });
        return totalLession;
    };

    const truncateText = (text: string) => {
        const words = text.split(' ');
        if (words.length > 30) {
            return words.slice(0, 30).join(' ') + '...';
        } else {
            return text;
        }
    };
    return (
        <>
            {course && (
                <div className="mx-auto flex w-[98%] items-center justify-center">
                    <div className="flex  w-[30%] flex-col items-center border-r border-gray-300">
                        {/* Content for the left section */}
                        <img
                            src={course?.imageUrl}
                            alt="Course Image"
                            className="mb-5 h-52 w-52 rounded-full border-2 border-gray-300 object-cover"
                        />
                    </div>
                    <div className="ml-5 flex w-[70%] flex-col items-start justify-between">
                        <div className="flex w-full justify-center">
                            <Title level={2}>Thông tin khóa học</Title>
                        </div>

                        <div className="mx-auto grid w-[70%] grid-cols-1 gap-x-4 gap-y-2">
                            <div className="flex items-center justify-between">
                                <h4 className="text-base font-medium">Tên khóa học:</h4>
                                <p className="text-sm">{course?.title}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="text-base font-medium">Giá khóa học:</h4>
                                <p className="text-sm">
                                    {' '}
                                    {formatNumberWithCommas(course?.price)} ₫
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="text-base font-medium">Thể loại:</h4>
                                <p className="text-sm"></p>
                            </div>
                            <div className="flex items-start justify-between">
                                <h4 className="text-base font-medium">Mô tả khóa học:</h4>
                                <p className=" w-64 text-left text-sm">
                                    {' '}
                                    {truncateText(course?.description || '')}
                                </p>
                            </div>
                            <div className="flex items-start justify-between">
                                <h4 className="text-base font-medium">
                                    Kiến thức đạt được sau khóa học:
                                </h4>
                                {course?.knowdledgeDescription.split('|').map((text, index) => (
                                    <p className=" w-64 text-left text-sm" key={index}>
                                        {truncateText(text)}
                                    </p>
                                ))}
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="text-base font-medium">Tổng thời gian khóa học:</h4>
                                <p className="text-sm">
                                    {' '}
                                    {course != null && (
                                        <>
                                            {course?.sections?.length} học phần -{' '}
                                            {handleCalLession(course?.sections)} bài học -{' '}
                                            {formattedTime} tổng thời gian học
                                        </>
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="text-base font-medium">
                                    Thời gian tạo ra khóa học:
                                </h4>
                                <p className="text-sm">
                                    {course?.createAt ? course?.createAt.split('T')[0] : ''}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="text-base font-medium">Trạng thái khóa học:</h4>
                                <Tag color={course?.courseIsActive ? 'success' : 'error'}>
                                    {course?.courseIsActive ? 'Hoạt động' : 'Không hoạt động'}
                                </Tag>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button className="bg-[#1677ff] text-white hover:bg-[#a4ccf4ee]">
                                    Thay đổi thông tin khóa học
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewCourseDetails;
