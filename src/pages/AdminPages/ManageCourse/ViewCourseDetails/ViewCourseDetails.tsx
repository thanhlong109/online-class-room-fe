import { useEffect, useState } from 'react';
import { Button, Tag, Typography, Row, Col, Divider, Image } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useGetCourseIDQuery } from '../../../../services';
import { Course, Section } from '../../../../types/Course.type';
import { FormatType, secondsToTimeString } from '../../../../utils/TimeFormater';
import { formatNumberWithCommas } from '../../../../utils/NumberFormater';

const ViewCourseDetails = () => {
    const { Title, Text } = Typography;
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

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };
    return (
        <>
            {course && (
                <Row justify="center" gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={8}>
                        <div className="mt-20 text-center">
                            <Image
                                src={course?.imageUrl}
                                alt="Course Image"
                                className="mb-4 rounded-full border-2 border-gray-300"
                                width={208}
                                height={208}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={16}>
                        <div>
                            <Title level={2} className="text-center">
                                Thông tin khóa học
                            </Title>
                            <Divider />
                            <div>
                                <Text strong>Tên khóa học: </Text>
                                <Text>{course?.title}</Text>
                            </div>
                            <div>
                                <Text strong>Giá khóa học: </Text>
                                <Text>{formatNumberWithCommas(course?.price)} ₫</Text>
                            </div>
                            <div>
                                <Text strong>Thể loại: </Text>
                                <Text>
                                    {course?.courseCategories.map((category, index) => (
                                        <span key={category.courseCategoryId}>
                                            {category.category.name}
                                            {index < course.courseCategories.length - 1 && ', '}
                                        </span>
                                    ))}
                                </Text>
                            </div>
                            <div>
                                <Text strong>Mô tả khóa học: </Text>
                                <Text>{truncateText(course?.description || '', 150)}</Text>
                            </div>
                            <div>
                                <Text strong>Kiến thức đạt được sau khóa học: </Text>
                                {course?.knowdledgeDescription
                                    .split('|')
                                    .map((text, index) => (
                                        <Text key={index}>{truncateText(text, 150)}</Text>
                                    ))}
                            </div>
                            <div>
                                <Text strong>Tổng thời gian khóa học: </Text>
                                <Text>
                                    {course?.sections?.length} học phần -{' '}
                                    {handleCalLession(course?.sections || [])} bài học -{' '}
                                    {formattedTime} tổng thời gian học
                                </Text>
                            </div>
                            <div>
                                <Text strong>Thời gian tạo ra khóa học: </Text>
                                <Text>
                                    {course?.createAt ? course?.createAt.split('T')[0] : ''}
                                </Text>
                            </div>
                            <div>
                                <Text strong>Trạng thái khóa học: </Text>
                                <Tag color={course?.courseIsActive ? 'success' : 'error'}>
                                    {course?.courseIsActive ? 'Hoạt động' : 'Không hoạt động'}
                                </Tag>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Link to={'/admin/getAllCourse/'}>
                                    <Button danger>Quay lại</Button>
                                </Link>
                                <Link to={`/admin/updateCourse/${courseId}`}>
                                    <Button
                                        className="ml-3 bg-[#1677ff] text-white hover:bg-[#a4ccf4ee]"
                                        type="primary"
                                    >
                                        Thay đổi thông tin khóa học
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default ViewCourseDetails;
