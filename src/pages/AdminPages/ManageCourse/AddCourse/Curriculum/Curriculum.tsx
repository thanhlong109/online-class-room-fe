import SectionCreator from './SectionCreator';

const Curriculum = () => {
    return (
        <div>
            <p className="text-xl font-bold text-[#1677ff]">Chu trình học</p>
            <SectionCreator position={1} lable="Giới thiệu khóa học" />
        </div>
    );
};

export default Curriculum;
