import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';

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
    const splitName = name.toUpperCase().split(' ');
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${splitName.length > 1 ? `${splitName[0].charAt(0)}${splitName[1].charAt(0)}` : ''}`,
    };
}

const UserAvatar = ({ className }: Props) => {
    const userAvatar = useSelector((state: RootState) => state.user.profileImg);
    const [userName, setUserName] = useState<string | null>(null);

    const loadUsername = useSelector((state: RootState) => {
        return `${state.user.firstName} ${state.user.lastName}`;
    });
    useEffect(() => {
        setUserName(loadUsername);
    }, [loadUsername]);

    return (
        <>
            {userAvatar && <Avatar className={className} src={userAvatar} />}
            {!userAvatar && (
                <>{userName && <Avatar className={className} {...stringAvatar(userName)} />}</>
            )}
        </>
    );
};

export default UserAvatar;
