import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Button, IconButton, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Course } from '../../types/Course.type';
import { formatNumberWithCommas } from '../../utils/NumberFormater';
import { FormatType, secondsToTimeString } from '../../utils/TimeFormater';
import { FavoriteButton } from '..';

interface Props {
    course: Course;
}

const CourseCardPreview = ({ course }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleBuyClick = () => {
        //bui
    };

    return (
        <>
            <Paper className="w-[350px]" elevation={3}>
                <div className=" p-0.5">
                    <div className="relative flex justify-center">
                        <div className="flex max-h-[200px] items-center justify-center overflow-hidden">
                            <img src={course?.imageUrl} className="w-full rounded-sm" />
                        </div>
                        <div className="absolute inset-0 flex cursor-pointer items-center justify-center">
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

                        <LoadingButton
                            onClick={handleBuyClick}
                            loading={loading}
                            variant="contained"
                            className="bg-[#a435f0]"
                        >
                            Mua khóa học
                        </LoadingButton>
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
        </>
    );
};

export default CourseCardPreview;
