import React from 'react';
import Recoil from 'recoil';
import { userState } from './../store/userStore';
import Request from "../services/request";


import './../assets/sass/recap.sass'
import "./../../node_modules/hover.css/css/hover-min.css"

const Fiche = (props) => {
    const [allUser, setAllUser] = React.useState([]);
    const [user, ] = Recoil.useRecoilState(userState);
    const [actualFiche, setActualFiche] = React.useState({});

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


    return (
        <>
            <div className="recap">
                {console.log(allUser.filter((item) => !item.role.includes('mj')))}
                {
                    allUser.filter((item) => !item.role.includes('mj')).map((item, index) => 
                        <div className="players" key={item.email} onClick={()=>{
                            setActualFiche(item)
                        }}>
                            <img src={item.image} className='playerimgrecap' alt="icon" />
                            <div className="moneyitemrecap">
                                <img src="https://cdn.discordapp.com/attachments/723972043703320707/1105851371435065444/image_4.png" alt="coin" />
                                <h3>{item.money || 0}</h3>
                            </div>

                            <div className="statsrecap">
                                <div className="statrecap">
                                    <h4>Adresse / Chance</h4>
                                    <h4>{item.state?.chance || 0}</h4>
                                </div>
                                <div className="statrecap">
                                    <h4>Charisme</h4>
                                    <h4>{item.state?.charisme || 0}</h4>
                                </div>
                                <div className="statrecap">
                                    <h4>Habilité magique</h4>
                                    <h4>{item.state?.magic || 0}</h4>
                                </div>
                                <div className="statrecap">
                                    <h4>Habilité phisique</h4>
                                    <h4>{item.state?.damage || 0}</h4>
                                </div>
                            </div>
                        </div>

                    )
                }


            </div>
            <div className="skills">
                <h3>Compétences :</h3>
                    <ul>
                        {
                            actualFiche && actualFiche.skills?.map((item, index) => 
                                <li key={index}>
                                    {
                                    item.includes('@') &&
                                        <h4 style={{color: 'blue'}}>{item.replace(/@/g, '')}</h4>
                                    }
                                    {
                                        !item.includes('@') &&
                                            <h4>{item.replace(/@/g, '')}</h4>
                                    }
                                </li>
                            )
                            
                        }
                    </ul>
                </div>

                <div className="skills">
                    <h3>Items :</h3>
                    <ul>
                        {
                            actualFiche && actualFiche.items?.map((item, index) => 
                                <li key={index}>
                                    {
                                    item.includes('@') &&
                                        <h4 style={{color: 'blue'}}>{item.replace(/@/g, '')}</h4>
                                    }
                                    {
                                        !item.includes('@') &&
                                            <h4>{item.replace(/@/g, '')}</h4>
                                    }
                                </li>
                            )
                            
                        }
                    </ul>
                </div>
            </>
    );
}

export default Fiche;
