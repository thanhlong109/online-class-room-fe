import Lottie from 'lottie-react';
import successAnimation from '../../../assets/successAnimation.json';
import failedAnimation from '../../../assets/FailedAnimation.json';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export enum PaymentResultType {
    SUCCESS = 'success',
    FAILED = 'failed',
}

const PaymentResult = () => {
    const location = useLocation();
    const result = location.pathname.split('/').pop();
    const navigate = useNavigate();
    const orderData = useSelector((state: RootState) => state.order);

    return (
        <div>
            <div className="m-auto flex w-fit flex-col justify-center p-4">
                {result === PaymentResultType.SUCCESS && (
                    <Paper
                        elevation={2}
                        className="flex min-w-[500px] flex-col justify-center gap-4 px-8 py-8"
                    >
                        {' '}
                        <h2 className="text-center text-2xl font-medium text-green-500">
                            Thanh toán thành công!
                        </h2>
                        <Lottie
                            className="w-[200px] self-center"
                            animationData={successAnimation}
                            loop={false}
                        />
                        <div className="flex flex-col gap-2 px-4">
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">
                                    Phương thức thanh toán:
                                </p>
                                <p className="text-sm font-medium italic text-[#373737] ">Paypal</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">Mã khóa đơn:</p>
                                <p className="text-sm font-medium italic text-[#373737] ">
                                    {orderData.createOrderId}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">
                                    Tài khoản thanh toán:
                                </p>
                                <p className="text-sm font-medium italic text-[#373737] ">
                                    {orderData.preOrderData.addOrderRespone.accountName}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">Khóa học:</p>
                                <p className="text-sm font-medium italic text-[#373737] ">
                                    {orderData.preOrderData.CourseData.title}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">Tiền gốc:</p>
                                <p className="text-sm font-medium italic text-[#373737] ">
                                    {orderData.preOrderData.CourseData.price} VND
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">khuyến mãi:</p>
                                <p className="text-sm font-medium italic text-[#373737] ">
                                    {Math.round(
                                        orderData.preOrderData.CourseData.salesCampaign * 100,
                                    )}{' '}
                                    %
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">
                                    Tổng số tiền thanh toán:
                                </p>
                                <p className="text-sm font-medium italic text-[#373737]">
                                    {orderData.preOrderData.CourseData.price -
                                        orderData.preOrderData.CourseData.price *
                                            orderData.preOrderData.CourseData.salesCampaign}{' '}
                                    VND
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            className="!mt-16"
                            onClick={() => navigate('/')}
                        >
                            Quay về trang chủ
                        </Button>
                    </Paper>
                )}
                {result === PaymentResultType.FAILED && (
                    <Paper
                        elevation={2}
                        className="flex min-w-[500px] flex-col justify-center gap-4 px-8 py-8"
                    >
                        {' '}
                        <h2 className="text-center text-2xl font-medium text-red-500">
                            Thanh toán không thành công!
                        </h2>
                        <Lottie
                            className="w-[200px] self-center"
                            animationData={failedAnimation}
                            loop={false}
                        />
                        <div className="flex flex-col gap-2 px-4">
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">
                                    Phương thức thanh toán:
                                </p>
                                <p className="text-sm font-medium italic text-[#373737] ">Paypal</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">Mã khóa đơn:</p>
                                <p className="text-sm font-medium italic text-[#373737] ">
                                    {orderData.createOrderId}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">
                                    Tài khoản thanh toán:
                                </p>
                                <p className="text-sm font-medium italic text-[#373737] ">
                                    {orderData.preOrderData.addOrderRespone.accountName}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">Khóa học:</p>
                                <p className="text-sm font-medium italic text-[#373737] ">
                                    {orderData.preOrderData.CourseData.title}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">Tiền gốc:</p>
                                <p className="text-sm font-medium italic text-[#373737] ">
                                    {orderData.preOrderData.CourseData.price} VND
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">khuyến mãi:</p>
                                <p className="text-sm font-medium italic text-[#373737] ">
                                    {Math.round(
                                        orderData.preOrderData.CourseData.salesCampaign * 100,
                                    )}{' '}
                                    %
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-medium text-[#034892]">
                                    Tổng số tiền thanh toán:
                                </p>
                                <p className="text-sm font-medium italic text-[#373737]">
                                    {orderData.preOrderData.CourseData.price -
                                        orderData.preOrderData.CourseData.price *
                                            orderData.preOrderData.CourseData.salesCampaign}{' '}
                                    VND
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            className="!mt-16"
                            onClick={() => navigate('/')}
                        >
                            Quay về trang chủ
                        </Button>
                    </Paper>
                )}
            </div>
        </div>
    );
};

export default PaymentResult;
