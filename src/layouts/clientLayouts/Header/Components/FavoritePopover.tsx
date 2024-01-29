import { List, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWishlistByAccountIDQuery } from '../../../../services/wishlist.services';
import WishListItem from './WishListItem';
import { setWishList } from '../../../../slices/courseSlice';

const FavoritePopover = () => {
    const [wishlist, updateWishlist] = useState<number[]>([]);
    const wishlistState = useSelector((state: RootState) => state.course.wishList);
    const accountId = useSelector((state: RootState) => state.user.id);
    const { data, isLoading, isSuccess } = useGetWishlistByAccountIDQuery(accountId);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isSuccess) {
            const loaded = data.map((value) => value.courseId);
            dispatch(setWishList(loaded));
        }
    }, [isSuccess]);

    useEffect(() => {
        updateWishlist(wishlistState);
    }, [wishlistState]);
    return (
        <div className="w-[300px]">
            <div className="p-[5px]">
                <Typography.Text className="text-lg font-bold">
                    {' '}
                    Khóa học yêu thích{' '}
                </Typography.Text>
            </div>
            <div className="max-h-[300px] overflow-auto">
                <List
                    loading={isLoading}
                    dataSource={wishlist}
                    renderItem={(item) => (
                        <List.Item key={item}>
                            <WishListItem courseId={item} />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};
export default FavoritePopover;
