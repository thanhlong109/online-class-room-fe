import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Course } from '../../types/Course.type';
import { FormatType, getVNDateString, secondsToTimeString } from '../../utils/TimeFormater';
import {
    useAddWishlistByAccountIDMutation,
    useRemoveWishlistByAccountIDMutation,
} from '../../services/wishlist.services';
import { RootState } from '../../store';
import { useAppSelector } from '../../hooks/appHook';
import { useCheckCourseIsInWishlist } from '../../hooks/courseHook';
import { CircularProgress, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addWishList, removeWishlist } from '../../slices/courseSlice';

interface Props {
    course: Course | undefined;
}

const CourseCardHover = ({ course }: Props) => {
    const dispatch = useDispatch();
    //wishlist ui
    const [isFavorite, setFavorite] = useState(false);
    //load wishlist from sever and check
    const isWishlist = useCheckCourseIsInWishlist(course?.courseId);

    //declare request add wishlist
    const [addWishListMutate, { isSuccess: isAddSuccess, isLoading: isAddLoading }] =
        useAddWishlistByAccountIDMutation();

    const [removeWishListMutate, { isSuccess: isRemoveSuccess, isLoading: isRemoveLoading }] =
        useRemoveWishlistByAccountIDMutation();

    //get account id from slice state
    const accontId = useAppSelector((state: RootState) => state.user.id);

    //for handle event
    const handleOnClickFavorite = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (accontId && course?.courseId) {
            if (isFavorite) {
                await removeWishListMutate({ accountId: accontId, courseId: course.courseId });
            } else {
                await addWishListMutate({ accountId: accontId, courseId: course.courseId });
            }
        }
    };

    const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
    };

    //when change update ui
    useEffect(() => {
        setFavorite(isWishlist);
    }, [isWishlist]);

    useEffect(() => {
        if (isAddSuccess && course?.courseId) {
            dispatch(addWishList({ courseId: course.courseId }));
            setFavorite(true);
        }
    }, [isAddSuccess]);

    useEffect(() => {
        if (isRemoveSuccess && course?.courseId) {
            dispatch(removeWishlist({ courseId: course.courseId }));
            setFavorite(false);
        }
    }, [isRemoveSuccess]);

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
                <p className="mt-1 line-clamp-2 text-ellipsis">{course?.description}</p>
                <div className="flex flex-col gap-1 text-sm">
                    {course?.knowdledgeDescription &&
                        course?.knowdledgeDescription.split('|').map((string, index) => (
                            <div className="flex gap-4" key={index}>
                                <span>
                                    <CheckOutlinedIcon style={{ fontSize: 'inherit' }} />
                                </span>
                                <span className="line-clamp-2 text-ellipsis">{string}</span>
                            </div>
                        ))}
                </div>
                <div className="mt-4 flex gap-2">
                    <LoadingButton fullWidth onClick={handleBuyClick} variant="contained">
                        Mua khóa học
                    </LoadingButton>
                    <IconButton
                        onClick={handleOnClickFavorite}
                        className="!text-[#e95c5c]"
                        size="large"
                        disabled={isAddLoading || isRemoveLoading}
                    >
                        {!(isAddLoading || isRemoveLoading) &&
                            (isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />)}
                        {(isAddLoading || isRemoveLoading) && (
                            <CircularProgress
                                color="secondary"
                                className="!h-[24px] !w-[24px]"
                                variant="indeterminate"
                            />
                        )}
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default CourseCardHover;
