import React from 'react';
import Recoil from 'recoil';
import { userState } from './../store/userStore';
import Request from "../services/request";
import { menuIdState } from '../store/menu';
import { FaArrowLeft } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


import './../assets/sass/fiche.sass'
import "./../../node_modules/hover.css/css/hover-min.css"

const Fiche = (props) => {
    const [user, setUser] = Recoil.useRecoilState(userState);
    const [menuId, setMenuId] = Recoil.useRecoilState(menuIdState);
    const [editMode, setEditMode] = React.useState(false);
    const [actualFiche, setActualFiche] = React.useState(props.allUser.filter(item => item.email === menuId)[0]);
    const [totalPoints, setTotalPoints] = React.useState(0);

    const limite = 50;

    React.useEffect(() => {
        let actualTotalPoints = 0;
        for (let i in actualFiche.state) {
            actualTotalPoints += actualFiche.state[i];
        }
        setTotalPoints(actualTotalPoints);
    }, [actualFiche]);

    const handleSave = () => {
        console.log(actualFiche);
        const queryString = user.user.role.includes('mj') ? `?email=${actualFiche.email}` : '';
        Request(`${process.env.REACT_APP_API_URL}/user${queryString}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            },
            body: JSON.stringify(actualFiche)
        })
            .then(res => {
                console.log(res);
                setEditMode(false);
            });
    }

    const handleEdit = () => {
        setEditMode(true);
    }
    return (
        <div className="Fiche">
            <button id="back" className='btn btn-primary-icon' onClick={()=>setMenuId(0)}><FaArrowLeft />Back</button>
            {
                props.allUser.filter(item => item.email === menuId)[0].email === user.user.email || user.user.role.includes('mj') ?
                    !editMode ?
                        <button id="edit" className='btn btn-primary-icon' onClick={handleEdit}><FaEdit />Edit</button>
                        :
                        <button id="edit" className='btn btn-primary-icon' onClick={handleSave}><FiSave />Save</button>
                    :
                    null
                    
            }
            <img src={actualFiche.image} className='playerimg' alt="icon" />
            {
                !editMode ?
                    <h1 className='playername'>{actualFiche.email}</h1>
                    :
                    <input className='playername' type="text" defaultValue={actualFiche.email} 
                    onChange={
                        (e) => {
                            setActualFiche({
                                ...actualFiche,
                                email: e.target.value
                            })
                        }
                    } />
                    
            }
            {
                !editMode ?
                    <h2 className='playerdescription'>{actualFiche.description}</h2>
                    :
                    <input style={{marginTop: "1vw"}} placeholder='titre' className='playerdescription' type="text" defaultValue={actualFiche.description} 
                    onChange={
                        (e) => {
                            setActualFiche({
                                ...actualFiche,
                                description: e.target.value
                            })
                        }
                    }/>
                    
            }
            <div className="money">
                <div className="moneyitem">
                    <img src="https://cdn.discordapp.com/attachments/723972043703320707/1105851371435065444/image_4.png" alt="coin" />
                    {
                        !editMode ?
                            <h3>{actualFiche.money}</h3>
                            :
                            <input type="text" defaultValue={actualFiche.money} 
                            onChange={
                                (e) => {
                                    setActualFiche({
                                        ...actualFiche,
                                        money: e.target.value
                                    })
                                }
                            }/>
                            
                    }
                </div>
            </div>

            <div className="stats">
                {
                    editMode &&
                     <h3>limite {totalPoints} / {limite}</h3>
                }
                <div className="stat">
                    <h4>Adresse / Chance</h4>
                    <h4>{actualFiche.state?.chance || 0}</h4>
                    {
                        editMode &&
                        <div className="edit">
                            <button className="btn btn-primary-icon" 
                            onClick={
                                () => {
                                    if (totalPoints < limite && actualFiche.state?.chance < 18 ) {

                                        setActualFiche({
                                            ...actualFiche,
                                            state: {
                                                ...actualFiche.state,
                                                chance: actualFiche.state?.chance + 1
                                            }
                                        })
                                        setTotalPoints(totalPoints + 1);
                                    }
                                }
                            }><FaPlus /></button>
                            <button className="btn btn-primary-icon"
                            onClick={
                                () => {
                                    if (actualFiche.state?.chance > 0) {
                                        setActualFiche({
                                            ...actualFiche,
                                            state: {
                                                ...actualFiche.state,
                                                chance: actualFiche.state?.chance - 1
                                            }
                                        })
                                        setTotalPoints(totalPoints - 1);
                                    }
                                }
                            }><FaMinus /></button>
                        </div>
                    }
                </div>
                <div className="stat">
                    <h4>Charisme</h4>
                    <h4>{actualFiche.state?.charisme || 0}</h4>
                    {
                        editMode &&
                        <div className="edit">
                            <button className="btn btn-primary-icon"
                            onClick={
                                () => {
                                    if (totalPoints < limite && actualFiche.state?.charisme < 18) {
                                        setActualFiche({
                                            ...actualFiche,
                                            state: {
                                                ...actualFiche.state,
                                                charisme: actualFiche.state?.charisme + 1
                                            }
                                        })
                                        setTotalPoints(totalPoints + 1);
                                    }
                                }
                            }><FaPlus /></button>
                            <button className="btn btn-primary-icon"
                            onClick={
                                () => {
                                    if (actualFiche.state?.charisme > 0) {
                                        setActualFiche({
                                            ...actualFiche,
                                            state: {
                                                ...actualFiche.state,
                                                charisme: actualFiche.state?.charisme - 1
                                            }
                                        })
                                        setTotalPoints(totalPoints - 1);
                                    }
                                }
                            }><FaMinus /></button>
                        </div>
                    }
                </div>
                <div className="stat">
                    <h4>Habilité magique</h4>
                    <h4>{actualFiche.state?.magic || 0}</h4>
                    {
                        editMode &&
                        <div className="edit">
                            <button className="btn btn-primary-icon" onClick={
                                () => {
                                    if (totalPoints < limite && actualFiche.state?.magic < 18) {
                                        setActualFiche({
                                            ...actualFiche,
                                            state: {
                                                ...actualFiche.state,
                                                magic: actualFiche.state?.magic + 1
                                            }
                                        })
                                        setTotalPoints(totalPoints + 1);
                                    }
                                }
                            }><FaPlus /></button>
                            <button className="btn btn-primary-icon"
                            onClick={
                                () => {
                                    if (actualFiche.state?.magic > 0) {
                                        setActualFiche({
                                            ...actualFiche,
                                            state: {
                                                ...actualFiche.state,
                                                magic: actualFiche.state?.magic - 1
                                            }
                                        })
                                        setTotalPoints(totalPoints - 1);
                                    }
                                }
                            }><FaMinus /></button>
                        </div>
                    }
                </div>
                <div className="stat">
                    <h4>Habilité phisique</h4>
                    <h4>{actualFiche.state?.damage || 0}</h4>
                    {
                        editMode &&
                        <div className="edit">
                            <button className="btn btn-primary-icon" 
                            onClick={
                                () => {
                                    if (totalPoints < limite && actualFiche.state?.damage < 18) {
                                        setActualFiche({
                                            ...actualFiche,
                                            state: {
                                                ...actualFiche.state,
                                                damage: actualFiche.state?.damage + 1
                                            }
                                        })
                                        setTotalPoints(totalPoints + 1);
                                    }
                                }
                            }><FaPlus /></button>
                            <button className="btn btn-primary-icon" onClick={
                                () => {
                                    if (actualFiche.state?.damage > 0) {
                                        setActualFiche({
                                            ...actualFiche,
                                            state: {
                                                ...actualFiche.state,
                                                damage: actualFiche.state?.damage - 1
                                            }
                                        })
                                        setTotalPoints(totalPoints - 1);
                                    }
                                }
                            }><FaMinus /></button>
                        </div>
                    }
                </div>
            </div>

            <div className="skills">
                <h3>Compétences :</h3>
                {
                    editMode &&
                    <>
                        <input id='addCompetence' placeholder='Ajouter une compétence' type="text" />
                        <button className="btn btn-primary-icon" onClick={
                            () => {
                                setActualFiche({
                                    ...actualFiche,
                                    skills: [...actualFiche.skills, document.getElementById('addCompetence').value]
                                })
                            }
                        }><FaPlus />Ajouter</button>
                    </>
                }
                <ul>
                    {
                        actualFiche.skills.map((item, index) => 
                            <li key={index}>
                                {
                                    item.includes('@') &&
                                        <h4 style={{color: 'blue'}}>{item.replace(/@/g, '')}</h4>
                                }
                                {
                                    !item.includes('@') &&
                                        <h4>{item.replace(/@/g, '')}</h4>
                                }
                                {
                                    editMode &&
                                        <MdDelete className="delete" onClick={
                                            () => {
                                                setActualFiche({
                                                    ...actualFiche,
                                                    skills: actualFiche.skills.filter((item, index2) => index2 !== index)
                                                })
                                            }
                                        }/>
                                }
                            </li>
                        )
                        
                    }
                </ul>
            </div>

            <div className="skills">
                <h3>Items :</h3>
                {
                    editMode &&
                    <>
                        <input id='addSkills' placeholder='Ajouter un item' type="text"  />
                        <button className="btn btn-primary-icon"
                        onClick={
                            () => {
                                setActualFiche({
                                    ...actualFiche,
                                    items: [...actualFiche.items, document.getElementById('addSkills').value]
                                })
                            }
                        }><FaPlus />Ajouter</button>
                    </>
                }
                <ul>
                    {
                        actualFiche.items.map((item, index) => 
                            <li key={index}>
                                {
                                    item.includes('@') &&
                                        <h4 style={{color: 'blue'}}>{item.replace(/@/g, '')}</h4>
                                }
                                {
                                    !item.includes('@') &&
                                        <h4>{item.replace(/@/g, '')}</h4>
                                }
                                {
                                    editMode &&
                                        <MdDelete className="delete" onClick={
                                            () => {
                                                setActualFiche({
                                                    ...actualFiche,
                                                    items: actualFiche.items.filter((item, index2) => index2 !== index)
                                                })
                                            }
                                        }/>
                                }
                            </li>
                        )
                        
                    }
                </ul>
            </div>
                    



        </div>
    );
}

export default Fiche;
