import { useState } from 'react';
import { Footer, Header } from '.';
import SideBar from './SideBar';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const LayoutWithRightSideBar = ({ childen }: any) => {
    const [isClose, setClose] = useState(false);
    const [width, setWidth] = useState('md:w-1/4 md:min-w-[275px]');
    const handleClickCloseOpen = () => {
        setClose((pre) => {
            setWidth(!pre ? 'md:w-0' : 'md:w-1/4 md:min-w-[275px]');
            return !pre;
        });
    };
    return (
        <>
            <div>
                <Header />
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1">
                        {childen}
                        <div className="hidden md:block">
                            <Footer />
                        </div>
                    </div>
                    <div className={`${width} relative w-full`}>
                        {isClose && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, type: 'tween' }}
                                className="fixed top-10 translate-x-[-100%]"
                            >
                                <Button
                                    onClick={handleClickCloseOpen}
                                    variant="outlined"
                                    style={{
                                        backgroundColor: 'white',
                                        color: '#333',
                                        borderColor: '#333',
                                    }}
                                    startIcon={<KeyboardDoubleArrowLeftIcon />}
                                >
                                    Show
                                </Button>
                            </motion.div>
                        )}

                        <SideBar onCloseClick={handleClickCloseOpen} />
                    </div>
                </div>
                <div className="block md:hidden">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default LayoutWithRightSideBar;
