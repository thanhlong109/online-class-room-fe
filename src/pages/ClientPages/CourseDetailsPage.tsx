import { Skeleton } from 'antd';
import CourseSection from '../../components/CourseSection/CourseSection';
import { useGetCourseIDQuery } from '../../services';
import { CourseBanner, CourseCardPreview, RatingCourseItem } from '../../components';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { FormatType, secondsToTimeString } from '../../utils/TimeFormater';

const CourseDetailsPage = () => {
    const { data, isLoading } = useGetCourseIDQuery(7);
    const learned = [
        'Kiến thức cơ bản về C#',
        'Khái niệm OOP trong lập trình',
        'Hình thành kĩ năng giải quyết vấn đề trong lập trình',
        'Viết code sạch và dễ mở rộng',
    ];
    const handleCalTotalTime = (tracks: Tracks[]) => {
        let totalTimeLession = 0;
        tracks.map((track) => {
            track.track_steps.map((step) => {
                totalTimeLession += step.step.duration;
            });
        });
        return secondsToTimeString(totalTimeLession, FormatType.HH_MM, ['h', 'm']);
    };

    const handleCalLession = (tracks: Tracks[]) => {
        let totalLession = 0;
        tracks.map((track) => {
            totalLession += track.track_steps.length;
        });
        return totalLession;
    };
    return (
        <>
            <div>
                <div>
                    <CourseBanner />
                    <div className="container">
                        <div className="flex max-w-[1290px] gap-10">
                            <div className="flex flex-1 flex-col gap-10 py-10">
                                <div className=" border-[1px] border-[#d1d7dc] px-4 pb-4 pt-6">
                                    <h1 className="text-2xl font-bold text-[#2d2f31]">
                                        Bạn sẽ học được:
                                    </h1>
                                    <div className="mt-3 grid grid-cols-2 gap-2">
                                        {learned.map((text) => (
                                            <div className="flex items-center gap-2 text-base">
                                                <span>
                                                    <CheckOutlinedIcon
                                                        style={{ fontSize: 'inherit' }}
                                                    />
                                                </span>
                                                <span>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h1 className="mb-4 text-2xl font-bold text-[#2d2f31]">
                                        Nội dung khóa học:
                                    </h1>
                                    <div>
                                        {!isLoading && data?.tracks != null && (
                                            <span>
                                                {data.tracks.length} học phần -{' '}
                                                {handleCalLession(data.tracks)} bài học -{' '}
                                                {handleCalTotalTime(data.tracks)} tổng thời gian học
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-4">
                                        {isLoading && <Skeleton active />}
                                        {!isLoading && (
                                            <CourseSection courseSections={data?.tracks} />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h1 className="mb-4 text-2xl font-bold text-[#2d2f31]">
                                        Chi tiết khóa học:
                                    </h1>
                                    <p className="text-sm">
                                        Bạn đã sẵn sàng nâng cao kỹ năng phát triển trò chơi của
                                        mình chưa? cấp độ tiếp theo và tạo trò chơi RPG độc đáo của
                                        riêng bạn? Nhìn không xa hơn khóa học toàn diện và độc lập
                                        này, được thiết kế để hướng dẫn bạn thực hiện quy trình này
                                        từng bước một, thậm chí nếu bạn chưa có kinh nghiệm phát
                                        triển trò chơi trước đây. tôi có thậm chí còn bao gồm một
                                        khóa học cấp tốc kéo dài 3 giờ dành cho những người chưa có
                                        kiến thức trong Unity. Mặc dù tốt hơn là nên có một ít kinh
                                        nghiệm và kiến thức về C#, đừng lo lắng nếu bạn không có nó
                                        vì tôi sẽ trình bày mọi thứ bạn cần biết để tạo một trò chơi
                                        RPG. Trong suốt khóa học này, bạn sẽ học cách để tạo một bộ
                                        điều khiển trình phát đa năng sử dụng trạng thái hữu hạn máy
                                        móc, cấp độ, hiệu ứng thị sai, bộ điều khiển máy ảnh, kẻ thù
                                        để chiến đấu chống lại và một hệ thống chiến đấu hấp dẫn với
                                        các cơ chế như lao, phản công, kỹ năng, v.v.
                                    </p>
                                </div>
                                <div>
                                    <h1 className="mb-4 text-2xl font-bold text-[#2d2f31]">
                                        5 course rating - 47 ratings
                                    </h1>
                                    <div className="grid grid-cols-2 gap-4">
                                        <RatingCourseItem />
                                        <RatingCourseItem />
                                        <RatingCourseItem />
                                        <RatingCourseItem />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[-100px]">
                                <CourseCardPreview />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseDetailsPage;
