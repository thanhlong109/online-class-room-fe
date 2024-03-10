import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
    FUNDING,
    PayPalButtons,
    PayPalButtonsComponentProps,
    PayPalScriptProvider,
    usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useAddOrderToDBMutation, useGetClientIdQuery } from '../../../services/order.services';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
    accountId: string;
    courseId: number;
}

const PaymentPage = () => {
    const navigate = useNavigate();
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
        if (error) {
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
                    createOrder={() => {
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
                            .then((order) => order.id)
                            .catch((err) => {
                                alert(err.message);
                            });
                    }}
                    onApprove={(data) => {
                        return fetch(
                            `https://estudyhub.azurewebsites.net/api/Order/createCaptureWithPaypal?transactionId=${data.orderID}`,
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
                                respone.json();
                            })
                            .then((detail) => {
                                navigate('/');
                            })
                            .catch((err) => {
                                alert(err.message);
                            });
                    }}
                />
            </>
        );
    };

    return (
        <div className='className="min-w-screen flex min-h-screen grow justify-center'>
            <div className="w-[50%]  p-10">
                <h1 className="mb-5 text-3xl font-black lg:text-4xl">Thanh toán</h1>
                <h3 className="mb-8 text-2xl font-black lg:text-2xl">Chi tiết đơn hàng</h3>
                <div className="mb-4 flex items-center justify-between rounded-lg p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <div className="flex items-center">
                        <img src={CourseData.imageUrl} alt="hinh src" className="mr-4 h-8 w-8" />
                        <h3>{addOrderRespone.totalPrice}</h3>
                    </div>
                    <div className="flex items-center">
                        <b className="mr-2">499,000 đ</b>
                        <button className="text-center">
                            <DeleteOutlineOutlinedIcon style={{ fontSize: '16px' }} type="text" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex w-[30%] flex-col bg-gradient-to-b from-gray-100 via-gray-100 to-white p-5">
                <div className="flex items-center justify-center py-8">
                    <h3 className="text-xl font-bold lg:text-2xl">Thanh toán chi tiết</h3>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div className="text-lg ">Giá gốc sản phẩm:</div>
                    <div className="text-lg ">499,000 đ</div>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div className="text-lg ">Giảm giá:</div>
                    <div className="text-lg ">10%</div>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div className="text-lg ">Phương thức thanh toán:</div>
                    <button className="flex  items-center justify-between border border-solid border-[#1e90ff] px-2 py-1 ">
                        <div className="flex items-center">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/online-classroom-fe.appspot.com/o/paypal.png?alt=media&token=e0b587aa-b7b6-4d47-a0be-6deb5caf1233"
                                alt="paypal"
                                className=" h-5 w-5"
                            />
                            <span className="text-lg">Paypal</span>
                        </div>
                    </button>
                </div>

                <div className="mt-2 flex items-center justify-between border-t-2 border-solid border-gray-300 py-2">
                    <div className="text-lg ">Tổng cộng:</div>
                    <div className="text-lg ">{addOrderRespone.totalPrice}đ</div>
                </div>
                {/**************************** Paypal *****************************/}
                {clientId && (
                    <div style={{ maxWidth: '750px', minHeight: '200px' }}>
                        <PayPalScriptProvider
                            options={{ clientId: clientId, components: 'buttons', currency: 'USD' }}
                        >
                            <ButtonWrapper showSpinner={false} />
                        </PayPalScriptProvider>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;
