import { Content } from 'antd/es/layout/layout';
import React from 'react';

export default function MyContent({ childen }: { childen: React.ReactNode }) {
    return (
        <Content className="bg-[#f8f8f8] px-4 py-20">
            <main className="h-full bg-white p-8">{childen}</main>
        </Content>
    );
}
