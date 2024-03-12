import { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export interface VideoPlayerProps {
    src: string;
    maxPlaybackTime?: number;
    
}

const VideoPlayer = ({src,maxPlaybackTime}:VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null); 

    useEffect(() => {
        if (!videoRef.current) return; 

        const player = videojs(videoRef.current, {
            controls: true,
            autoplay: false,
            sources: [
                {
                    src: src,
                    type: 'video/mp4',
                },
            ],
        });

        
        const limitPlaybackTime = () => {
            if(maxPlaybackTime){
                const time = player.currentTime();
            if (typeof time === 'number' && time > maxPlaybackTime) {
                player.currentTime(maxPlaybackTime);
            }
            }
            
        };
        if(maxPlaybackTime){
            player.on('timeupdate', limitPlaybackTime);
        }
        

        return () => {
            if(maxPlaybackTime){
                player.off('timeupdate', limitPlaybackTime); 
            }
            
            player.dispose();
        };
    }, [maxPlaybackTime]); 

    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js"></video>
        </div>
    );
};

export default VideoPlayer;