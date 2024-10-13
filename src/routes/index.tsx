import { useRoutes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage'
import ProjectPage from '../pages/ProjectPage';
import SignupPage from '../pages/SignupPage';
import KanbanPage from '../pages/KanbanDashBoard';

export const RouterConfig = () => {
    const routes = useRoutes([
        {
            element: <LoginPage />,
            path: "/"
        },
        // {
        //     element: <SignupPage />,
        //     path: "/signup"
        // },
        {
            element: <ProjectPage />,
            path: "/project"
        },
        // {
        //     element: <KanbanPage />,
        //     path: "/dashboard"
        // },
    ])
    return routes;
}

export default RouterConfig;
