import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="m-auto grid max-w-[400px] p-6 sm:max-w-[1200px] sm:grid-cols-2 sm:gap-6 lg:gap-x-20">
            <img
                src="https://firebasestorage.googleapis.com/v0/b/online-classroom-fe.appspot.com/o/Error_Page%2Ferror_page.jpg?alt=media&token=7b039ac6-0cca-466d-8f4c-6a84c01f07f2"
                alt="NotFound"
                className="m-auto w-full max-w-[300px] object-cover sm:col-span-1 sm:row-span-2 sm:max-w-[500px]"
            />
            <div className="flex flex-col justify-end">
                <h1 className="text-6xl font-black lg:text-8xl">404</h1>
                <h3 className="text-2xl font-black lg:text-[40px]">Không Tìm Thấy Trang!</h3>
            </div>
            <div className="grid place-content-baseline gap-6 sm:max-w-[300px] ">
                <p>Rất tiếc, không thể tìm thấy trang bạn yêu cầu. Vui lòng quay lại trang chủ.</p>
                <button className="rounded-[5px] border-none bg-violet-500 p-4 text-base font-semibold text-[#fff] outline-none hover:bg-violet-400">
                    <Link to={'/'}>VỀ TRANG CHỦ</Link>
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
