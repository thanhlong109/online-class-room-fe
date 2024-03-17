import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Flex, List, Progress, Typography } from 'antd';
import moment from 'moment/min/moment-with-locales';
import { RenderRichText } from '../../../components';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const CheckLearningProgress = () => {
    const selecting = useSelector((state: RootState) => state.parent.selectingAccountID);
    const data = useSelector((state: RootState) =>
        state.parent.registrationCourses?.find((cData) => cData.childId === selecting),
    );
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex gap-4">
                <Button onClick={() => navigate('/parent/')} startIcon={<ArrowBackIcon />}>
                    Quay laị
                </Button>
                <p className="flex-1 text-center text-xl font-semibold text-[#1976d2]">
                    Tiến trình học
                </p>
            </div>
            <div className="mt-8 px-8">
                <List
                    itemLayout="vertical"
                    dataSource={data?.courses}
                    pagination={{
                        pageSize: 3,
                    }}
                    renderItem={(item, index) => (
                        <List.Item className="!flex !gap-4" key={index}>
                            <div className="flex h-[160px] w-[300px] items-center overflow-hidden rounded-lg shadow-md">
                                <img src={item.courseImg} className="w-full  object-fill" alt="" />
                            </div>
                            <div className="flex flex-1 flex-col text-[#000000e0]">
                                <Typography.Title level={4}>{item.courseTitle}</Typography.Title>

                                <Flex vertical gap={1}>
                                    <RenderRichText jsonData={item.courseDescription} />
                                    <Typography.Text>
                                        <strong>Ngày đăng ký khóa học: </strong>
                                        {moment(item.enrollmentDate).locale('vi').format('L')}
                                    </Typography.Text>
                                </Flex>
                            </div>
                            <div>
                                <Progress
                                    percent={Math.ceil(item.learningProgress * 100)}
                                    type="circle"
                                    status={
                                        Math.ceil(item.learningProgress * 100) >= 100
                                            ? 'success'
                                            : 'normal'
                                    }
                                />
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default CheckLearningProgress;
