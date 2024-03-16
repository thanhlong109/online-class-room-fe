import { forwardRef, useRef, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { motion } from 'framer-motion';
import PauseIcon from '@mui/icons-material/Pause';

interface Props {
    src: string;
}

const Video = ({ src }: Props, ref: any) => {
    if (ref === null) {
        ref = useRef();
    }
    const [duration, setDuration] = useState(0);
    const [isPlay, setPlay] = useState(true);
    const handleOnClick = () => {
        if (isPlay) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    };

    const handleOnVideoClick = (play: boolean) => {
        setPlay(play);
    };

    const onVideoLoaded = () => {
        if (ref.current) {
            setDuration(ref.current.duration);
            console.log(ref.current.duration);
        }
    };
    return (
        <>
            <div className="relative cursor-pointer text-[50px] md:text-[80px]">
                <video
                    onPause={() => handleOnVideoClick(true)}
                    onPlay={() => handleOnVideoClick(false)}
                    ref={ref}
                    controls
                    width="100%"
                    onLoadedMetadata={onVideoLoaded}
                >
                    <source src={src} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                </video>
                <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-white">
                    {isPlay && (
                        <motion.div
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1, type: 'keyframes' }}
                        >
                            <div
                                className="flex items-center rounded-full bg-[#0000007d]"
                                onClick={handleOnClick}
                            >
                                <PlayArrowIcon style={{ fontSize: 'inherit', color: 'inherit' }} />
                            </div>
                        </motion.div>
                    )}
                    {!isPlay && (
                        <motion.div
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1, type: 'keyframes' }}
                        >
                            <div
                                className=" flex items-center rounded-full  bg-[#0000007d] "
                                onClick={() => handleOnClick()}
                            >
                                <PauseIcon style={{ fontSize: 'inherit', color: 'inherit' }} />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
};

export default forwardRef(Video);
