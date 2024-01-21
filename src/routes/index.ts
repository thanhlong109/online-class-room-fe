import { DefaultLayout, LayoutWithRightSideBar } from '../layouts/clientLayouts';
import {
    CourseDetailsPage,
    HomePage,
    LearningCoursePage,
    ManageProfilePage,
} from '../pages/ClientPages';

interface RouteProps {
    path: string;
    component: () => JSX.Element;
    layout: ({ childen }: any) => JSX.Element;
}

const publicRoutes: RouteProps[] = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/courses/:id', component: CourseDetailsPage, layout: DefaultLayout },
];

const privateRoutes: RouteProps[] = [
    { path: '/learn/:id', component: LearningCoursePage, layout: LayoutWithRightSideBar },
    { path: '/user/:id', component: ManageProfilePage, layout: DefaultLayout },
];

const adminRoutes: RouteProps[] = [];

const staffRoutes: RouteProps[] = [];

export { publicRoutes, privateRoutes, adminRoutes, staffRoutes };
