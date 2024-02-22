import { Content } from 'antd/es/layout/layout';
import React from 'react';

export default function MyContent({ childen }: { childen: React.ReactNode }) {
    return (
        <Content className="px-3 py-20">
            <main className="h-full bg-white">{childen}</main>
        </Content>
    );
}
