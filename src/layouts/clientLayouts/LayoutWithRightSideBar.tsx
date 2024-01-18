import { Footer, Header } from '.';
import SideBar from './SideBar';

const LayoutWithRightSideBar = ({ childen }: any) => {
    return (
        <>
            <div>
                <Header />
                <div className="flex">
                    <div className="flex-1">
                        {childen}
                        <Footer />
                    </div>
                    <div className="relative w-1/4 min-w-[275px]">
                        <SideBar />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LayoutWithRightSideBar;
