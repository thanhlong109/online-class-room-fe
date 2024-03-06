import { Button, Input, Modal, Pagination, Table, Tag, Tooltip, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Course } from '../../../../types/Course.type';
import { ColumnType } from 'antd/es/table';
import { useCourseAll } from '../../../../hooks/useCourseAll';
import { FormatType, secondsToTimeString } from '../../../../utils/TimeFormater';
import { formatNumberWithCommas } from '../../../../utils/NumberFormater';
import { Link } from 'react-router-dom';
import { PagingParam } from '../../../../types/TableParam';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

type GetAllCourseProps = {
    pagination: { current: number; total: number };
    displayData: number;
};

const columns = ({
    pagination,
    displayData,
    handleDelete,
}: GetAllCourseProps & { handleDelete: (id: number) => void }): ColumnType<Course>[] => [
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
        title: 'Tên khóa học',
        dataIndex: 'title',
        render: (title) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>{title}</span>
                </div>
            );
        },
        width: '10%',
    },
    {
        title: 'Hình ảnh khóa học',
        dataIndex: 'imageUrl',
        render: (imageUrl) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={imageUrl} alt="Khóa học" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
        ),
        width: '10%',
    },
    {
        title: 'Giá tiền khóa học',
        dataIndex: 'price',
        render: (price) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>{formatNumberWithCommas(price)} đ</span>
            </div>
        ),
        width: '10%',
    },
    {
        title: 'Thể loại',
        dataIndex: 'courseCategory',
        render: (courseCategory) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>{courseCategory}</span>
            </div>
        ),
        width: '12%',
    },
    {
        title: 'Thời lượng khóa học',
        dataIndex: 'totalDuration',
        render: (totalDuration) => {
            const formattedTime = secondsToTimeString(totalDuration, FormatType.HH_MM, ['h', 'm']);
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>{formattedTime}</span>
                </div>
            );
        },
        width: '10%',
    },

    {
        title: 'Cập nhật gần nhất',
        dataIndex: 'updateAt',
        render: (updateAt) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>{updateAt ? updateAt.split('T')[0] : ''}</span>{' '}
                </div>
            );
        },
        width: '10%',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'isPublic',
        render: (isPublic) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>
                        {isPublic ? (
                            <Tag color="green">Hoạt động</Tag>
                        ) : (
                            <Tag color="red">Không hoạt động</Tag>
                        )}
                    </span>
                </div>
            );
        },
        width: '4%',
    },
    {
        title: 'Hành động',
        dataIndex: 'courseId',
        width: '5%',
        render: (courseId) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to={`/admin/getAllCourse/details/${courseId}`}>
                        <Tooltip title="Xem chi tiết">
                            <Button type="link">
                                <EyeOutlined style={{ fontSize: '20px' }} />
                            </Button>
                        </Tooltip>
                    </Link>
                    <Tooltip title="Xóa khóa học" color="red">
                        <Button danger type="link" onClick={() => handleDelete(courseId)}>
                            <DeleteOutlined style={{ fontSize: '20px' }} />
                        </Button>
                    </Tooltip>
                </div>
            );
        },
    },
];
const GetAllCourse = () => {
    const [database, setDatabase] = useState<Course[]>([]);

    const displayData = 8;
    // const [searchValue, setSearchValue] = useState(0);
    const [minPrice, setMinPrice] = useState<number>(0); // Khởi tạo giá trị minPrice là 0

    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
    });
    const { Search } = Input;
    const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State để điều khiển hiển thị của modal xác nhận xóa
    // const [courseId, setCourseId] = useState('');
    // const location = useLocation();
    // const [course, setCourse] = useState<Course | null>(null);
    // useEffect(() => {
    //     const getCourseId = location.pathname.split('/').pop();
    //     if (getCourseId) {
    //         setCourseId(getCourseId);
    //     }
    // }, []);
    // const {data, isSuccess} = useDeleteCourseQuery(courseId);
    // useEffect(() => {
    //     if (data) setCourse(data);
    //     console.log(data);
    // }, [isSuccess]);

    const input: PagingParam = {
        // categoryId: 1,
        pageSize: displayData,
        pageNumber: pagination.current,
        minPrice: minPrice,
    };

    const { state, response } = useCourseAll(input);

    useEffect(() => {
        response && setDatabase(response.courses);
    }, [response]);

    useEffect(() => {
        if (state.currentCourse) {
            setDatabase(state.currentCourse.courses);
            setPagination({
                ...pagination,
                total: state.currentCourse.currentPage * 10,
            });
        }
    }, [state.currentCourse]);

    const handlePageChange = (page: number) => {
        setPagination({ ...pagination, current: page });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        // setSearchValue(value);
        if (value) {
            setMinPrice(value); // Cập nhật giá trị minPrice
        }
    };

    // const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {

    //     }
    // };
    const handleDelete = () => {
        // Xử lý xóa ở đây
        // setDeletingItemId(id); // Lưu id của item đang được chọn để xóa
        setDeleteModalVisible(true); // Hiển thị modal xác nhận xóa
    };

    const confirmDelete = () => {
        // Xác nhận xóa ở đây
        // Sau khi xóa xong, đóng modal và cập nhật lại dữ liệu
        setDeleteModalVisible(false);
        // Gọi hàm xóa hoặc cập nhật dữ liệu ở đây
        // fetchData(); // Nếu cần refetch dữ liệu sau khi xóa
        message.success('Bạn đã xóa thành công khóa học');
    };

    const cancelDelete = () => {
        // Hủy xóa, đóng modal
        setDeleteModalVisible(false);
    };

    const tableColumns: ColumnType<Course>[] = columns({ pagination, displayData, handleDelete });

    return (
        <div className="mx-auto w-[99%]  space-y-4">
            <>
                {' '}
                <div>
                    <div className="flex items-center justify-between">
                        <h1 className="mb-5 text-2xl font-bold text-gray-800">
                            Danh sách các khóa học:
                        </h1>
                        <Button type="primary" className="bg-blue-500">
                            <Link to={'/admin/addCourse/'}>Thêm khóa học mới</Link>
                        </Button>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <Search
                                placeholder="Nhập giá tiền tối thiểu để tìm kiếm"
                                className="w-[30%]"
                                size="large"
                                onChange={handleSearchChange}
                                // onKeyDown={handleSearchKeyPress}
                                // value={minPrice}
                            />
                        </div>
                    </div>
                </div>
                <Table
                    columns={tableColumns}
                    rowKey={(record) => record.courseId}
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
                    <p>Bạn có chắc chắn muốn xóa khóa học này không?</p>
                </Modal>
            </>
        </div>
    );
};

export default GetAllCourse;
