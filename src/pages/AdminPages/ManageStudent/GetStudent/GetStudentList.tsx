import React, { useState } from 'react';
import { Table, Button, Space, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const columns = [
    {
        title: 'Họ và Tên',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'dob',
        key: 'dob',
        render: (dob) => moment(dob).format('DD/MM/YYYY'),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button type="default" size="middle">
                    Xem chi tiết
                </Button>
                <Button type="default" size="middle">
                    Chỉnh sửa
                </Button>
                <Button type="default" size="middle">
                    Xóa
                </Button>
            </Space>
        ),
    },
];

const data = [
    {
        name: 'A',
        phoneNumber: '0123456789',
        gender: 'Nam',
        dob: '2000-01-01',
        email: 'a@gmail.com',
    },
    {
        name: 'B',
        phoneNumber: '0987654321',
        gender: 'Nữ',
        dob: '2001-02-02',
        email: 'b@gmail.com',
    },
    {
        name: 'C',
        phoneNumber: '0123456789',
        gender: 'Nam',
        dob: '2002-03-03',
        email: 'c@gmail.com',
    },
    {
        name: 'D',
        phoneNumber: '0987654321',
        gender: 'Nữ',
        dob: '2003-04-04',
        email: 'd@gmail.com',
    },
    {
        name: 'E',
        phoneNumber: '0123456789',
        gender: 'Nam',
        dob: '2004-05-05',
        email: 'e@gmail.com',
    },
];

const GetStudentList = () => {
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('ascend');

    const handleSort = (column, order) => {
        setSortBy(column.dataIndex);
        setSortOrder(order);
    };

    const sortedData = data.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else {
            return 0;
        }
    });

    if (sortOrder === 'descend') {
        sortedData.reverse();
    }

    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const [showSearch, setShowSearch] = useState(false);

    const handleMouseEnter = () => {
        setShowSearch(true);
    };

    const handleMouseLeave = () => {
        setShowSearch(false);
    };
    return (
        <div>
            <div className="mb-4" onMouseLeave={handleMouseLeave}>
                {showSearch ? (
                    <Input
                        placeholder="Tìm kiếm học sinh..."
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="max-w-[500px]"
                    />
                ) : (
                    <Button
                        type="default"
                        icon={<SearchOutlined />}                                               
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                )}
            </div>
            <Table columns={columns} dataSource={sortedData} onChange={handleSort} />
        </div>
    );
};

export default GetStudentList;
