import React from "react";
import ".././styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Login = () => {
    const [usuario, setUser] = useState({});
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();
        axios
            .post("http://localhost:8080/login", JSON.stringify(usuario))
            .then(({ data }) => {
                console.log("funciono login", data);
                window.localStorage.setItem(
                    "UserLoggedInfo",
                    JSON.stringify({
                        id: data.user.id,
                        username: data.user.username,
                        rol: data.user.rol,
                        token: data.token
                    })
                )
                let user = {
                    id: data.user.id,
                    username: data.user.username,
                    rol: data.user.rol,
                    token: data.token
                }
                console.log("USUARI00O LOG", user)
                axios.post("http://localhost:8080/logExist", JSON.stringify(user)).then(({ data }) => {
                    if (data) {
                        navigate("/");
                        return
                    }
                    if (user.rol === "ADMINISTRADOR") {
                        navigate("/");
                        return
                    }
                    navigate("/hall");
                }).catch((error) => {
                    console.log("Error memberLog", error);
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleChangeNombre(e) {
        setUser({ ...usuario, username: e.target.value });
    }

    function handleChangePassword(e) {
        setUser({ ...usuario, password: e.target.value });
    }

    return (
        <body>
            <div class="body"></div>
            <form method="POST" action="login" onSubmit={onSubmit}>
                <div class="grad"></div>
                <div class="header">
                    <div>
                        Calculador
                        <span>
                            <strong> Huella Ecologica</strong>
                        </span>
                    </div>
                </div>
                <br />
                <div class="login">
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        name="username"
                        autocomplete="off"
                        onChange={handleChangeNombre}
                    />
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        autocomplete="off"
                        onChange={handleChangePassword}
                    />
                    <input type="submit" value="Login" />
                    <br />
                    <p class="hrefRegister">Si no estas registrado.</p>
                    <Link to="/register">
                        <strong> Registrate! </strong>
                    </Link>
                </div>
            </form>
        </body>
    );
};
