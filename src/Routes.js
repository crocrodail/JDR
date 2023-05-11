import Home from "./pages/home";
import Board from "./pages/board";

import { BiCategoryAlt } from "react-icons/bi";
import { FiMap } from "react-icons/fi";



const Routes =  [

    {
        path: '/',
        component: Home,
        name: 'Fiches perso',
        icon: BiCategoryAlt,
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
