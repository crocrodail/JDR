import React from "react"
import Recoil from 'recoil';
import { userState } from './../store/userStore';
import { Link } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";
import logo from "./../assets/images/logo_white.png"
import { Scrollbars } from 'react-custom-scrollbars';
import Routes from "../Routes";
import Login from "./login";


import './../assets/sass/dashboard.sass'
import "./../assets/sass/main.sass"

const Main = () => {
    const [page, setPage] = React.useState("Fiches perso");
    const [user, setUser] = Recoil.useRecoilState(userState);
    if (user === null) return (<Login />);
    const handleDisconect = () => {
        setUser(null);
        sessionStorage.removeItem("user");
    }
    return (
        <main className="dashboard-menu">
            <div className="menu">
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
                <img className="user" src={user.user.image} alt="icon" />
                <h2>{user.user.email}</h2>
                <h3>{user.user.description}</h3>
                <div className="menu-items">
                    {
                        Routes.map((route, index) => {
                            if (page === route.name) {
                                return (
                                    <div key={route.name} className="menu-item actif-menu">
                                        <route.icon />
                                        <span>{route.name}</span>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={route.name} className="menu-item" onClick={() => setPage(route.name)}>
                                        <route.icon />
                                        <span>{route.name}</span>
                                    </div>
                                )
                            }
                        })
                    }
                    <div className="menu-item logout" onClick={handleDisconect} >
                        <FiLogOut />
                        <span>Déconnexion</span>
                    </div>
                </div>
            </div>
            <Scrollbars id="content-dashboard" style={{ height: '100vh' }}>
                <div className="content">
                    {
                        Routes.map((route, index) => {
                            if (page === route.name) {
                                return (
                                    <route.component key={route.name} />
                                )
                            }
                            return null;
                        })
                    }
                </div>
            </Scrollbars >
        </main>
    );
}

export default Main
