import { useState } from 'react';
import { motion } from 'framer-motion';

export enum LectureType {
    VIDEO,
    QUIZZ,
}

interface LectureContentTypeProps {
    icon: React.ReactNode;
    lable: string;
    onSelect: (lectureSelectedType: LectureType) => void;
    lectureType: LectureType;
}
const LectureContentType = ({ icon, lable, lectureType, onSelect }: LectureContentTypeProps) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className={`relative block max-h-[72px] w-fit cursor-pointer overflow-hidden border-[1px] border-[#c3c4c4] ${isHovered ? 'bg-black text-white' : 'bg-[#f7f9fa]'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onSelect(lectureType)}
        >
            <motion.div
                initial={{ background: '#f7f9fa' }}
                animate={{
                    background: isHovered ? '#000' : '#f7f9fa',
                    transform: isHovered ? 'translateY(-50%)' : 'translateY(0)',
                }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <div className="px-6 pb-8 pt-4">
                        <div className={`flex items-center justify-between`}>{icon}</div>
                    </div>
                    <div className="px-6 pb-8 pt-4">
                        <div className={`flex items-center justify-between`}>{icon}</div>
                    </div>
                </div>
            </motion.div>

            <p className="absolute bottom-0 left-0 right-0 bg-[#d1d7dc] text-center text-sm">
                {lable}
            </p>
        </div>
    );
};

export default LectureContentType;
