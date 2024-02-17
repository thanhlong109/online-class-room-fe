import { CheckCircleFilled } from '@ant-design/icons';
import { CheckCircleOutlined } from '@mui/icons-material';
import { Button, DatePicker, Form, Input, Result } from 'antd';
import { ChangeEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleCardNumberChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        let value = e.target.value;
        // Remove non-numeric characters
        value = value.replace(/\D/g, '');
        // Format card number with spaces every 4 digits
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        // Update state with formatted value
        setCardNumber(formattedValue);
    };

    const handleCardNumberBlur = () => {
        // Check if the card number is complete (16 digits)
        if (cardNumber.replace(/\s/g, '').length === 16) {
            // You can perform any action here, such as focusing on the next input field
        }
    };
    const handleCVVChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        let value = e.target.value;
        // Remove non-numeric characters
        value = value.replace(/\D/g, '');
        // Limit to maximum length of 3 digits
        value = value.slice(0, 3);
        // Update state with formatted value
        setCardCVV(value);
    };

    const handleCVVBlur = () => {
        // Check if the CVV is complete (3 digits)
        if (cardCVV.length !== 3) {
            // Handle the error here, such as displaying a message to the user
        }
    };

    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPaymentMethod(method);
    };

    const handlePayment = () => {
        // Thực hiện thanh toán ở đây

        // Sau khi thanh toán thành công, cập nhật state paymentSuccess thành true
        setPaymentSuccess(true);
    };

    return (
        <div className="min-w-screen flex min-h-screen grow justify-center">
            <div className="w-[50%]  p-10   ">
                <h1 className="mb-5 text-3xl font-black lg:text-4xl">Thanh toán</h1>
                <h3 className="mb-8 text-2xl font-black lg:text-2xl">Phương thức thanh toán</h3>
                <div className="mb-10 flex items-center gap-8">
                    <button
                        className={`flex w-1/2 items-center justify-between border-2 border-solid px-8 py-4 ${selectedPaymentMethod === 'credit' ? 'border-[#1e90ff]' : 'border-[#dfe6e9]'}`}
                        onClick={() => handlePaymentMethodSelect('credit')}
                    >
                        <div className="flex">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/online-classroom-fe.appspot.com/o/atm-card.png?alt=media&token=8251f388-3018-44cd-8c52-70abd82a525e"
                                alt="credit-card"
                                className=" h-6 w-6"
                            />
                            <span className=" text-xl">Credit Card</span>
                        </div>
                        {selectedPaymentMethod === 'credit' ? (
                            <CheckCircleFilled style={{ fontSize: '16px', color: '#1e90ff' }} />
                        ) : (
                            <CheckCircleOutlined style={{ fontSize: '16px' }} />
                        )}
                    </button>
                    <button
                        className={`flex w-1/2 items-center justify-between border-2 border-solid px-8 py-4 ${selectedPaymentMethod === 'paypal' ? 'border-[#1e90ff]' : 'border-[#dfe6e9]'}`}
                        onClick={() => handlePaymentMethodSelect('paypal')}
                    >
                        <div className="flex">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/online-classroom-fe.appspot.com/o/paypal.png?alt=media&token=e0b587aa-b7b6-4d47-a0be-6deb5caf1233"
                                alt="paypal"
                                className=" h-6 w-6"
                            />
                            <span className="text-xl">Paypal</span>
                        </div>
                        {selectedPaymentMethod === 'paypal' ? (
                            <CheckCircleFilled style={{ fontSize: '16px', color: '#1e90ff' }} />
                        ) : (
                            <CheckCircleOutlined style={{ fontSize: '16px' }} />
                        )}
                    </button>
                </div>
                <Form layout="vertical">
                    <Form.Item label="Cardholder Name" required>
                        <Input placeholder="" />
                    </Form.Item>
                    <Form.Item label="Card Number" required>
                        <Input
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            onBlur={handleCardNumberBlur}
                            maxLength={19}
                        />
                    </Form.Item>
                    <div className=" flex">
                        <Form.Item label="Expiration Date" required>
                            <div className="flex">
                                <DatePicker
                                    picker="month"
                                    format="MM"
                                    placeholder="Select Month"
                                    className="mr-2 px-12"
                                />
                                <DatePicker
                                    picker="year"
                                    placeholder="Select Year"
                                    className="px-12"
                                />
                            </div>
                        </Form.Item>
                        <Form.Item label="CVV" required className="ml-4">
                            <Input
                                placeholder="123"
                                value={cardCVV}
                                onChange={handleCVVChange}
                                onBlur={handleCVVBlur}
                                maxLength={3}
                                className="px-6"
                            />
                        </Form.Item>
                    </div>
                </Form>
                <div className="mt-8">
                    <h4 className="mb-4 text-2xl font-bold">Chi tiết đơn hàng</h4>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/online-classroom-fe.appspot.com/o/pngwing.com.png?alt=media&token=de5aa32a-f41a-4768-a23c-7606ab9e6b60"
                                alt="hinh src"
                                className="mr-4 h-8 w-8"
                            />
                            <span>Học và làm dự án thực tế</span>
                        </div>
                        <b>499,000 đ</b>
                    </div>
                </div>
            </div>
            <div className="flex w-[30%] flex-col bg-gradient-to-b  from-gray-100 via-gray-100 to-white p-12">
                <h3 className="mb-5 text-2xl font-black lg:text-2xl">Tổng hóa đơn</h3>
                <div className="flex items-center">
                    <div className="text-lg">Giá gốc:</div>
                    <div className="flex-1 text-right text-base">499,000 đ</div>
                </div>
                <div className="flex items-center">
                    <div className="text-lg">Giảm giá:</div>
                    <div className=" flex-1 text-right text-base">10%</div>
                </div>
                <div className="mt-5 flex items-center border-t-2 border-solid border-gray-300 ">
                    <h4 className=" mt-4 text-lg font-bold">Tổng cộng: </h4>
                    <div className="mt-4 flex-1 text-right text-lg font-bold">449,100 đ</div>
                </div>
                <Button
                    className="mt-5 flex  items-center justify-center bg-[#A435F0] py-5 text-lg font-bold text-white hover:border-[#D2B4DE] hover:bg-[#D2B4DE] hover:text-white"
                    onClick={handlePayment}
                >
                    Thanh toán
                </Button>
                {paymentSuccess && (
                    <Result
                        status="success"
                        title="Thanh toán thành công"
                        subTitle="Cảm ơn bạn đã mua hàng."
                        extra={[
                            <Button key="buyAgain" onClick={() => console.log('Buy again')}>
                                Mua lại
                            </Button>,
                            <Button
                                key="goHome"
                                className="bg-[#A435F0] text-white hover:bg-[#D2B4DE]"
                            >
                                <Link to={'/'}> Về trang chủ</Link>
                            </Button>,
                        ]}
                    />
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
