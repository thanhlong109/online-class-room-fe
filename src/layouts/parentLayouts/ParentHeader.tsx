import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Modal, Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, persistor } from '../../store';

export default function ParentHeader() {
    const accLoggedData = useSelector((state: RootState) => state.user);

    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <UserOutlined></UserOutlined>,
            label: <Link to={`/parent/profile`}>Thông tin cá nhân</Link>,
        },
        {
            key: '2',
            icon: <LogoutOutlined></LogoutOutlined>,
            label: (
                <div
                    onClick={() => {
                        localStorage.clear();
                        persistor.purge().then(() => {
                            window.location.href = '/login';
                        });
                    }}
                >
                    Đăng xuất
                </div>
            ),
        },
    ];

    return (
        <Header className="fixed z-50 flex w-full justify-between border-b border-gray-200 bg-white px-5">
            <div className="flex h-full items-center gap-3">
                <img
                    className="h-[38px] "
                    src="https://firebasestorage.googleapis.com/v0/b/estudyhub-a1699.appspot.com/o/logo%2Flogo-black.png?alt=media&token=892e67fd-fa5a-4a95-8705-de863eb9afe5"
                />
                <div className="h-[30px] w-[1px] bg-[#828282]"></div>

                <div className="text-base font-medium uppercase text-[#1976d2] ">
                    Theo dõi tiến trình học
                </div>
            </div>

            <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} arrow>
                <Avatar
                    className="fixed right-4 top-3 cursor-pointer"
                    size={'large'}
                    icon={<UserOutlined />}
                    src={accLoggedData.profileImg}
                />
            </Dropdown>
            <Modal footer={null} closable={false}>
                <div className="flex flex-col items-center justify-center">
                    <Spin size="large"></Spin>
                    <span>Đang đăng xuất...</span>
                </div>
            </Modal>
        </Header>
    );
}
