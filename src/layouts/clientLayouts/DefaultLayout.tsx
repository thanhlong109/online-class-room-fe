import { Footer, Header } from '.';

const DefaultLayout = ({ childen }: any) => {
    return (
        <div>
            <Header />
            <div>{childen}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
