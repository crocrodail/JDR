import Home from "./pages/home";
import Board from "./pages/board";
import Recap from "./pages/recap";

import { BiCategoryAlt } from "react-icons/bi";
import { FiMap } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";




const Routes =  [

    {
        path: '/',
        component: Home,
        name: 'Fiches perso',
        icon: BiCategoryAlt,
    },

    {
        path: '/',
        component: Recap,
        name: 'Recap fiches perso',
        icon: FaUsers,
    },

    {
        path: '/board',
        component: Board,
        name: 'Board',
        icon: FiMap,
    },

    // {
    //     path: '/mqrcode',
    //     component: Home,
    //     name: 'mqrcode',
    //     icon: MdQrCode2,
    // }



];

export default Routes;
