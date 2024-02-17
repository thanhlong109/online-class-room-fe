import { useState } from 'react';
import { Footer, Header } from '.';
import SideBar from './SideBar';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const LayoutWithRightSideBar = ({ childen }: any) => {
    const [isClose, setClose] = useState(false);
    const displayWidth = 'md:w-1/5 md:min-w-[200px]';
    const [width, setWidth] = useState(displayWidth);
    const handleClickCloseOpen = () => {
        setClose((pre) => {
            setWidth(!pre ? 'md:w-0' : displayWidth);
            return !pre;
        });
    };
    return (
        <>
            <div>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1">
                        <Header />
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
