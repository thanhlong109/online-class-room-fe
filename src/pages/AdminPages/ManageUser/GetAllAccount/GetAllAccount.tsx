import { Account } from '../../../../types/Account.type';
import Table, { ColumnType } from 'antd/es/table';
import { Button, Input, Modal, Pagination, Tag, Tooltip, message } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { PagingParam } from '../../../../types/TableParam';
import { useAccountAll } from '../../../../hooks/useAccountAll';
import { useEffect, useState } from 'react';
import { useDeleteAccountMutation } from '../../../../services/account.services';

type GetAllAccountProps = {
    pagination: { current: number; total: number };
    displayData: number;
};

const columns = ({
    pagination,
    displayData,
    handleDelete,
}: GetAllAccountProps & { handleDelete: (id: string) => void }): ColumnType<Account>[] => [
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
        width: '8%',
    },
    {
        title: 'Hình đại diện',
        dataIndex: 'profileImg',
        render: (profileImg) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={profileImg}
                    alt="Khóa học"
                    style={{ width: 50, height: 50, borderRadius: '50%', overflow: 'hidden' }}
                />
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
        width: '8%',
    },
    {
        title: 'Email phụ huynh',
        dataIndex: 'parentEmail',
        render: (parentEmail) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>{parentEmail}</span>
            </div>
        ),
        width: '8%',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        render: (phoneNumber) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>{phoneNumber}</span>
            </div>
        ),
        width: '8%',
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
        width: '4%',
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
        title: 'Trạng thái',
        dataIndex: 'status',
        render: (status) => {
            const trimmedStatus = status.trim();
            const statusText = trimmedStatus === 'Active' ? 'Hoạt động' : 'Không hoạt động';
            const statusColor = trimmedStatus === 'Active' ? 'green' : 'red';
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>
                        <Tag color={statusColor}>{statusText}</Tag>
                    </span>
                </div>
            );
        },
        width: '4%',
    },
    {
        title: 'Hành động',
        dataIndex: 'id',
        width: '3%',
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
    const displayData = 10;
    const [searchValue, setSearchValue] = useState('');
    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
    });
    const { Search } = Input;
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State để điều khiển hiển thị của modal xác nhận xóa
    const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
    const [deleteAccount] = useDeleteAccountMutation();

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

    const handleDelete = (accountId: string) => {
        // Xử lý xóa ở đây
        setDeletingItemId(accountId); // Lưu id của item đang được chọn để xóa
        setDeleteModalVisible(true); // Hiển thị modal xác nhận xóa
    };

    const confirmDelete = async () => {
        // Xác nhận xóa ở đây
        if (!deletingItemId) return;
        // Sau khi xóa xong, đóng modal và cập nhật lại dữ liệu
        setDeleteModalVisible(false);
        // Gọi hàm xóa hoặc cập nhật dữ liệu ở đây
        try {
            await deleteAccount(deletingItemId);
            const updatedAccounts = database.map((account) =>
                account.id === deletingItemId ? { ...account, status: 'false' } : account,
            );
            setDatabase(updatedAccounts);
            message.success('Bạn đã xóa thành công tài khoản này');
        } catch (error) {
            message.error('Xóa tài khoản thất bại');
        }
        // fetchData(); // Nếu cần refetch dữ liệu sau khi xóa
    };

    const cancelDelete = () => {
        // Hủy xóa, đóng modal
        setDeleteModalVisible(false);
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
                            <Link to={'/admin/createAccount/'}>Thêm tài khoản mới cho STAFF</Link>
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
                <Modal
                    title="Xác nhận xóa"
                    open={deleteModalVisible}
                    onOk={confirmDelete}
                    onCancel={cancelDelete}
                    okButtonProps={{ className: 'bg-blue-500 text-white' }}
                    cancelButtonProps={{ className: 'bg-red-500 text-white' }}
                    okText="Xác nhận"
                    cancelText="Hủy"
                >
                    <p>Bạn có chắc chắn muốn xóa tài khoản này không?</p>
                </Modal>
            </>
        </div>
    );
};

export default GetAllAccount;
