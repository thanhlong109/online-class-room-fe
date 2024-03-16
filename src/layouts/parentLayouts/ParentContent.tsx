import { Content } from 'antd/es/layout/layout';
import React from 'react';

export default function ParentContent({ childen }: { childen: React.ReactNode }) {
    return (
        <Content className="container bg-[#f0f2f5] py-20">
            <main className="h-full bg-white p-8">{childen}</main>
        </Content>
    );
}
