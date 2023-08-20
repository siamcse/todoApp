import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Todos from "../pages/Todos";
import Main from "../layout/Main";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/todos',
                element: <Todos />
            }
        ]
    }
    
]);