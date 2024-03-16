import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useGetAccountByParentAccountIdQuery } from '../../../services/account.services';
import { useEffect } from 'react';

import ChildAccountCard from './ChildAccountCard';
import { setChildsAccountId } from '../../../slices/parentSlice';
import { Skeleton } from 'antd';

const ParentMainPage = () => {
    const dispatch = useDispatch();
    const acc = useSelector((state: RootState) => state.user);
    const childs = useSelector((state: RootState) => state.parent.childsData);
    const { isLoading, isSuccess, data } = useGetAccountByParentAccountIdQuery(
        acc.id ? acc.id : '',
    );

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setChildsAccountId(data));
        }
    }, [isSuccess]);

    return (
        <div className="">
            <div>
                <h2 className="text-xl font-bold text-blue-500">Chọn tài khoản muốn xem</h2>
                <div className="mt-6">
                    <div className="flex flex-wrap gap-4">
                        {!isLoading &&
                            childs &&
                            childs.map((acc, index) => (
                                <ChildAccountCard childAccount={acc} key={index} />
                            ))}
                        {isLoading && <Skeleton active />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentMainPage;
