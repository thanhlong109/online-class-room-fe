import { DefaultLayout, LayoutWithRightSideBar } from '../layouts/clientLayouts';
import LoginLayout from '../layouts/clientLayouts/LoginLayout';
import {
    CourseDetailsPage,
    HomePage,
    LearningCoursePage,
    ManageProfilePage,
} from '../pages/ClientPages';
import LoginPage from '../pages/auth/login/LoginPage';
import TestApiPage from '../pages/ClientPages/TestApiPage';
import RegisterPage from '../pages/auth/login/RegisterPage';
import NotFoundPage from '../pages/errorPage/NotFoundPage';

interface RouteProps {
    path: string;
    component: () => JSX.Element;
    layout: ({ childen }: any) => JSX.Element;
}

const publicRoutes: RouteProps[] = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/courses/:id', component: CourseDetailsPage, layout: DefaultLayout },
    { path: '/login', component: LoginPage, layout: LoginLayout },
    { path: '/register', component: RegisterPage, layout: LoginLayout },
    { path: '/testApi', component: TestApiPage, layout: DefaultLayout },
    { path: '*', component: NotFoundPage, layout: DefaultLayout },
];

const privateRoutes: RouteProps[] = [
    { path: '/learn/:id', component: LearningCoursePage, layout: LayoutWithRightSideBar },
    { path: '/user/:id', component: ManageProfilePage, layout: DefaultLayout },
];

const adminRoutes: RouteProps[] = [];

const staffRoutes: RouteProps[] = [];

export { publicRoutes, privateRoutes, adminRoutes, staffRoutes };
