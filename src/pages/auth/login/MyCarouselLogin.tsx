import { Carousel } from 'antd';

const images = [
    'https://firebasestorage.googleapis.com/v0/b/online-classroom-fe.appspot.com/o/Login_Image%2FloginHello.png?alt=media&token=c4dd4a9b-83ce-4569-967d-ec13d63ed66d',

    'https://firebasestorage.googleapis.com/v0/b/online-classroom-fe.appspot.com/o/Login_Image%2FloginHello_2.png?alt=media&token=700698b5-bcfc-454a-9fbc-f9bdf6999c6c',
];
const MyCarouselLogin = () => {
    return (
        <Carousel>
            {images.map((imageUrl, index) => (
                <div key={index} className="h-screen">
                    <img
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className="mx-auto h-full object-cover "
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default MyCarouselLogin;
