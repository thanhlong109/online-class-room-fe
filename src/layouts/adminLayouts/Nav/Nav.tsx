import { DesktopOutlined } from '@ant-design/icons';
import {
    FileOpenOutlined,
    Person2Outlined,
    Person3Outlined,
    PieChartOutlined,
} from '@mui/icons-material';
import { Menu, MenuProps } from 'antd';
import Sider, { SiderProps } from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

const items: MenuItem[] = [
    getItem('Dashboard', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Quản lý khóa học', 'sub1', <Person2Outlined />, [
        getItem('Danh sách khóa học', '3'),
        getItem('Thêm khóa học mới', '4'),
        getItem('Danh sách loại khóa học', '5'),
    ]),
    getItem('Quản lý tài khoản', 'sub2', <Person3Outlined />, [
        getItem('Học sinh', '6'),
        getItem('Gia đình', '8'),
    ]),
    getItem('Files', '9', <FileOpenOutlined />),
];

const navUrl = new Map<string, string>();
navUrl.set('1', '/admin/').set('4', '/admin/addCourse');

const siderProps: SiderProps = {
    width: 250,
};

const Nav = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            {...siderProps}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div className="flex items-center justify-center p-3">
                <img
                    className="h-[30px]"
                    src={
                        'https://firebasestorage.googleapis.com/v0/b/estudyhub-a1699.appspot.com/o/logo%2Fe-white.png?alt=media&token=ea115ee4-76cc-4abc-8341-ee6d477082ce'
                    }
                    alt=""
                />
                <motion.div
                    animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 120 }}
                    transition={{ duration: 0.3, type: 'keyframes' }}
                >
                    <img
                        className="max-h-[20px]"
                        src={
                            'https://firebasestorage.googleapis.com/v0/b/estudyhub-a1699.appspot.com/o/logo%2Flogo-white-tail.png?alt=media&token=2d72ef6c-e6fd-4a44-a43e-c73decb79198'
                        }
                        alt=""
                    />
                </motion.div>
            </div>

            <Menu
                onSelect={(e) => {
                    const link = navUrl.get(e.key);
                    if (link) {
                        navigate(link);
                    }
                }}
                className="mt-6"
                theme={'dark'}
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}
            />
        </Sider>
    );
};

export default Nav;
