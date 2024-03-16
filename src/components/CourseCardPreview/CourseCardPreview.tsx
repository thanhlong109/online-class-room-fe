import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Course } from '../../types/Course.type';
import { formatNumberWithCommas } from '../../utils/NumberFormater';
import { FormatType, secondsToTimeString } from '../../utils/TimeFormater';
import { FavoriteButton, Video } from '..';
import { Modal, Skeleton } from 'antd';
import { useAddOrderToDBMutation } from '../../services/order.services';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setPreOrderData } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { useCheckRegistrationCourseQuery } from '../../services/registrationCourse.services';

interface Props {
    course: Course;
}

const CourseCardPreview = ({ course }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const accountId = useSelector((state: RootState) => state.user.id);
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);

    const [
        addOrder,
        { isLoading: isAddOrderLoading, isSuccess: isAddOrderSuccess, data: addOrderData },
    ] = useAddOrderToDBMutation();
    const {
        refetch,
        data: checkRegistrationData,
        isLoading: isCheckRegistrationLoading,
    } = useCheckRegistrationCourseQuery({
        accountId: accountId ? accountId : '',
        courseId: course.courseId,
    });
    useEffect(() => {
        if (isAddOrderSuccess && addOrderData) {
            dispatch(setPreOrderData({ addOrderRespone: addOrderData, CourseData: course }));
            navigate('/checkout');
        }
    }, [isAddOrderSuccess]);

    useEffect(() => {
        refetch();
    }, [accountId]);

    const handleBuyClick = () => {
        if (accountId && isLogin) {
            addOrder({ accountId, courseId: course.courseId });
        } else {
            navigate('/login');
        }
    };

    const handleLearnClick = () => {
        navigate('/learn/' + course.courseId);
    };

    const handlePreviewClick = () => {
        console.log(`link ${course.videoPreviewUrl}`);
        setOpenPreviewModal(true);
    };

    return (
        <>
            <Paper className="w-[350px]" elevation={3}>
                <div className=" p-0.5">
                    <div className="relative flex justify-center">
                        <div className="flex max-h-[200px] items-center justify-center overflow-hidden">
                            <img src={course?.imageUrl} className="w-full rounded-sm" />
                        </div>
                        <div
                            className="absolute inset-0 flex cursor-pointer items-center justify-center"
                            onClick={handlePreviewClick}
                        >
                            <PlayCircleOutlineIcon style={{ fontSize: 50, color: '#fff' }} />
                        </div>
                        <span className="absolute bottom-7 flex justify-center text-lg font-bold text-white">
                            Xem trước
                        </span>
                    </div>

                    <div className="flex flex-col gap-2 px-8 py-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">
                                {formatNumberWithCommas(course?.price)}₫
                            </h2>{' '}
                            <FavoriteButton courseId={course.courseId} />
                        </div>
                        {!isCheckRegistrationLoading && !checkRegistrationData?.registrationId && (
                            <LoadingButton
                                onClick={handleBuyClick}
                                loading={isAddOrderLoading}
                                variant="contained"
                                className="flex-1 bg-[#a435f0]"
                            >
                                Mua khóa học
                            </LoadingButton>
                        )}
                        {!isCheckRegistrationLoading && checkRegistrationData?.registrationId && (
                            <LoadingButton
                                onClick={handleLearnClick}
                                variant="contained"
                                className="flex-1 bg-[#a435f0]"
                            >
                                Tiếp tục học
                            </LoadingButton>
                        )}
                        {isCheckRegistrationLoading && (
                            <Skeleton.Input active className="!flex-1" />
                        )}

                        <div>
                            <h2 className="mt-4">Khóa học này bao gồm:</h2>
                            <div className="mt-3 flex flex-col gap-2">
                                <div className="flex items-center text-sm">
                                    <OndemandVideoIcon
                                        className="mr-4"
                                        style={{ fontSize: 'inherit' }}
                                    />
                                    <p>
                                        {secondsToTimeString(
                                            course.totalDuration,
                                            FormatType.HH_MM,
                                            [' giờ', ' phút'],
                                        )}{' '}
                                        thời gian học
                                    </p>
                                </div>
                                <div className="flex items-center text-sm">
                                    <PhoneAndroidIcon
                                        className="mr-4"
                                        style={{ fontSize: 'inherit' }}
                                    />
                                    <p>Có thể truy cập bằng điện thoại</p>
                                </div>
                                <div className="flex items-center text-sm">
                                    <AllInclusiveIcon
                                        className="mr-4"
                                        style={{ fontSize: 'inherit' }}
                                    />
                                    <p>Truy cập trọn đời</p>
                                </div>
                                <div className="flex items-center text-sm">
                                    <EmojiEventsOutlinedIcon
                                        className="mr-4"
                                        style={{ fontSize: 'inherit' }}
                                    />
                                    <p>Cấp chứng chỉ khi hoàn thành khóa học</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
            <Modal
                open={openPreviewModal}
                centered
                maskClosable={true}
                footer={null}
                closable={false}
                className="!w-[1000px]"
                destroyOnClose
                onCancel={() => setOpenPreviewModal(false)}
            >
                <div>
                    <Video src={course.videoPreviewUrl} />
                </div>
            </Modal>
        </>
    );
};

export default CourseCardPreview;
