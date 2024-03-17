import { Divider, Drawer, Table, TableProps, Tag, Typography } from 'antd';
import { GetOrderWithFilterRespone, OrderStatus } from '../../../../types/Order.type';
import { useGetOrderWithFilterQuery } from '../../../../services/order.services';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useEffect, useState } from 'react';
import { setOrdersHistory } from '../../../../slices/orderSlice';
import moment from 'moment/min/moment-with-locales';
import { useGetCourseIDQuery } from '../../../../services';
import { Course } from '../../../../types/Course.type';
import { Link } from 'react-router-dom';

const columns: TableProps<GetOrderWithFilterRespone>['columns'] = [
    {
        title: 'Mã hóa đơn',
        dataIndex: 'transactionNo',
        key: 'transactionNo',
        render: (text) => <a className="text-[#1677ff]">#{text}</a>,
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (text) => <strong className="text-red-500">{text}</strong>,
    },
    {
        title: 'Đơn vị tiền',
        dataIndex: 'currencyCode',
        key: 'currencyCode',
    },
    {
        title: 'Ngày thanh toán',
        dataIndex: 'paymentDate',
        key: 'paymentDate',
        render: (text) => <>{moment(text).locale('vi').format('L')}</>,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
            <Tag
                color={
                    status === OrderStatus.COMPLETED
                        ? 'green'
                        : status === OrderStatus.PENDING
                          ? 'gold-inverse'
                          : 'volcano'
                }
            >
                {status === OrderStatus.COMPLETED
                    ? 'Thành công'
                    : status === OrderStatus.PENDING
                      ? 'Đang chờ'
                      : 'Thất bại'}
            </Tag>
        ),
    },
];

const PaymentHistory = () => {
    const accountId = useSelector((state: RootState) => state.user.id);
    const orderList = useSelector((state: RootState) => state.order.orderHistory);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GetOrderWithFilterRespone>();
    const [selectedCourse, setSelectedCourse] = useState<Course>();
    const { isLoading, isSuccess, data } = useGetOrderWithFilterQuery({
        AccountId: accountId ? accountId : '',
    });
    const {
        isLoading: isCourseLoading,
        isSuccess: isCourseLoaded,
        data: CourseData,
    } = useGetCourseIDQuery(selectedItem ? `${selectedItem.courseId}` : '-1');

    useEffect(() => {
        if (isCourseLoaded && CourseData) {
            setSelectedCourse(CourseData);
        }
    }, [isCourseLoaded, CourseData]);

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(setOrdersHistory(data));
        }
    }, [isSuccess, data]);

    const showDrawer = (index: number | undefined) => {
        if (index != undefined && index <= orderList.length) {
            setSelectedItem(orderList[index]);
            setOpen(true);
        }
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {' '}
            <Typography.Title className="text-center" level={3}>
                Lịch sử thanh toán
            </Typography.Title>
            <Divider />
            <Table
                onRow={(_, rowIndex) => {
                    return {
                        onClick: () => {
                            showDrawer(rowIndex);
                        },
                    };
                }}
                loading={isLoading}
                columns={columns}
                dataSource={orderList}
            ></Table>
            <Drawer
                title={
                    <p>
                        Chi tiết hóa đơn{' '}
                        <span className="font-normal italic text-[#1677ff]">
                            #{selectedItem?.transactionNo}
                        </span>
                    </p>
                }
                placement={'right'}
                closable={false}
                onClose={onClose}
                open={open}
            >
                <div className="flex flex-col gap-2">
                    <Typography.Text>
                        <strong>Tài khoản thanh toán: </strong>{' '}
                        <span className="italic">{selectedItem?.accountName}</span>
                    </Typography.Text>
                    <Typography.Text>
                        <strong>Tên khóa học: </strong>{' '}
                        <Link to={'/courses/' + selectedItem?.courseId}>
                            <span className="italic">{selectedCourse?.title}</span>
                        </Link>
                    </Typography.Text>
                    <Typography.Text>
                        <strong>Phương thức: </strong>{' '}
                        <span className="italic">{selectedItem?.paymentMethod}</span>
                    </Typography.Text>
                    <Typography.Text>
                        <strong>Tổng tiền: </strong>{' '}
                        <span className="italic">
                            <strong className="text-red-500">
                                {selectedItem?.totalPrice + ' ' + selectedItem?.currencyCode}
                            </strong>
                        </span>
                    </Typography.Text>

                    <Typography.Text>
                        <strong>Trạng thái: </strong>{' '}
                        <span className="italic">
                            <Tag
                                color={
                                    selectedItem?.status === OrderStatus.COMPLETED
                                        ? 'green'
                                        : selectedItem?.status === OrderStatus.PENDING
                                          ? 'gold-inverse'
                                          : 'volcano'
                                }
                            >
                                {selectedItem?.status === OrderStatus.COMPLETED
                                    ? 'Thành công'
                                    : selectedItem?.status === OrderStatus.PENDING
                                      ? 'Đang chờ'
                                      : 'Thất bại'}
                            </Tag>
                        </span>
                    </Typography.Text>
                    <Typography.Text>
                        <strong>Ngày thanh toán: </strong>{' '}
                        <span className="italic">
                            {moment(selectedItem?.paymentDate).locale('vi').format('L')}
                        </span>
                    </Typography.Text>
                </div>
            </Drawer>
        </div>
    );
};

export default PaymentHistory;
