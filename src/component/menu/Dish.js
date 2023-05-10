import React from "react"
import { Link } from "react-router-dom"
import { MdQrCode2, MdEdit, MdOutlineDeleteOutline, MdAdd } from "react-icons/md";
import { IoOptionsOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import Skeleton from '@mui/material/Skeleton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import './../../assets/sass/menu/dish.sass'



const options = [
    { value: 'salade', label: 'Salade' },
    { value: 'burger', label: 'Burger' },
    { value: 'pizza', label: 'Pizza' }
]

const Dish = () => {

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: "2vw",
        height: "1vw",
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: ".05vw",
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(1vw)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '1vw solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: ".9vw",
            height: ".9vw",
        },
        '& .MuiSwitch-track': {
            borderRadius: "2vw",
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    return (
        <main className="Dish">
            <div className="header-dish">
                <div className="title">
                    <div>
                        <h1>GESTION DES PRODUITS</h1>
                    </div>
                    <div className="menu-option">
                        <p className="active">Tout</p>
                        <p>Entrées</p>
                        <p>Grill</p>
                        <p>Boissons</p>
                        <p>Desserts</p>
                    </div>
                    <button><IoOptionsOutline />Gérer les Catégories</button>
                </div>
            </div>
            <div className="content">
                <div className="add item">
                    <MdAdd />Ajouter un menu
                </div>
                <div className="item">
                    <img src="https://res.cloudinary.com/drjp6uslw/image/upload/v1634566532/logos/yl7gjbtfzlquwn2lqfkl.png" alt="icon"/>
                    <div>
                        <h2>Salted Pasta</h2>
                        <h3>10.30€</h3>
                    </div>                        
                    <FormGroup className="switch">
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                            label=""
                        />
                    </FormGroup>
                    <button><BiEditAlt /><p>Modifier</p></button>
                </div>
                <div className="item">
                    <img src="https://res.cloudinary.com/drjp6uslw/image/upload/v1634566532/logos/yl7gjbtfzlquwn2lqfkl.png" alt="icon" />
                    <div>
                        <h2>Salted Pasta</h2>
                        <h3>10.30€</h3>
                    </div>
                    <FormGroup className="switch">
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                            label=""
                        />
                    </FormGroup>
                    <button><BiEditAlt /><p>Modifier</p></button>
                </div>
                <div className="item">
                    <img src="https://res.cloudinary.com/drjp6uslw/image/upload/v1634566532/logos/yl7gjbtfzlquwn2lqfkl.png" alt="icon" />
                    <div>
                        <h2>Salted Pasta</h2>
                        <h3>10.30€</h3>
                    </div>
                    <FormGroup className="switch">
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                            label=""
                        />
                    </FormGroup>
                    <button><BiEditAlt /><p>Modifier</p></button>
                </div>
                <div className="item">
                    <img src="https://res.cloudinary.com/drjp6uslw/image/upload/v1634566532/logos/yl7gjbtfzlquwn2lqfkl.png" alt="icon" />
                    <div>
                        <h2>Salted Pasta</h2>
                        <h3>10.30€</h3>
                    </div>
                    <FormGroup className="switch">
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                            label=""
                        />
                    </FormGroup>
                    <button><BiEditAlt /><p>Modifier</p></button>
                </div>
                <div className="item">
                    <img src="https://res.cloudinary.com/drjp6uslw/image/upload/v1634566532/logos/yl7gjbtfzlquwn2lqfkl.png" alt="icon" />
                    <div>
                        <h2>Salted Pasta</h2>
                        <h3>10.30€</h3>
                    </div>
                    <FormGroup className="switch">
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                            label=""
                        />
                    </FormGroup>
                    <button><BiEditAlt /><p>Modifier</p></button>
                </div>
                
                <Skeleton className="item" />
                <Skeleton className="item" />
            </div>
        </main>
    )
}

export default Dish