import React, { useState } from 'react';
import { Table, Button, Space, Input, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

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
        title: 'Hành động',
        key: 'action',
        dataIndex: '',
        width: '5%',
        render: (record) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to={`/admin/getStudentList`}>
                        <Tooltip title="Xem chi tiết">
                            <Button type="link">
                                <EyeOutlined style={{ fontSize: '20px' }} />
                            </Button>
                        </Tooltip>
                    </Link>
                    <Tooltip title="Xóa khóa học" color="red">
                        <Button danger type="link" onClick={() => ''}>
                            <DeleteOutlined style={{ fontSize: '20px' }} />
                        </Button>
                    </Tooltip>
                </div>
            );
        },
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
    const { Search } = Input;
    const handleSort = (column, order) => {
        setSortBy(column.dataIndex);
        setSortOrder(order);
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        // setSearchValue(value);
        if (value) {
            //setMinPrice(value); // Cập nhật giá trị minPrice
        }
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
                <div className="flex items-center justify-between">
                    <h1 className="mb-5 text-2xl font-bold text-gray-800">
                        Danh sách các khóa học:
                    </h1>
                    <Button type="primary" className="bg-blue-500">
                        <Link to={''}>Thêm mới học sinh</Link>
                    </Button>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <Search
                            placeholder="Nhập tên của học sinh để tìm kiếm"
                            className="w-[30%]"
                            size="large"
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>
            <Table columns={columns} dataSource={sortedData} onChange={handleSort} />
        </div>
    );
};
export default GetStudentList;
