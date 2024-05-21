import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fondoImagen from "../../img/icon.png";
import { Alert } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ setUsuarioRol, setAutentificado }) => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState(null);
    const navigate = useNavigate();

    const iniciarSesion = (event) => {
        event.preventDefault();
        if (!correo || !password) {
            mostrarAlerta("Por favor, ingresa el correo electrónico y contraseña", "danger");
            return;
        }

        const datosDeUsuario = {
            correo: correo,
            password: password,
        };

        const url = `https://servidor-61h9.onrender.com/API/v1/auth/login-scquick`;

        axios
            .post(url, datosDeUsuario, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                const datos = response.data;

                if (datos.access) {
                    const tiempoExpiracion = 0.5; // Establece la duración de la cookie en días
                    Cookies.set("token", datos.access, { expires: tiempoExpiracion });

                    // Almacena otros datos en las cookies si están presentes en la respuesta
                    if (datos.existenciaUsuario && datos.existenciaUsuario.correo) {
                        Cookies.set("correo", datos.existenciaUsuario.correo, { expires: tiempoExpiracion });

                        if (datos.existenciaUsuario.area) {
                            Cookies.set("area", datos.existenciaUsuario.area, { expires: tiempoExpiracion });
                        }
                        if (datos.existenciaUsuario.nombre) {
                            Cookies.set("nombre", datos.existenciaUsuario.nombre, { expires: tiempoExpiracion });
                        }
                        if (datos.existenciaUsuario.apellido_paterno) {
                            Cookies.set("apellido_paterno", datos.existenciaUsuario.apellido_paterno, { expires: tiempoExpiracion });
                        }
                    }

                    const rol = datos.existenciaUsuario.rol;

                    // Almacena el rol en la cookie
                    Cookies.set("rol", rol, { expires: tiempoExpiracion });

                    // Actualiza el estado en el componente App
                    setUsuarioRol(rol);
                    setAutentificado(true);

                    // Redirige al usuario según su rol
                    if (rol === "A" || rol === "AP") {
                        navigate("/inicio");
                    } else if (rol === "D") {
                        navigate("/inicio-docente");
                    }
                } else {
                    mostrarAlerta(datos.msg, "danger");
                }
            })
            .catch((error) => {
                console.error(error);
                mostrarAlerta("Correo o contraseña incorrecta", "danger");
            });
    };

    //Función para mostrar los mensajes en alertas
    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mensaje, tipo });
        setTimeout(() => {
            setAlerta(null);
        }, 3000);
    };

    const estiloFondo = {
        backgroundImage: `url(${fondoImagen})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
    };

    const estiloColorSuperpuesto = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#0F1F38",
        opacity: 0.5,
    };

    const estiloInput = {
        background: "none",
        border: "none",
        borderBottom: "2px solid #FFFFFF",
        color: "#FFFFFF"
    };

    const estiloCardContenedor = {
        background: "#1B4B5A",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const estiloBTN = {
        backgroundColor: "#8E7970",
        border: "1px solid #8E7970",
        width: "200px",
        color: "#FFFFFF",
    };

    const estiloBtnURL = {
        border: "none",
        background: "none",
        color: "#8E7970",
        cursor: "pointer",
    };

    const estiloAlerta = {
        backgroundColor: "#F55449",
        color: "white",
        border: "1px solid #F55449",
        borderRadius: "5px",
        padding: "10px",
        marginTop: "10px"
    }

    return (
        <div className="container-fluid d-flex vh-100 p-0">
            <div className="row w-100 m-0">
                <div className="col-md-9 p-0">
                    <div style={estiloFondo}>
                        <div style={estiloColorSuperpuesto}></div>;
                    </div>
                </div>
                <div className="col-md-3 p-0">
                    <div className="container" style={estiloCardContenedor}>
                        <div className="container">
                            <div className=" mb-5">
                                <h1 style={{ color: "#F55449" }}>Inicio de sesión</h1>
                            </div>
                            <form>
                                <div className="mb-5">
                                    <input
                                        style={estiloInput}
                                        type="email"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="Correo electrónico"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        style={estiloInput}
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-5">
                                    <p style={{ color: "#FFFFFF" }}>¿Se te olvidó la contraseña?<Link to="/restablecer-contraseña" style={estiloBtnURL}>Restablecer contraseña</Link></p>
                                </div>
                                <div className="mb-5">
                                    <button
                                        style={estiloBTN}
                                        className="btn btn-primary my-3"
                                        onClick={iniciarSesion}
                                    >
                                        Entrar
                                    </button>
                                </div>
                            </form>
                            {alerta && <Alert variant={alerta.tipo} style={estiloAlerta}>{alerta.mensaje}</Alert>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
