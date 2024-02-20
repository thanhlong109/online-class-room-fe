import { Breadcrumb, Layout, theme } from 'antd';
import Nav from './Nav/Nav';

const { Header, Content, Footer } = Layout;

const DefaultLayoutAdmin = ({ childen }: any) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
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
            </Layout>
        </>
    );
};

export default DefaultLayoutAdmin;
