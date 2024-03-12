import { List, Typography } from 'antd';
// import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useGetAllNotificationsQuery,
    useMakeNotificationIsReadMutation,
} from '../../services/notification.services';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useEffect } from 'react';

export interface NotificationPopoverProps {
    onMakeIsReadNoti: () => void;
}

const NotificationPopover = ({ onMakeIsReadNoti }: NotificationPopoverProps) => {
    //  const [notiList, setNotiList] = useState<number[]>([]);
    const accountId = useSelector((state: RootState) => state.user.id);
    const { data, isLoading } = useGetAllNotificationsQuery({
        accountId: accountId ? accountId : '',
        pageNumber: 1,
        pageSize: 30,
    });
    const [makeIsReadNoti, { isSuccess }] = useMakeNotificationIsReadMutation();

    moment.locale('vi');

    useEffect(() => {
        if (isSuccess) {
            onMakeIsReadNoti();
        }
    }, [isSuccess]);

    return (
        <div className="w-[400px]">
            <div className="p-[5px]">
                <Typography.Text className="text-xl font-bold"> Thông báo </Typography.Text>
            </div>
            <div className=" max-h-[300px] cursor-pointer overflow-auto rounded-lg ">
                <List
                    dataSource={data}
                    loading={isLoading}
                    renderItem={(item) => (
                        <List.Item
                            className={`hover:bg-[#fcffc4] ${item.isRead ? '' : 'bg-amber-200'}`}
                            key={item.notificationId}
                            onClick={() => {
                                if (!item.isRead) makeIsReadNoti(item.notificationId);
                            }}
                        >
                            <div style={{ flex: '1' }}>
                                <img
                                    className="h-[40px]"
                                    src="https://firebasestorage.googleapis.com/v0/b/estudyhub-a1699.appspot.com/o/logo%2Fe-black.png?alt=media&token=a0a401b9-6d20-4597-833c-962457c543ac"
                                    alt=""
                                />
                            </div>
                            <div style={{ flex: '5' }}>
                                <p
                                    style={{
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        margin: 0,
                                        color: '#ff8228',
                                    }}
                                >
                                    <Typography.Text>{item.title}</Typography.Text>
                                </p>
                                <p style={{ fontSize: '13px', margin: 0 }}>
                                    <span style={{ fontWeight: 'bold' }}>
                                        <Typography.Text>{item.action}</Typography.Text>{' '}
                                    </span>
                                    {item.message}
                                </p>
                                <div
                                    className="mt-1"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '13px',
                                    }}
                                >
                                    <span>{moment(item.sendDate).endOf('day').fromNow()}</span>
                                    <span>
                                        <Typography.Text>
                                            {moment(item.sendDate).format('LT')}
                                            <span> </span>
                                            {moment(item.sendDate).format('l')}
                                        </Typography.Text>
                                    </span>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};
export default NotificationPopover;
