import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

interface Props {
    className: string;
}

const UserAvatar = ({ className }: Props) => {
    const userAvatar = useSelector((state: RootState) => state.user.profileImg);
    return (
        <>
            <Avatar className={className} src={userAvatar} size={'large'} />
        </>
    );
};

export default UserAvatar;
