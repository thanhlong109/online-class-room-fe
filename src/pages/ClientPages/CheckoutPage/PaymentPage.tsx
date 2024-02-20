import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button } from 'antd';
import React from 'react';

const PaymentPage = () => {
    return (
        <div className='className="min-w-screen flex min-h-screen grow justify-center'>
            <div className="w-[50%]  p-10">
                <h1 className="mb-5 text-3xl font-black lg:text-4xl">Thanh toán</h1>
                <h3 className="mb-8 text-2xl font-black lg:text-2xl">Chi tiết đơn hàng</h3>
                <div className="mb-4 flex items-center justify-between rounded-lg p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <div className="flex items-center">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/online-classroom-fe.appspot.com/o/pngwing.com.png?alt=media&token=de5aa32a-f41a-4768-a23c-7606ab9e6b60"
                            alt="hinh src"
                            className="mr-4 h-8 w-8"
                        />
                        <h3>Học và làm dự án thực tế</h3>
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
                    <div className="text-lg ">449,100 đ</div>
                </div>

                <Button className="mt-5 flex  items-center justify-center bg-[#A435F0] py-5 text-lg font-bold text-white hover:border-[#D2B4DE] hover:bg-[#D2B4DE] hover:text-white">
                    Thanh toán
                </Button>
            </div>
        </div>
    );
};

export default PaymentPage;
