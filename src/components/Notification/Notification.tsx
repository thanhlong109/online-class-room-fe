import { Badge, Popover } from 'antd';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationPopover from './NotificationPopover';
import { IconButton } from '@mui/material';
import { useGetNumberOfUnreadNotificationsQuery } from '../../services/notification.services';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const Notification = () => {
    const accountId = useSelector((state: RootState) => state.user.id);
    const { data, refetch } = useGetNumberOfUnreadNotificationsQuery(accountId ? accountId : '');
    return (
        <>
            <Popover
                content={
                    <NotificationPopover
                        onMakeIsReadNoti={() => {
                            refetch();
                        }}
                    />
                }
                trigger="hover"
            >
                <IconButton>
                    <Badge count={data ? data : 0} color="#a435f0">
                        <NotificationsNoneIcon />
                    </Badge>
                </IconButton>
            </Popover>
        </>
    );
};

export default Notification;
//
