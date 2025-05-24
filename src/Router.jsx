
import {createBrowserRouter} from "react-router-dom";
import Dashboard from './pages/Dashboard'

import Levantamientos from './pages/Levantamientos'

import Login from './pages/Login'

import MenuLayout from './components/MenuLayout'
import ProtectedRoute from "./components/ProtectedRoutes";
import NotFoundPage from "./pages/NotFoundPage";
import AltaLevantamientos from "./pages/AltaLevantamientos";


const router=createBrowserRouter([
        {
            path: "/",
            Component: MenuLayout, // Envuelve las rutas con MenuBar
            children: [
            //{ index: true, Component: Home },
           // { path: "dashboard", Component: Dashboard },
                {
                    path: "levantamientos",
                    Component: ProtectedRoute,
                    children: [{ index: true, Component: Levantamientos }]
                },
                { path: "dashboard", Component: Dashboard },
                {
                    path: "add/levantamiento",
                    Component: ProtectedRoute,
                    children: [{ index: true, Component: AltaLevantamientos }]
                },
            ],
        },
        {
            path: "/login",
            Component: Login, // Login está fuera del MenuBar
        },
        {
            path: "*",
            Component: NotFoundPage, // Login está fuera del MenuBar
        },

        /*{
            path: "/",
            Component: Root,
            children: [
            { index: true, Component: Home },
            // { path: "about", Component: About },
            { path: "login", Component: Lohin },
            {
                path: "auth",
                Component: AuthLayout,
                children: [
                { path: "login", Component: Login },
                { path: "register", Component: Register },
                ],
            },
            {
                path: "concerts",
                children: [
                { index: true, Component: ConcertsHome },
                { path: ":city", Component: ConcertsCity },
                { path: "trending", Component: ConcertsTrending },
                ],
            },
            ],
        },*/
]);

export default router;
