import { Badge, Popover } from 'antd';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationPopover from './NotificationPopover';
import { IconButton } from '@mui/material';

const Notification = () => {
    return (
        <>
            <Popover content={<NotificationPopover />} trigger="hover">
                <IconButton>
                    <Badge count="2" color="#a435f0">
                        <NotificationsNoneIcon />
                    </Badge>
                </IconButton>
            </Popover>
        </>
    );
};

export default Notification;
//
