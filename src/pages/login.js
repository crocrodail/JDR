import React from "react"
import Recoil from 'recoil';
import { userState } from './../store/userStore';
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import logo from "./../assets/images/logo.svg"
import footer from "./../assets/images/footer.png"
import Request from "./../services/request";
import "./../assets/sass/login.sass"

const Login = () => {
    const [, setUser] = Recoil.useRecoilState(userState);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        Request(`${process.env.REACT_APP_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                } else {
                    console.log(res);
                    alert(res.error)
                }
            }
        );
    };
    return (
        <main>
            <div className="login">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Link to={"/"}><img src={logo} alt="Logo" / ></Link>
                    <h1>Connexion</h1>
                    <div className="form-group">
                        <label>
                            <input type="text" defaultValue="" placeholder="Nom" {...register("email")} />
                        </label>
                        <label>
                            <input type="password" placeholder="Mot de passe" {...register("password", { required: true })} />
                            {errors.password && <p className="error">Aucun mot de passe.</p>}
                        </label>
                    </div>
                    <div className="option">
                        <label>
                            <input type="checkbox" id="remember" />
                            <span>Se souvenir de moi</span>
                        </label>
                        <Link to="/menu/login">Mot de passe oublié ?</Link>
                    </div>
                    <input type="submit" value="OK"/>
                </form>
                <img src={footer} alt="footer" />
            </div>
        </main>
    )
}

export default Login
