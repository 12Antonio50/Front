import React, { useState, useEffect } from "react";
import Menu from "./Menu/Menu";
import EncuestasChart from "./Encuestas";
import AlumnosChart from "./Alumnos";
import PieChart from "./Pie";
import { FaUsers } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import useObtenerCursos from "../Administrador/Vistas/Cursos/Function/useObtenerCursos";
import useObtenerEncuestas from "../Administrador/Vistas/Encuestas/Functions/useObtenerEncuestas";
import useObtenerPublico from "../Administrador/Vistas/Publico/Function/useObtenerPublico";

const Inicio = () => {
    const { cursos } = useObtenerCursos();
    const { encuestas } = useObtenerEncuestas();
    const { usuariosApoyo } = useObtenerPublico();
    const [totalCursos, setTotalCursos] = useState([]);
    const [totalEncuestas, setTotalEncuestas] = useState([]);
    const [totalUsuarios, setTotalUsuarios] = useState([]);

    useEffect(() => {
        if (cursos !== undefined) {
            setTotalCursos(cursos);
        }
    }, [cursos]);

    useEffect(() => {
        if (encuestas !== undefined) {
            setTotalEncuestas(encuestas);
        }
    }, [encuestas]);

    useEffect(() => {
        if (usuariosApoyo !== undefined) {
            setTotalUsuarios(usuariosApoyo);
        }
    }, [usuariosApoyo]);

    // Obtener la fecha actual y la del mes pasado en formato UTC
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    lastMonthDate.setDate(1); // Establecer el día en 1 para obtener el primer día del mes pasado

    // Filtrar los cursos para obtener los del mes pasado
    const cursosMesPasado = totalCursos.filter(curso => {
        // Convertir la fecha de inicio del curso a un objeto Date
        const cursoDate = new Date(curso.inicio);

        // Obtener la fecha actual y el primer día del mes actual
        const currentDate = new Date();
        const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Obtener el primer día del mes pasado
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

        // Comparar si la fecha de inicio del curso está entre el primer día del mes pasado y el primer día de este mes
        const isInLastMonth = cursoDate >= lastMonth && cursoDate < firstDayOfCurrentMonth;

        return isInLastMonth;
    });

    const cursosMesActual = totalCursos.filter(curso => {
        const cursoDate = new Date(curso.inicio);
        return cursoDate.getMonth() === currentDate.getMonth();
    });

    const encuestaMesActual = totalEncuestas.filter(encuesta => {
        const encuestaDate = new Date(encuesta.fecha);
        return encuestaDate.getMonth() === currentDate.getMonth();
    });

    // Filtrar los cursos para obtener los del mes pasado
    const encuestaMesPasado = totalEncuestas.filter(encuesta => {
        // Convertir la fecha de inicio del curso a un objeto Date
        const encuestaDate = new Date(encuesta.fecha);

        // Obtener la fecha actual y el primer día del mes actual
        const currentDate = new Date();
        const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Obtener el primer día del mes pasado
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

        // Comparar si la fecha de inicio del curso está entre el primer día del mes pasado y el primer día de este mes
        const isInLastMonth = encuestaDate >= lastMonth && encuestaDate < firstDayOfCurrentMonth;

        return isInLastMonth;
    });

    const alumnoMesActual = totalUsuarios.filter(alumno => {
        const alumnoDate = new Date(alumno.fecha);
        return alumnoDate.getMonth() === currentDate.getMonth();
    });

    // Filtrar los cursos para obtener los del mes pasado
    const alumnoMesPasado = totalUsuarios.filter(alumno => {
        // Convertir la fecha de inicio del curso a un objeto Date
        const alumnoDate = new Date(alumno.fecha);

        // Obtener la fecha actual y el primer día del mes actual
        const currentDate = new Date();
        const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Obtener el primer día del mes pasado
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

        // Comparar si la fecha de inicio del curso está entre el primer día del mes pasado y el primer día de este mes
        const isInLastMonth = alumnoDate >= lastMonth && alumnoDate < firstDayOfCurrentMonth;

        return isInLastMonth;
    });

    const estiloCard = {
        border: "none",
        color: "#FFFFFF"
    }

    const estiloDIV = {
        display: "flex",
        flexDirection: "column",
        marginLeft: "10px",
        marginTop: "10px"
    }

    const estiloLinea = {
        borderTop: "3px solid #FFFFFF"
    }

    const estiloText = {
        marginBottom: "-10px",
        whiteSpace: "nowrap"
    }

    const estiloIcon = {
        fontSize: "40px"
    }

    const estiloContenedor = {
        background: "#0F1F38",
        color: "#FFFFFF",
        padding: "10px"
    }

    return (
        <>
            <Menu />
            <div>
                <h2 className="text-center mb-4" style={estiloContenedor}>Administración de Encuestas</h2>
            </div>
            <div className="container-fluid my-5">
                <div className="row justify-content-center">
                    <div className="col-md-3 mb-3">
                        <div style={{ ...estiloCard, background: "#8E7970" }} className="card">
                            <div className="card-body d-flex">
                                <FaList style={estiloIcon} />
                                <div style={estiloDIV}>
                                    <h5>Cursos</h5>
                                    <h6>{cursosMesActual.length} Creados</h6>
                                </div>
                            </div>
                            <div style={estiloLinea} className="card-footer d-flex justify-content-between aling-items-center">
                                <div style={estiloDIV}>
                                    <p className="card-text" style={estiloText}>Mes pasado</p>
                                    <p className="card-text">{cursosMesPasado.length} Creados</p>
                                </div>
                                <div style={estiloDIV}>
                                    <p className="card-text" style={estiloText}>Total de cursos</p>
                                    <p className="card-text">{totalCursos.length} Creados</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div style={{ ...estiloCard, background: "#F55449" }} className="card">
                            <div className="card-body d-flex">
                                <FaClipboardList style={estiloIcon} />
                                <div style={estiloDIV}>
                                    <h5>Encuestas</h5>
                                    <h6>{encuestaMesActual.length} Creadas</h6>
                                </div>
                            </div>
                            <div style={estiloLinea} className="card-footer d-flex justify-content-between aling-items-center">
                                <div style={estiloDIV}>
                                    <p className="card-text" style={estiloText}>Mes pasado</p>
                                    <p className="card-text">{encuestaMesPasado.length} Creadas</p>
                                </div>
                                <div style={estiloDIV}>
                                    <p className="card-text" style={estiloText}>Total de encuestas</p>
                                    <p className="card-text">{totalEncuestas.length} Creadas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3 ">
                        <div style={{ ...estiloCard, background: "#1B4B5A" }} className="card h-100">
                            <div className="card-body d-flex">
                                <FaUsers style={estiloIcon} />
                                <div style={estiloDIV}>
                                    <h5>Público</h5>
                                    <h6>{alumnoMesActual.length} Registrados</h6>
                                </div>
                            </div>
                            <div style={estiloLinea} className="card-footer d-flex justify-content-between aling-items-center h-100">
                            <div style={estiloDIV}>
                                    <p className="card-text" style={estiloText}>Mes pasado</p>
                                    <p className="card-text">{alumnoMesPasado.length} Registrados</p>
                                </div>
                                <div style={estiloDIV}>
                                    <p className="card-text" style={estiloText}>Total de alumnos</p>
                                    <p className="card-text">{totalUsuarios.length} Registrados</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center my-3">
                    <div className="col-md-9 mb-3">
                        <div className="card h-100">
                            <div style={{ ...estiloCard, background: '#F55449' }} className="card-header d-flex aling-items-center justify-content-center">
                                <h5 className="card-title">Gráfica de encuestas </h5>
                            </div>
                            <div className="card-body">
                                <EncuestasChart className="h-100" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="card h-100">
                            <div style={{ ...estiloCard, background: '#1B4B5A' }} className="card-header d-flex aling-items-center justify-content-center">
                                <h5 className="card-title">Gráfica del público </h5>
                            </div>
                            <div className="card-body">
                                <AlumnosChart className="h-100" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="card h-100">
                            <div style={{ ...estiloCard, background: '#8E7970' }} className="card-header d-flex aling-items-center justify-content-center">
                                <h5 className="card-title">Gráfica de cursos </h5>
                            </div>
                            <div className="card-body">
                                <PieChart className="h-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Inicio;