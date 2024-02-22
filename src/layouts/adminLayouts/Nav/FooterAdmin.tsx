import { Footer } from 'antd/es/layout/layout';

export default function MyFooter() {
    return (
        // <Footer className='text-center bg-white border-l-[1px]'>Fsoft ©2023 Created by React-08</Footer>
        //ORIGIAL CODE
        <Footer className="border-t-[1px] border-gray-200 bg-white text-center">
            {' '}
            ©{new Date().getFullYear()} Created by EStudyHub
        </Footer>
    );
}
