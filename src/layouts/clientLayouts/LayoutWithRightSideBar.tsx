import { Footer, Header } from '.';
import SideBar from './SideBar';

const LayoutWithRightSideBar = ({ childen }: any) => {
    return (
        <div>
            <Header />
            <div>
                <div>{childen}</div>
                <SideBar />
            </div>
            <Footer />
        </div>
    );
};

export default LayoutWithRightSideBar;
