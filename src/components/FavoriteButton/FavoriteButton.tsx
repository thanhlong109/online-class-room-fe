import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCheckCourseIsInWishlist } from '../../hooks/courseHook';
import {
    useAddWishlistByAccountIDMutation,
    useRemoveWishlistByAccountIDMutation,
} from '../../services/wishlist.services';
import { useAppSelector } from '../../hooks/appHook';
import { RootState } from '../../store';
import { CircularProgress, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addWishList, removeWishlist } from '../../slices/courseSlice';

interface Props {
    courseId: number;
}

const FavoriteButton = ({ courseId }: Props) => {
    const dispatch = useDispatch();
    //wishlist ui
    const [isFavorite, setFavorite] = useState(false);
    //load wishlist from sever and check
    const isWishlist = useCheckCourseIsInWishlist(courseId);

    const wishList = useSelector((state: RootState) => state.course.wishList);

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
        if (accontId && courseId) {
            if (isFavorite) {
                await removeWishListMutate({ accountId: accontId, courseId: courseId });
            } else {
                await addWishListMutate({ accountId: accontId, courseId: courseId });
            }
        }
    };

    //when change update ui
    useEffect(() => {
        setFavorite(isWishlist);
    }, [isWishlist]);

    useEffect(() => {
        if (isAddSuccess && courseId) {
            dispatch(addWishList(courseId));
        }
    }, [isAddSuccess]);

    useEffect(() => {
        if (isRemoveSuccess && courseId) {
            dispatch(removeWishlist(courseId));
        }
    }, [isRemoveSuccess]);

    useEffect(() => {
        const index = wishList.findIndex((course) => course === courseId);
        setFavorite(index != -1);
    }, [wishList]);
    return (
        <>
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
        </>
    );
};

export default FavoriteButton;
