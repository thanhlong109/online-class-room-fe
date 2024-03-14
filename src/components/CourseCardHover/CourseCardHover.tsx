import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { LoadingButton } from '@mui/lab';
import { Course } from '../../types/Course.type';
import { FormatType, getVNDateString, secondsToTimeString } from '../../utils/TimeFormater';
import { FavoriteButton, RenderRichText } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAddOrderToDBMutation } from '../../services/order.services';
import { useEffect } from 'react';
import { setPreOrderData } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { useCheckRegistrationCourseQuery } from '../../services/registrationCourse.services';
import { Skeleton } from 'antd';

interface Props {
    course: Course | undefined;
}

const CourseCardHover = ({ course }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accountId = useSelector((state: RootState) => state.user.id);
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const [
        addOrder,
        { isLoading: addOrderLoading, isSuccess: isAddOrderSuccess, data: addOrderData },
    ] = useAddOrderToDBMutation();

    const {
        refetch,
        data: checkRegistrationData,
        isLoading: isCheckRegistrationLoading,
    } = useCheckRegistrationCourseQuery({
        accountId: accountId ? accountId : '',
        courseId: course ? course.courseId : 0,
    });
    useEffect(() => {
        if (isAddOrderSuccess && addOrderData && course) {
            dispatch(setPreOrderData({ addOrderRespone: addOrderData, CourseData: course }));
            navigate('/checkout');
        }
    }, [isAddOrderSuccess]);

    useEffect(() => {
        refetch();
    }, [accountId]);

    const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (accountId && course && isLogin) {
            addOrder({ accountId, courseId: course.courseId });
        } else {
            navigate('/login');
        }
    };
    const handleLearnClick = () => {
        if (course) navigate('/learn/' + course.courseId);
    };
    return (
        <>
            <div className="flex max-w-[300px] flex-col gap-1 p-4 pb-6">
                <h1 className="text-lg font-bold">{course?.title}</h1>
                <p className="mt-1 text-xs text-green-600">
                    Cập nhật mới nhất{' '}
                    <span className="font-bold">{getVNDateString(course?.updateAt)}</span>
                </p>
                <p className="text-xs">
                    Thời lượng{' '}
                    {secondsToTimeString(course?.totalDuration, FormatType.HH_MM, [
                        ' Giờ',
                        ' phút',
                    ])}
                </p>
                <p className="mt-1 line-clamp-2 text-ellipsis">
                    {course && <RenderRichText jsonData={course.description} />}
                </p>
                <div className="flex flex-col gap-1 text-sm">
                    {course?.knowdledgeDescription &&
                        course?.knowdledgeDescription
                            .split('|')
                            .filter((value, index) => value.trim().length > 0 && index < 2)
                            .map((string, index) => (
                                <div className="flex gap-4" key={index}>
                                    <span>
                                        <CheckOutlinedIcon style={{ fontSize: 'inherit' }} />
                                    </span>
                                    <span className="line-clamp-2 text-ellipsis">{string}</span>
                                </div>
                            ))}
                </div>
                <div className="mt-4 flex gap-2">
                    {!isCheckRegistrationLoading && !checkRegistrationData?.registrationId && (
                        <LoadingButton
                            onClick={handleBuyClick}
                            loading={addOrderLoading}
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
                    {isCheckRegistrationLoading && <Skeleton.Input active className="!flex-1" />}
                    {course?.courseId && <FavoriteButton courseId={course?.courseId} />}
                </div>
            </div>
        </>
    );
};

export default CourseCardHover;
