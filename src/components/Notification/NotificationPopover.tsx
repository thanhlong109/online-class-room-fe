import { List, Typography } from 'antd';

const NotificationPopover = () => {
  const notifications = [
    { id: 1, content: 'Chưa có thông báo nào' },
  ];
  return (
    <div className='w-[300px]'>
      <div className='p-[5px]'>
        <Typography.Text className='text-xl font-bold'> Thông báo </Typography.Text>
      </div>
      <div className='max-h-[300px] overflow-auto'>
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Typography.Text>{item.content}</Typography.Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default NotificationPopover;
