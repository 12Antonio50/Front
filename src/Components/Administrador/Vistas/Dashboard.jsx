import React from "react";
import Menu from "../Menu/Menu";
import PublicoGrafica from "./Graficas/PublicoGrafica";
import EncuestasGrafica from "./Graficas/EncuestasGrafica";
import CursosGrafica from "./Graficas/CursosGrafica";
import EncuestasMesGrafica from "./Graficas/EncuestaMesGrafica";
import EncuestasPorcentajesGenerales from "./Graficas/RespuestasOpcionGrafica";
import RespuestasEscalaGrafica from "./Graficas/RespuestasEscalaGrafica"

const Dashboard = () => {
    return (
        <>
            <Menu />
            <div className="container-fluid ">
                <div className="row justify-content-center my-3">
                    <div className="col-md-5 mb-3">
                        <div className="card h-100">
                            <div className="card-header d-flex align-items-center justify-content-center">
                                <h5 className="card-title m-0">Alumnos registrados por mes</h5>
                            </div>
                            <div className="card-body">
                                <PublicoGrafica className="h-100" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 mb-3">
                        <div className="card h-100">
                            <div className="card-header d-flex align-items-center justify-content-center">
                                <h5 className="card-title m-0">Encuestas creadas por mes</h5>
                            </div>
                            <div className="card-body">
                                <EncuestasGrafica className="h-100" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 mb-3">
                        <div className="card h-100">
                            <div className="card-header d-flex align-items-center justify-content-center">
                                <h5 className="card-title m-0">Alumnos inscritos a cursos</h5>
                            </div>
                            <div className="card-body">
                                <CursosGrafica className="h-100" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 mb-3">
                        <div className="card h-100">
                            <div className="card-header d-flex align-items-center justify-content-center">
                                <h5 className="card-title m-0">Encuestas más contestadas</h5>
                            </div>
                            <div className="card-body">
                                <EncuestasMesGrafica className="h-100" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 mb-3">
                        <div className="card h-100">
                            <div className="card-header d-flex align-items-center justify-content-center">
                                <h5 className="card-title m-0">Porcentaje de respuestas de opciones múltiples seleccionadas</h5>
                            </div>
                            <div className="card-body">
                                <EncuestasPorcentajesGenerales className="h-100" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 mb-3">
                        <div className="card h-100">
                            <div className="card-header d-flex align-items-center justify-content-center">
                                <h5 className="card-title m-0">Promedio de respuestas de escalas numéricas seleccionadas</h5>
                            </div>
                            <div className="card-body">
                                <RespuestasEscalaGrafica className="h-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
