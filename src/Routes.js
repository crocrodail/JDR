import Home from "./pages/home";
import Dish from './component/menu/Dish';

import { BiCategoryAlt } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";
import { MdQrCode2 } from "react-icons/md";

const Routes =  [

    {
        path: '/',
        component: Home,
        name: 'Fiches perso',
        icon: BiCategoryAlt,
    },

    // {
    //     path: '/menu',
    //     component: Dish,
    //     name: 'Menu',
    //     icon: CgOptions,
    // },

    // {
    //     path: '/mqrcode',
    //     component: Home,
    //     name: 'mqrcode',
    //     icon: MdQrCode2,
    // }



];

export default Routes;
