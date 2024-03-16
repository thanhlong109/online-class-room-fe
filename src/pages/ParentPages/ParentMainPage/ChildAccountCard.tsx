import { Avatar, Card } from 'antd';
import { useGetRegisterCourseByAccountIdQuery } from '../../../services/registrationCourse.services';
import { ChildAccountRespone } from '../../../types/Account.type';
import Meta from 'antd/es/card/Meta';
import { stringToColor } from '../../../utils/Color';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setSelectAccountID, upsertRestrationCourses } from '../../../slices/parentSlice';
import { useNavigate } from 'react-router-dom';

export interface ChildAccountCardProps {
    childAccount: ChildAccountRespone;
}

const ChildAccountCard = ({ childAccount }: ChildAccountCardProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isSuccess, data } = useGetRegisterCourseByAccountIdQuery(childAccount.id);
    const courses = useSelector((state: RootState) =>
        state.parent.registrationCourses?.find((data) => data.childId === childAccount.id),
    );
    useEffect(() => {
        if (isSuccess && data) {
            dispatch(upsertRestrationCourses({ childId: childAccount.id, courses: data }));
        }
    }, [isSuccess, data]);

    return (
        <div>
            <Card
                loading={isLoading}
                className="mt-4 cursor-pointer  select-none shadow-lg transition-shadow hover:shadow-xl"
                onClick={() => {
                    dispatch(setSelectAccountID(childAccount.id));
                    navigate('/parent/checkLearningProgress');
                }}
            >
                <Meta
                    avatar={
                        childAccount?.profileImg && childAccount.profileImg.length > 15 ? (
                            <Avatar src={childAccount.profileImg} />
                        ) : (
                            <Avatar
                                style={{
                                    backgroundColor: `${stringToColor(childAccount.firstName + ' ' + childAccount.lastName)}`,
                                    color: '#fff',
                                }}
                            >
                                <>
                                    {childAccount.firstName[0].toUpperCase() +
                                        childAccount.lastName[0].toUpperCase()}
                                </>
                            </Avatar>
                        )
                    }
                    title={childAccount.firstName + ' ' + childAccount.lastName}
                    description={
                        <div>
                            <p>Email: {childAccount.email}</p>
                            <p>Đã đăng ký {courses ? courses.courses.length : 0} khóa học</p>
                        </div>
                    }
                />
            </Card>
        </div>
    );
};

export default ChildAccountCard;
