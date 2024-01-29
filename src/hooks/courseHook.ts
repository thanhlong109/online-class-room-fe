import { useSelector } from 'react-redux';
import { WishListRequest, useGetWishlistByAccountIDQuery } from '../services/wishlist.services';
import { RootState } from '../store';
import { useEffect, useState } from 'react';

export const useCheckCourseIsInWishlist = (courseId: number | undefined) => {
    const accountId = useSelector((state: RootState) => state.user.id);
    const [inWishList, setInWishList] = useState(false);
    const { isSuccess, data } = useGetWishlistByAccountIDQuery(accountId);
    useEffect(() => {
        if (isSuccess && courseId) {
            setInWishList(checkCourseInWishList(data, courseId));
        }
    }, [isSuccess]);
    return inWishList;
};

const checkCourseInWishList = (wishlists: WishListRequest[], courseIdCheck: number) => {
    const found = wishlists.find(({ courseId }) => courseId === courseIdCheck);
    return found ? true : false;
};
