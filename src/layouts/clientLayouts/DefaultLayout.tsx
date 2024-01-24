import { Footer, Header } from '.';

const DefaultLayout = ({ childen }: any) => {
    return (
        <div>
            <Header />
            <div className="mt-4 py-4">{childen}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
