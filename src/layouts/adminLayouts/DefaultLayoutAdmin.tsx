import { Layout } from 'antd';
// import Nav from './Nav/Nav';
import MySider from './Nav/Sider';
import MyHeader from './Nav/HeaderAdmin';
import MyContent from './Nav/ContentAdmin';
import MyFooter from './Nav/FooterAdmin';

// const { Header, Content, Footer } = Layout;

const DefaultLayoutAdmin = ({ childen }: { childen: React.ReactNode }) => {
    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    // } = theme.useToken();
    return (
        <>
            {/* <Layout style={{ minHeight: '100vh' }}>
                <Nav />
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>header ...</Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                            className="min-h-full"
                        >
                            {childen}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        ©{new Date().getFullYear()} Created by EStudyHub
                    </Footer>
                </Layout>
            </Layout> */}
            <Layout className="min-h-screen">
                <MySider></MySider>
                <Layout className="bg-white">
                    <MyHeader />
                    <MyContent childen={childen} />
                    <MyFooter />
                </Layout>
            </Layout>
        </>
    );
};

export default DefaultLayoutAdmin;
