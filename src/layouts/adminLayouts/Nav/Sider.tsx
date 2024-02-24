import { PieChartOutlined, MenuOutlined, DesktopOutlined } from '@ant-design/icons';
import { FileOpenOutlined, Person2Outlined, Person3Outlined } from '@mui/icons-material';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../utils/cn';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

export default function MySider() {
    // const select = useLocation();
    const navigate = useNavigate();
    // const selected = select.pathname.split('/')[1];
    const [collapsed, setCollapsed] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth < 1280);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // const handleCollasped = (pre: boolean) => {
    //   setCollapsed(!pre);
    // };

    const getConditionalItems = (): MenuItem[] => {
        return [
            getItem('Dashboard', '1', <PieChartOutlined />),
            getItem('Option 2', 'option-2', <DesktopOutlined />),
            getItem('Quản lý khóa học', 'sub1', <Person2Outlined />, [
                getItem('Tất cả khóa học', '3', <PieChartOutlined />),
                getItem('Thêm khóa học mới', '4', <DesktopOutlined />),
                getItem('Xóa khóa học', '5', <Person2Outlined />),
            ]),
            getItem('Quản lý tài khoản', 'sub2', <Person3Outlined />, [
                getItem('Học sinh', 'student', <Person2Outlined />),
                getItem('Gia đình', 'family', <Person3Outlined />),
            ]),
            getItem('Files', 'file', <FileOpenOutlined />),
        ];
    };
    const navUrl = new Map<string, string>();
    navUrl
        .set('1', '/admin/')
        .set('3', '/admin/getAllCourse')
        .set('4', '/admin/addCourse/')
        .set('5', '/admin/deleteCourse');

    // useEffect(() => {
    //   const fetchData = async () => {
    //     const response = await agent.Role.checkRole();
    //     dispatch(roleCheckSuccess(response));
    //   };
    //   fetchData();
    // }, []);

    return (
        <>
            <Sider
                theme="light"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                className="overflow-hidden border-r-[1px]"
                trigger={
                    <div className="w-full border-r-[1px] border-t-[1px]">
                        <MenuOutlined></MenuOutlined>
                    </div>
                }
                width={256}
            >
                <div className="demo-logo-vertical border-r-[1px] border-gray-200">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/estudyhub-a1699.appspot.com/o/logo%2Flogo-black-tail.png?alt=media&token=e65f65a8-94a6-4504-a370-730b122ba42e"
                        alt="logo"
                        className={cn('mx-auto max-w-[199px]  py-2', {
                            hidden: collapsed,
                        })}
                    />
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/estudyhub-a1699.appspot.com/o/logo%2Fe-black.png?alt=media&token=a0a401b9-6d20-4597-833c-962457c543ac"
                        alt="logo"
                        className={cn('mx-auto max-w-[20px]  py-2', {
                            hidden: !collapsed,
                        })}
                    />
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={getConditionalItems()}
                    // onSelect={(e) => {
                    //     const link = navUrl.get(e.key);
                    //     if (link) {
                    //         navigate(link);
                    //     }
                    // }}
                    onSelect={(e) => {
                        const link = navUrl.get(e.key);
                        if (link) {
                            navigate(link);
                        }
                    }}
                ></Menu>
            </Sider>
        </>
    );
}
