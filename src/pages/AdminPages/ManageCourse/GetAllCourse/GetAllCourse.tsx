import { Input, Pagination, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Course } from '../../../../types/Course.type';
import { ColumnType } from 'antd/es/table';
// import { PagingParam } from '../../../../types/TableParam';
import { useCourseAll } from '../../../../hooks/useCourseAll';

type GetAllCourseProps = {
    pagination: { current: number; total: number };
    displayData: number;
};

const columns = ({ pagination, displayData }: GetAllCourseProps): ColumnType<Course>[] => [
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
                <span>{price}</span>
            </div>
        ),
        width: '8%',
    },
    {
        title: 'Kiến thức đạt được',
        dataIndex: 'knowdledgeDescription',
        render: (knowdledgeDescription) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>{knowdledgeDescription}</span>
            </div>
        ),
        width: '12%',
    },
    {
        title: 'Thời lượng khóa học',
        dataIndex: 'totalDuration',
        render: (totalDuration) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>{totalDuration}</span>
            </div>
        ),
        width: '8%',
    },
    {
        title: 'Ngày tạo khóa học',
        dataIndex: 'createAt',
        render: (createAt) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>{createAt.split('T')[0]}</span>
            </div>
        ),
        width: '10%',
    },
    {
        title: 'Cập nhật gần nhất',
        dataIndex: 'updateAt',
        render: (updateAt) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>{updateAt.split('T')[0]}</span>
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
        width: '6%',
    },
];
const GetAllCourse = () => {
    const [data, setData] = useState<Course[]>([]);

    const displayData = 8;
    const [searchValue, setSearchValue] = useState('');
    const { state, response } = useCourseAll();

    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
    });
    const { Search } = Input;
    const tableColumns: ColumnType<Course>[] = columns({ pagination, displayData });
    const fetchData = () => {
        // const input: PagingParam = {
        //     id: id || "",
        //     limit: displayData,
        //     page: pagination.current,
        // };

        // Fetch data using the response from the useCourseAll hook
        if (response) {
            setData(response); // Update data state with the response data
            setPagination({
                ...pagination,
                total: response.length, // Update total count based on response length
            });
        }
    };
    useEffect(() => {
        fetchData();
    }, [pagination.current]);

    useEffect(() => {
        if (state.currentCourse) {
            setData(state.currentCourse);
            setPagination({
                ...pagination,
                total: state.currentCourse.length,
            });
        }
    }, [state.currentCourse]);

    const handlePageChange = (page: number) => {
        setPagination({ ...pagination, current: page });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchData();
        }
    };

    return (
        <div className="mx-auto w-[99%]  space-y-4">
            <>
                {' '}
                <div>
                    <div className="flex">
                        <h1 className="mb-5 text-2xl font-bold text-gray-800">
                            Danh sách các khóa học:
                        </h1>
                        <h2 className="mb-5 ml-2 text-2xl text-gray-800"></h2>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <Search
                                placeholder="Nhập tên"
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
                    rowKey={(record) => record.courseId}
                    dataSource={data}
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

export default GetAllCourse;
