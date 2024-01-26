import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { Avatar } from '@mui/material';

interface Props {
    className: string;
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[1][0].toLowerCase()}`,
    };
}

const UserAvatar = ({ className }: Props) => {
    const userAvatar = useSelector((state: RootState) => state.user.profileImg);
    const userName = useSelector((state: RootState) => {
        return `${state.user.firstName} ${state.user.lastName}`;
    });
    return (
        <>
            {userAvatar && <Avatar className={className} src={userAvatar} />}
            {!userAvatar && <Avatar className={className} {...stringAvatar(userName)} />}
        </>
    );
};

export default UserAvatar;
