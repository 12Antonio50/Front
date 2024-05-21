import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/Colegio-Mexicano.png";
import { IoMdMenu } from "react-icons/io";
import Cookie from "js-cookie";
import { IoLogOut } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import "../../Style.css"
import AccesoCurso from "./ComponentesMenu/AccesoCurso";
import AccesoPublico from "./ComponentesMenu/AccesoPublico";
import AccesoUsuario from "./ComponentesMenu/AccesoUsuario";
import AccesoEncuesta from "./ComponentesMenu/AccesoEncuesta";
import Navegacion from "./ComponentesMenu/Navegacion";
import Cookies from "js-cookie";

const Menu = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const nombre = Cookies.get("nombre");
    const apellido_paterno = Cookies.get("apellido_paterno");
    let rol = Cookies.get("rol");

    if (rol === "A") {
        rol = "Administrador";
    } else {
        rol = "Administrador de apoyo";
    }

    const iconoUsuario = rol === 'Administrador' ? <RiAdminFill /> : <FaUser />;

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const handleSalir = () => {
        Cookie.remove("token");
        Cookie.remove("rol");
        Cookie.remove("area");
        Cookie.remove("correo");
        Cookie.remove("nombre");
        Cookie.remove("apellido_paterno")
        window.location.href = "/";
    };

    const estiloColumna = {
        background: "#0F1F38",
        border: "none",
    }

    const estiloNavegacion = {
        cursor: "none",
        color: "#AAAAAA",
        alingItem: "start"
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-1 d-none d-lg-block position-fixed vh-100 p-0" style={estiloColumna}>
                        <div className="navbar-brand d-flex flex-column justify-content-center align-items-center" style={{ borderBottom: '1px solid #000', width: '100%', }}>
                            <img className="logo-utc" src={logo} alt="Logo UTC" style={{ width: '90px', height: '55px', color: "#FFFFFF" }} />
                        </div>
                        <div style={estiloNavegacion} className="my-2">
                            <span>Navegación</span>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center my-2">
                            <Navegacion />
                        </div>
                        <div style={estiloNavegacion} className="my-2">
                            <span>Accesos directos</span>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center my-2">
                            <ul className="navbar-nav">
                                <AccesoCurso />
                                {/*<AccesoEncuesta /> */}
                                <AccesoPublico />
                                <AccesoUsuario />
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-lg-11 offset-lg-1 p-0">
                        <nav className="navbar navbar-expand-lg bg-white border-bottom" style={{ background: '#000', borderTop: '1px solid #ccc' }}>
                            <div className="container-fluid">
                                <div className="d-flex align-items-center">
                                    <h2 className="titulo-1 mb-0 me-3" style={{ marginTop: '10px', fontSize: '1.8rem', cursor: 'default' }}>QUICKASSIT</h2>
                                </div>
                                <div className="ms-auto d-flex align-items-center">
                                    <div className="avatar-container position-relative">
                                        <div className="avatar-img-container">
                                            <Link to="/configuracion">
                                                {React.cloneElement(iconoUsuario, {
                                                    style: {
                                                        color: "#0F1F38",
                                                        width: '40px',
                                                        height: '50px',
                                                        marginRight: '10px'
                                                    }
                                                })}
                                            </Link>

                                        </div>
                                        <div className="user-info ms-2">
                                            <p className="mb-0">{nombre} {apellido_paterno}</p>
                                            <p className="mb-0">{rol}</p>
                                        </div>
                                    </div>
                                    <button onClick={handleSalir} className="btn btn-danger rounded-circle ms-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: "#F55449" }}>
                                        <div style={{ fontSize: '1.5rem' }} className="d-flex align-items-center justify-content-center">
                                            <IoLogOut />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="col-12 col-lg-11 offset-lg-1 p-0">
                        <div className="col-12 d-lg-none">
                            <div className="menu-icon" onClick={toggleMenu} style={{ marginLeft: '10px' }}>
                                <IoMdMenu style={{ fontSize: '24px' }} />
                            </div>
                            <div className={`container-fluid mt-2 ${menuAbierto ? '' : 'd-none'}`} style={estiloColumna}>
                                <div className="container-fluid d-flex align-items-center justify-content-center flex-column">
                                    <div className="d-flex flex-column justify-content-center align-items-center my-2">
                                        <Navegacion />
                                    </div>
                                    <div style={estiloNavegacion} className="my-2">
                                        <span>Accesos directos</span>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center my-2">
                                        <ul className="navbar-nav">
                                            <AccesoCurso />
                                            {/*<AccesoEncuesta /> */}
                                            <AccesoPublico />
                                            <AccesoUsuario />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;