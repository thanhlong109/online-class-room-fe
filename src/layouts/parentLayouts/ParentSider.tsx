import { PieChartOutlined, MenuOutlined, DesktopOutlined } from '@ant-design/icons';
import { FileOpenOutlined } from '@mui/icons-material';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import StreetviewOutlinedIcon from '@mui/icons-material/StreetviewOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

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

export default function ParentSider() {
    const navigate = useNavigate();
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

    const getConditionalItems = (): MenuItem[] => {
        return [
            getItem('Tiến độ học tập', '1', <AnalyticsOutlinedIcon />),
            getItem('Quản lý khóa học', 'sub1', <AppsOutlinedIcon />, [
                getItem('Tất cả khóa học', '3', <PieChartOutlined />),
                getItem('Thêm khóa học mới', '4', <DesktopOutlined />),
            ]),
            getItem('Quản lý tài khoản', 'sub2', <ManageAccountsOutlinedIcon />, [
                getItem('Xem tất cả tài khoản', 'accountAll', <StreetviewOutlinedIcon />),
                getItem('Tạo tài khoản', 'createAccount', <PersonAddAlt1OutlinedIcon />),
            ]),
            getItem('Files', 'file', <FileOpenOutlined />),
        ];
    };
    const navUrl = new Map<string, string>();
    navUrl
        .set('1', '//')
        .set('3', '/admin/getAllCourse')
        .set('4', '/admin/addCourse/')
        .set('accountAll', '/admin/getAllAccount')
        .set('createAccount', '/admin/createAccount');

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
