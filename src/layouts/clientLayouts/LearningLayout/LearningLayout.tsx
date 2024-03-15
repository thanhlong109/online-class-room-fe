import { useNavigate } from 'react-router-dom';
import { Footer, Header } from '..';
import { RoleType } from '../../../slices/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export interface LearningLayoutProps {
    childen: React.ReactNode;
    requireRole?: RoleType;
    whenRoleUnMatchNavTo?: string;
}

const LearningLayout = ({ childen, requireRole, whenRoleUnMatchNavTo }: LearningLayoutProps) => {
    const navigate = useNavigate();
    const currentRole = useSelector((state: RootState) => state.auth.currentRole);
    if (currentRole && currentRole != requireRole && whenRoleUnMatchNavTo) {
        navigate(whenRoleUnMatchNavTo);
    }
    return (
        <div>
            <Header />
            <div className="min-h-screen bg-[#f7f9fa]">{childen}</div>
            <Footer />
        </div>
    );
};

export default LearningLayout;
