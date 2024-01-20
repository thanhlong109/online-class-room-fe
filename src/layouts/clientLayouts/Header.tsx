import React from 'react';
import { Space, Typography } from 'antd';

const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <header className="bg-gray-200 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Title level={3} className="text-gray-800">
          My App
        </Title>
        <Space size={16}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </Space>
      </div>
    </header>
  );
};

export default Header;


