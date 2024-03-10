import { Account } from '../../../../types/Account.type';
import Table, { ColumnType } from 'antd/es/table';
import { Button, Input, Pagination, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { PagingParam } from '../../../../types/TableParam';
import { useAccountAll } from '../../../../hooks/useAccountAll';
import { useEffect, useState } from 'react';

type GetAllAccountProps = {
    pagination: { current: number; total: number };
    displayData: number;
};

const columns = ({
    pagination,
    displayData,
    handleDelete,
}: GetAllAccountProps & { handleDelete: (id: number) => void }): ColumnType<Account>[] => [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        render: (_, __, index) => {
            const currentPage = pagination.current;
            const pageSize = displayData;
            const calculatedIndex = (currentPage - 1) * pageSize + index + 1;
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>{calculatedIndex}</span>
                </div>
            );
        },
        width: '3%',
    },
    {
        title: 'Tên tài khoản',
        dataIndex: ['firstName', 'lastName'],
        render: (_, record) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{`${record.firstName} ${record.lastName}`}</span>
                </div>
            );
        },
        width: '10%',
    },
    {
        title: 'Hình đại diện',
        dataIndex: 'profileImg',
        render: (profileImg) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={profileImg} alt="Khóa học" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
        ),
        width: '10%',
    },
    {
        title: 'Email học sinh',
        dataIndex: 'email',
        render: (email) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>{email}</span>
            </div>
        ),
        width: '7%',
    },
    {
        title: 'Email phụ huynh',
        dataIndex: 'parentEmail',
        render: (parentEmail) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>{parentEmail}</span>
            </div>
        ),
        width: '7%',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        render: (phoneNumber) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>{phoneNumber}</span>
            </div>
        ),
        width: '12%',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        render: (role) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>{role}</span>
                </div>
            );
        },
        width: '10%',
    },

    {
        title: 'Giới tính',
        dataIndex: 'sex',
        render: (sex) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>{sex ? <Tag color="green">Nam</Tag> : <Tag color="blue">Nữ</Tag>}</span>
                </div>
            );
        },
        width: '4%',
    },
    {
        title: 'Hành động',
        dataIndex: 'courseId',
        width: '5%',
        render: (id) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Tooltip title="Xóa tài khoản" color="red">
                        <Button danger type="link" onClick={() => handleDelete(id)}>
                            <DeleteOutlined style={{ fontSize: '20px' }} />
                        </Button>
                    </Tooltip>
                </div>
            );
        },
    },
];

const GetAllAccount = () => {
    const [database, setDatabase] = useState<Account[]>([]);
    const displayData = 8;
    const [searchValue, setSearchValue] = useState('');
    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
    });
    const { Search } = Input;

    const input: PagingParam = {
        pageSize: displayData,
        pageNumber: pagination.current,
        search: searchValue,
    };
    const { state, response } = useAccountAll(input);

    useEffect(() => {
        if (response) {
            setDatabase(response.accounts);
            setPagination({
                ...pagination,
                total: response.totalAccounts,
            });
        }
    }, [response]);

    const handlePageChange = (page: number) => {
        setPagination({ ...pagination, current: page });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (response) {
                setDatabase(response.accounts);
                setPagination({
                    ...pagination,
                    total: response.totalAccounts,
                });
            }
        }
    };

    const handleDelete = () => {
        // Xử lý xóa ở đây
        // setDeletingItemId(id); // Lưu id của item đang được chọn để xóa
        // setDeleteModalVisible(true); // Hiển thị modal xác nhận xóa
    };

    const tableColumns: ColumnType<Account>[] = columns({ pagination, displayData, handleDelete });

    return (
        <div className="mx-auto w-[99%]  space-y-4">
            <>
                {' '}
                <div>
                    <div className="flex items-center justify-between">
                        <h1 className="mb-5 text-2xl font-bold text-gray-800">
                            Danh sách các tài khoản:
                        </h1>
                        <Button type="primary" className="bg-blue-500">
                            <Link to={'/admin/addCourse/'}>Thêm tài khoản mới cho STAFF</Link>
                        </Button>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <Search
                                placeholder="Nhập tên để tìm kiếm"
                                className="w-[30%]"
                                size="large"
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchKeyPress}
                                value={searchValue}
                            />
                        </div>
                    </div>
                </div>
                <Table
                    columns={tableColumns}
                    rowKey={(record) => record.id}
                    dataSource={database}
                    pagination={false}
                />
                <Pagination
                    className="flex justify-end"
                    disabled={state.isFetching}
                    current={pagination.current}
                    total={pagination.total}
                    onChange={handlePageChange}
                />
            </>
        </div>
    );
};

export default GetAllAccount;
