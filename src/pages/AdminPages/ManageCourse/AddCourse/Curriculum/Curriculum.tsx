import LectureCreator from '../Lecture/LectureCreator';
import SectionCreator from './SectionCreator';

const Curriculum = () => {
    return (
        <div>
            <p className="mb-4 text-xl font-bold text-[#1677ff]">Chu trình học</p>
            <SectionCreator position={1} lable="Giới thiệu khóa học">
                <LectureCreator position={1} lable="Set up môi trường" />
                <LectureCreator position={1} lable="Set up môi trường" />
                <LectureCreator position={1} lable="Set up môi trường" />
            </SectionCreator>
        </div>
    );
};

export default Curriculum;
