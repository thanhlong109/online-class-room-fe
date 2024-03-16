import { useSelector } from 'react-redux';
import { Footer, Header } from '.';
import { RoleType } from '../../slices/authSlice';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
export interface DefaultLayoutProps {
    childen: React.ReactNode;
    requireRole?: RoleType;
    whenRoleUnMatchNavTo?: string;
}

const DefaultLayout = ({ childen, requireRole, whenRoleUnMatchNavTo }: DefaultLayoutProps) => {
    const navigate = useNavigate();
    const currentRole = useSelector((state: RootState) => state.auth.currentRole);
    if (currentRole && currentRole != requireRole && whenRoleUnMatchNavTo) {
        navigate(whenRoleUnMatchNavTo);
    }
    return (
        <div>
            <Header />
            <div className="mt-4 py-4">{childen}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
