import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/Colegio-Mexicano.png";
import Cookie from "js-cookie";
import { IoLogOut } from "react-icons/io5";
import "../../Style.css"
import Cookies from "js-cookie";
import { FaChalkboardTeacher } from "react-icons/fa";

const Menu = () => {
    const nombre = Cookies.get("nombre");
    const apellido_paterno = Cookies.get("apellido_paterno");
    let rol = Cookies.get("rol");

    if (rol === "A") {
        rol = "Administrador";
    } else if (rol === "AP") {
        rol = "Administrador de apoyo";
    } else {
        rol = "Docente";
    }

    const handleSalir = () => {
        Cookie.remove("token");
        Cookie.remove("rol");
        Cookie.remove("area");
        Cookie.remove("correo");
        Cookie.remove("nombre");
        Cookie.remove("apellido_paterno")
        window.location.href = "/";
    };

    return (
        <>
            <div className="container-fluid">
            </div>
            <div className="col-12 col-lg-12  p-0">
                <nav className="navbar navbar-expand-lg border-bottom" style={{ background: '#537072', borderTop: '1px solid #ccc', border: "none" }}>
                    <div className="container-fluid">
                        <div className="d-flex align-items-center">
                            <img src={logo} alt="" style={{ width: '90px', height: '55px', marginRight: '10px' }} />
                            <div style={{ marginTop: '10px' }}>
                                <Link to="/inicio-docente" style={{ textDecoration: 'none' }}>
                                    <h2 className="titulo-1 mb-0" style={{ fontSize: '1.8rem', color: "#FFFFFF" }}>QUICKASSIT</h2>
                                </Link>
                            </div>
                        </div>
                        <div className="ms-auto d-flex align-items-center">
                            <div className="avatar-container position-relative">
                                <div className="avatar-img-container">
                                    <Link to="/configuracion_docente">
                                        <FaChalkboardTeacher style={{ color: "#FFFFFF", background: "#537072", width: '40px', height: '50px', marginRight: '10px' }} />
                                    </Link>
                                </div>
                                <div className="user-info ms-2">
                                    <p style={{ color: "#FFFFFF" }} className="mb-0">{nombre} {apellido_paterno}</p>
                                    <p style={{ color: "#FFFFFF" }} className="mb-0">{rol}</p>
                                </div>
                            </div>
                            <button onClick={handleSalir} className="btn btn-danger rounded-circle ms-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', background: "#2C4A52", border: "none" }}>
                                <div style={{ fontSize: '1.5rem' }} className="d-flex align-items-center justify-content-center">
                                    <IoLogOut />
                                </div>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Menu;