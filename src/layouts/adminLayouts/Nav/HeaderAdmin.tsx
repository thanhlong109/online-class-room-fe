import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Modal, Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';

export default function MyHeader() {
    // const select = useLocation();
    //   const navigate = useNavigate();
    //   const [loading, setLoading] = useState(false);

    // const handleNavigation = (index: number) => {
    //   const url = `/${selected.slice(1, index + 1).join("/")}`;

    //   console.log(url);
    //   navigate(url);
    // };

    //   const logOut = async () => {
    //     setLoading(true);
    //     try {
    //       const response = await apiJWT.post(`/auth/logout`);
    //       if (response) {
    //         localStorage.clear();
    //         setLoading(false);
    //         navigate('/login');
    //       }
    //     } catch (error) {
    //       notification.error({
    //         message: 'Lỗi',
    //         description: 'Có lỗi xảy ra',
    //         placement: 'bottomLeft',
    //       });
    //     }
    //   };

    // const selected = select.pathname.split("/");
    // const capitalizedItems = selected.map((item) => {
    //   if (item.length > 0) {
    //     return item.charAt(0).toUpperCase() + item.slice(1);
    //   }
    //   return item;
    // });
    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <UserOutlined></UserOutlined>,
            label: <Link to={`/account`}>Thông tin cá nhân</Link>,
        },
        {
            key: '2',
            icon: <LogoutOutlined></LogoutOutlined>,
            label: <div>Đăng xuất</div>,
        },
    ];

    //   function itemRender(route: ItemType, _: any, items: ItemType[], paths: string[]) {
    //     const last = items.indexOf(route) === items.length - 1;
    //     return last ? <p>{route.title}</p> : <Link to={paths.join('/')}>{route.title}</Link>;
    //   }
    //   const { state } = useAuth();
    return (
        <Header className="fixed z-50 flex w-full justify-between border-b border-gray-200 bg-white px-5">
            {/* <Breadcrumb className='my-4' items={headerTitle} itemRender={itemRender}></Breadcrumb> */}
            <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} arrow>
                <Avatar
                    className="fixed right-4 top-3 cursor-pointer"
                    size={'large'}
                    icon={<UserOutlined />}
                    src={
                        // state.currentUser.avatar ||
                        'https://i.pinimg.com/736x/32/6f/7c/326f7cd6429cf76c88bd4d61c20ac716.jpg'
                    }
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
// function useAppSelector(arg0: (state: any) => any): { headerTitle: any; } {
//   throw new Error('Function not implemented.');
// }
