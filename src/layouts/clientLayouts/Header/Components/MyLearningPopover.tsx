import { List, Typography } from 'antd';
import { Link } from 'react-router-dom';

const MyLearningPopover = () => {
    const notifications = [{ id: 1, content: 'Bạn chưa đăng ký khóa học nào' }];
    return (
    <div className='w-[300px]'>
      <div className='p-[5px]'>
        <Typography.Text className='text-xl font-bold'> Thông báo </Typography.Text>
        <Link to={"user/12"} className='ml-[60px] text-[#f05123]'> 
        Xem tất cả
        </Link>
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
export default MyLearningPopover;
