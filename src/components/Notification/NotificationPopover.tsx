import { List, Typography } from 'antd';
// import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useGetAllNotificationsQuery,
    useMakeNotificationIsReadMutation,
} from '../../services/notification.services';
import { RootState } from '../../store';
import moment from 'moment/min/moment-with-locales';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface NotificationPopoverProps {
    onMakeIsReadNoti: () => void;
}

const NotificationPopover = ({ onMakeIsReadNoti }: NotificationPopoverProps) => {
    //  const [notiList, setNotiList] = useState<number[]>([]);
    const accountId = useSelector((state: RootState) => state.user.id);
    const { data, isLoading, refetch } = useGetAllNotificationsQuery({
        accountId: accountId ? accountId : '',
        pageNumber: 1,
        pageSize: 30,
    });
    const [makeIsReadNoti, { isSuccess }] = useMakeNotificationIsReadMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            onMakeIsReadNoti();
            refetch();
        }
    }, [isSuccess]);

    const handleOnClickFavorite = async (id: number, modelId: number, type: string) => {
        if (type.includes('Course')) {
            navigate(`/courses/${modelId}`);
            console.log(id);
            // } else if (type.includes('Service')) {
            //     navigate(`/courses/${modelId}`);
            // }else if (type.includes('Order')) {
            //     navigate(`/courses/${modelId}`);
            // }
        } else {
            navigate(`#`);
        }
    };

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
                                handleOnClickFavorite(item.notificationId, item.modelId, item.type);
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
                                    <span>
                                        {moment(item.sendDate).startOf('minutes').fromNow()}
                                    </span>
                                    <span>
                                        <Typography.Text style={{ paddingRight: '8px' }}>
                                            <span> </span>
                                            {moment(item.sendDate).locale('vi').format('LLL')}
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
