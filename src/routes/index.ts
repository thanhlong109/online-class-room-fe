import DefaultLayoutAdmin from '../layouts/adminLayouts/DefaultLayoutAdmin';
import { DefaultLayout } from '../layouts/clientLayouts';
import LoginLayout from '../layouts/clientLayouts/LoginLayout';
import { AddCoursePage, DashboardPage, UpdateCoursePage } from '../pages/AdminPages';
import {
    CourseDetailsPage,
    HomePage,
    LearningCoursePage,
    ManageProfilePage,
} from '../pages/ClientPages';
import LoginPage from '../pages/auth/login/LoginPage';
import RegisterPage from '../pages/auth/login/RegisterPage';
import NotFoundPage from '../pages/errorPage/NotFoundPage';
import PaymentPage from '../pages/ClientPages/CheckoutPage/PaymentPage';
import GetAllCourse from '../pages/AdminPages/ManageCourse/GetAllCourse/GetAllCourse';
import ViewCourseDetails from '../pages/AdminPages/ManageCourse/ViewCourseDetails/ViewCourseDetails';
import GetAllAccount from '../pages/AdminPages/ManageUser/GetAllAccount/GetAllAccount';
import LearningLayout from '../layouts/clientLayouts/LearningLayout/LearningLayout';
import { SearchPage } from '../pages/ClientPages/SearchPage';
import CreateAccountAdmin from '../pages/AdminPages/ManageUser/CreateAccountForStaffAndAdmin/CreateAccountAdmin';
import { RoleType } from '../slices/authSlice';

interface LayoutProps {
    childen: React.ReactNode;
    requireRole?: RoleType;
    whenRoleUnMatchNavTo?: string;
}

interface RouteProps {
    path: string;
    component: () => JSX.Element;
    layout: ({ childen, requireRole, whenRoleUnMatchNavTo }: LayoutProps) => JSX.Element;
}

const publicRoutes: RouteProps[] = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/courses/:id', component: CourseDetailsPage, layout: DefaultLayout },
    { path: '/login', component: LoginPage, layout: LoginLayout },
    { path: '/register', component: RegisterPage, layout: LoginLayout },
    { path: '/search/:id', component: SearchPage, layout: DefaultLayout },
    { path: '*', component: NotFoundPage, layout: DefaultLayout },
];

const privateRoutes: RouteProps[] = [
    { path: '/learn/:id', component: LearningCoursePage, layout: LearningLayout },
    { path: '/user/:id', component: ManageProfilePage, layout: DefaultLayout },
    { path: '/checkout', component: PaymentPage, layout: DefaultLayout },
];

const adminRoutes: RouteProps[] = [
    { path: '/admin/', component: DashboardPage, layout: DefaultLayoutAdmin },
    { path: '/admin/addCourse/', component: AddCoursePage, layout: DefaultLayoutAdmin },
    { path: '/admin/updateCourse/:id', component: UpdateCoursePage, layout: DefaultLayoutAdmin },
    { path: '/admin/getAllCourse/', component: GetAllCourse, layout: DefaultLayoutAdmin },
    {
        path: '/admin/getAllCourse/details/:id',
        component: ViewCourseDetails,
        layout: DefaultLayoutAdmin,
    },
    { path: '/admin/getAllAccount', component: GetAllAccount, layout: DefaultLayoutAdmin },
    { path: '/admin/createAccount', component: CreateAccountAdmin, layout: DefaultLayoutAdmin },
];

const staffRoutes: RouteProps[] = [];

export { publicRoutes, privateRoutes, adminRoutes, staffRoutes };
