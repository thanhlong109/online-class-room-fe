import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import {
    FUNDING,
    PayPalButtons,
    PayPalButtonsComponentProps,
    PayPalScriptProvider,
    usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useGetClientIdQuery } from '../../../services/order.services';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCreateOrderId, setOrderId } from '../../../slices/orderSlice';
import { Divider, Typography } from 'antd';
import { FormatType, secondsToTimeString } from '../../../utils/TimeFormater';
import { Button } from '@mui/material';
import { formatNumberWithCommas } from '../../../utils/NumberFormater';

const PaymentPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const style: PayPalButtonsComponentProps['style'] = { layout: 'vertical' };
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const { CourseData, addOrderRespone } = useSelector(
        (state: RootState) => state.order.preOrderData,
    );
    const { data: clientIdData, isSuccess: isGetClientIdSuccess, error } = useGetClientIdQuery();
    const [clientId, setClientId] = useState<string | null>(null);
    useEffect(() => {
        if (isGetClientIdSuccess) {
            setClientId(clientIdData);
        }
    }, [isGetClientIdSuccess, error]);
    const ButtonWrapper: React.FC<{ showSpinner: boolean }> = ({ showSpinner }) => {
        const [{ isPending }] = usePayPalScriptReducer();

        return (
            <>
                {showSpinner && isPending && <div className="spinner" />}
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[style]}
                    fundingSource={FUNDING.PAYPAL}
                    createOrder={async () => {
                        return fetch(
                            `https://estudyhub.azurewebsites.net/api/Order/CreateOrderWithPaypal?accountId=${addOrderRespone.accountId}&courseId=${addOrderRespone.courseId}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            },
                        )
                            .then((respone) => {
                                if (!respone.ok) {
                                    return respone.json().then((err) => {
                                        throw err;
                                    });
                                }
                                return respone.json();
                            })
                            .then((order) => {
                                dispatch(setCreateOrderId(order.dataObject.id));
                                return order.dataObject.id;
                            })
                            .catch((err) => {
                                alert(err.message);
                            });
                    }}
                    onApprove={(data) => {
                        return fetch(
                            `https://estudyhub.azurewebsites.net/api/Order/CreateCapturetWithPayPal?transactionId=${data.orderID}`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            },
                        )
                            .then((respone) => {
                                if (!respone.ok) {
                                    return respone.json().then(() => {
                                        navigate('/payment/failed');
                                    });
                                }
                                respone.json();
                            })
                            .then(() => {
                                dispatch(setOrderId(data.orderID));
                                navigate('/payment/success');
                            })
                            .catch(() => {
                                navigate('/payment/failed');
                            });
                    }}
                />
            </>
        );
    };

    return (
        <div>
            <Button
                className="!mb-2 !ml-20"
                onClick={() => navigate('/courses/' + CourseData.courseId)}
                startIcon={<KeyboardArrowLeftOutlinedIcon />}
            >
                Quay lại
            </Button>
            <div className='className="min-w-screen flex  grow justify-center pb-10'>
                <div className="w-[50%]  bg-[#f8fafb] px-10 py-10">
                    <div className="flex flex-col gap-8">
                        <div>
                            <p className="text-2xl font-bold text-[#007fff]">
                                Khóa học {CourseData.title}
                            </p>
                        </div>
                        <div className="flex gap-8">
                            <div className="max-w-[350px]">
                                <img src={CourseData.imageUrl} alt="" />
                            </div>
                            <div>
                                <div>
                                    <Typography.Title className="!text-[#007fff]" level={5}>
                                        Khóa học này bao gồm:
                                    </Typography.Title>

                                    <div className="mt-3 flex flex-col gap-2">
                                        <div className="flex items-center text-sm">
                                            <OndemandVideoIcon
                                                className="mr-4"
                                                style={{ fontSize: 'inherit' }}
                                            />
                                            <p>
                                                {secondsToTimeString(
                                                    CourseData.totalDuration,
                                                    FormatType.HH_MM,
                                                    [' giờ', ' phút'],
                                                )}{' '}
                                                thời gian học
                                            </p>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <PhoneAndroidIcon
                                                className="mr-4"
                                                style={{ fontSize: 'inherit' }}
                                            />
                                            <p>Có thể truy cập bằng điện thoại</p>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <AllInclusiveIcon
                                                className="mr-4"
                                                style={{ fontSize: 'inherit' }}
                                            />
                                            <p>Truy cập trọn đời</p>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <EmojiEventsOutlinedIcon
                                                className="mr-4"
                                                style={{ fontSize: 'inherit' }}
                                            />
                                            <p>Cấp chứng chỉ khi hoàn thành khóa học</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Divider
                                orientation="center"
                                className="!text-[#007fff]"
                                type="horizontal"
                            >
                                Khóa học này sẽ giúp bạn cải thiện
                            </Divider>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                {CourseData.knowdledgeDescription
                                    .split('|')
                                    .filter((value) => value.trim().length > 0)
                                    .map((text, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 text-base"
                                        >
                                            <span className="h-fit">
                                                <CheckOutlinedIcon
                                                    style={{ fontSize: 'inherit' }}
                                                />
                                            </span>
                                            <span className="text-[14px]">{text}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-[30%] flex-col bg-gradient-to-b from-gray-100 via-gray-100 to-white p-5">
                    <div className="flex items-center justify-center pb-12 pt-5">
                        <h3 className="text-xl font-bold text-[#007fff] lg:text-2xl">
                            Thanh toán chi tiết
                        </h3>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="text-base font-medium text-[#007fff]">Giá gốc:</div>
                                <div className="text-base ">
                                    {formatNumberWithCommas(CourseData.price)} VND
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-base font-medium text-[#007fff]">
                                    Giảm giá:
                                </div>
                                <div className="text-base ">
                                    {Math.round(CourseData.salesCampaign * 100)} %
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-base font-medium text-[#007fff]">
                                    Phương thức thanh toán:
                                </div>
                                <button className="flex  items-center justify-between border border-solid border-[#1e90ff] px-2 py-1 ">
                                    <div className="flex items-center">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/online-classroom-fe.appspot.com/o/paypal.png?alt=media&token=e0b587aa-b7b6-4d47-a0be-6deb5caf1233"
                                            alt="paypal"
                                            className=" h-5 w-5"
                                        />
                                        <span className="text-base">Paypal</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="border-t-2 border-solid border-gray-300" />
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-medium text-red-600">Tổng cộng:</div>
                            <div className="text-lg font-medium text-red-600">
                                {formatNumberWithCommas(
                                    CourseData.price - CourseData.price * CourseData.salesCampaign,
                                )}{' '}
                                VND
                            </div>
                        </div>
                    </div>
                    {clientId && (
                        <div style={{ maxWidth: '750px', minHeight: '200px' }} className="mt-10">
                            <PayPalScriptProvider
                                options={{
                                    clientId: clientId,
                                    components: 'buttons',
                                    currency: 'USD',
                                }}
                            >
                                <ButtonWrapper showSpinner={false} />
                            </PayPalScriptProvider>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
