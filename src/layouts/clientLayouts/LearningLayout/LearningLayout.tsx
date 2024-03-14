import { Footer, Header } from '..';

export interface LearningLayoutProps {
    childen: React.ReactNode;
}

const LearningLayout = ({ childen }: LearningLayoutProps) => {
    return (
        <div>
            <Header />
            <div className="min-h-screen bg-[#f7f9fa]">{childen}</div>
            <Footer />
        </div>
    );
};

export default LearningLayout;
