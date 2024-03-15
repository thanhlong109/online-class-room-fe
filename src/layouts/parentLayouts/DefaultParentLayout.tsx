import { Layout } from 'antd';
import ParentSider from './ParentSider';
import ParentHeader from './ParentHeader';
import ParentContent from './ParentContent';
import ParentFooter from './ParentFooter';

const DefaultParentLayout = ({ childen }: { childen: React.ReactNode }) => {
    return (
        <>
            <Layout className="min-h-screen">
                <ParentSider />
                <Layout className="bg-white">
                    <ParentHeader />
                    <ParentContent childen={childen} />
                    <ParentFooter />
                </Layout>
            </Layout>
        </>
    );
};

export default DefaultParentLayout;
