import { List, Typography } from 'antd';
// import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useGetAllNotificationsQuery } from '../../services/notification.services';
import { RootState } from '../../store';

const NotificationPopover = () => {
//  const [notiList, setNotiList] = useState<number[]>([]);
  const accountId = useSelector((state: RootState) => state.user.id);
  const { data, isLoading } = useGetAllNotificationsQuery({accountId: accountId?accountId : '', pageNumber: 1, pageSize:1});
//   const notifications = [
//     { id: 1, content: 'Chưa có thông báo nào' },
//   ];
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (isSuccess && data) {
//         const loaded = data.map((value) => value.notification);
//         dispatch(setNotiList(loaded));
//     }
// }, [isSuccess]);

  return (
    <div className='w-[300px]'>
      <div className='p-[5px]'>
        <Typography.Text className='text-xl font-bold'> Thông báo </Typography.Text>
      </div>
      <div className='max-h-[300px] overflow-auto'>
        <List
          dataSource={data}
          loading = {isLoading}
          renderItem={(item) => (
            <List.Item key={item.notificationId}>
              <Typography.Text>{item.title}</Typography.Text>
              <Typography.Text>{item.sendDate}</Typography.Text>
              <Typography.Text>{item.message}</Typography.Text>
              <Typography.Text>{item.type}</Typography.Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default NotificationPopover;
