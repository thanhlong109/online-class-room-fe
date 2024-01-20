import { DefaultLayout } from '../layouts/clientLayouts';
import { CourseDetailsPage, HomePage } from '../pages/ClientPages';

interface RouteProps {
    path: string;
    component: () => JSX.Element;
    layout: ({ childen }: any) => JSX.Element;
}

const publicRoutes: RouteProps[] = [
    { path: '/', component: HomePage, layout: DefaultLayout },
    { path: '/courses/:id', component: CourseDetailsPage, layout: DefaultLayout },
];

const privateRoutes: RouteProps[] = [];

const adminRoutes: RouteProps[] = [];

const staffRoutes: RouteProps[] = [];

export { publicRoutes, privateRoutes, adminRoutes, staffRoutes };
