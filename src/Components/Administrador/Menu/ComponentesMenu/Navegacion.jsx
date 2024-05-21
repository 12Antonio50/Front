import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

const Navegacion = () => {
    const estiloIcon = {
        color: "#FFFFFF"
    }

    return (
        <>
            <ul className="navbar-nav">
                <li className="nav-item d-flex align-items-center">
                    <FaList className="me-1" style={estiloIcon} />
                    <NavLink to="/curso" className="nav-link text-white">Cursos</NavLink>
                </li>
                <li className="nav-item d-flex align-items-center">
                    <MdDashboardCustomize className="me-1" style={estiloIcon} />
                    <NavLink to="/dashboard" className="nav-link text-white">Dashboard</NavLink>
                </li>
                <li className="nav-item d-flex align-items-center">
                    <FaClipboardList className="me-1" style={estiloIcon} />
                    <NavLink to="/encuestas" className="nav-link text-white">Encuestas</NavLink>
                </li>
                <li className="nav-item d-flex align-items-center">
                    <IoHomeSharp className="me-1" style={estiloIcon} />
                    <NavLink to="/inicio" className="nav-link text-white">Inicio</NavLink>
                </li>
                <li className="nav-item d-flex align-items-center">
                    <FaUsers className="me-1" style={estiloIcon} />
                    <NavLink to="/publico" className="nav-link text-white">Público</NavLink>
                </li>
                <li className="nav-item d-flex align-items-center">
                    <FaUserShield className="me-1" style={estiloIcon} />
                    <NavLink to="/usuario" className="nav-link text-white">Usuarios</NavLink>
                </li>
            </ul>
        </>
    );
};

export default Navegacion;