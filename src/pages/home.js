import React from 'react';
import Recoil from 'recoil';
import { userState } from './../store/userStore';
import Skeleton from '@mui/material/Skeleton';
import Request from "../services/request";
import { menuIdState } from '../store/menu';
import footer from "./../assets/images/footer.png"
import Fiche from './fiche';
import './../assets/sass/myMenu.sass'
import "./../../node_modules/hover.css/css/hover-min.css"

const Home = () => {
    const [allUser, setAllUser] = React.useState([]);
    const [user, ] = Recoil.useRecoilState(userState);
    const [menuId, setMenuId] = Recoil.useRecoilState(menuIdState);

    React.useEffect(() => {
        Request(`${process.env.REACT_APP_API_URL}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
        })
            .then(res => {
                setAllUser(res.data)
            });
    }, [user.token]);
    if (menuId !== 0 && allUser.length !== 0) { return <Fiche allUser={allUser} /> }

    return (
        <div className="myMenu">
            <div className="title">
                <div>
                    <h1>Fiche des perso</h1>
                    <br></br>
                    <br></br>
                </div>
                {/* <button><MdAdd/>Ajouter un menu</button> */}
            </div>
            <div className="content">
                <ul>
                    {
                        allUser.map((item, index) => 
                            <li key={item.email} className="hvr-float" onClick={() => setMenuId(item.email)}>
                                <div className="mask" style={{backgroundImage: `url('${item.image}')`}}></div>
                                    <div className="maskcolor"></div>
                                        <img className="icon" src={item.image} alt="chat" />
                                        <span>{item.email}</span>
                                    <div>
                                </div>
                            </li>
                        )
                    }
                    {
                        allUser === [] &&
                        <>
                            <Skeleton className="skeleton" variant="rectangular" />
                            <Skeleton className="skeleton" variant="rectangular" />
                            <Skeleton className="skeleton" variant="rectangular" />
                            <Skeleton className="skeleton" variant="rectangular" />
                        </>
                    }
                </ul>
            </div>
            <img className="footer-img" src={footer} alt="footer" />
        </div>
    );
}

export default Home;
