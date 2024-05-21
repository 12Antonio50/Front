import React from "react";
import Menu from "../Menu/Menu";
import CrearCurso from "./Cursos/CrearCurso";
import ObtenerCursos from "./Cursos/ObtenerCursos";
import ObtenerCursosActivos from "./Cursos/ObtenerCursosActivos";


const Cursos = () => {
    const estiloContenedor = {
        background: "#0F1F38",
        color: "#FFFFFF",
        padding: "10px"
    }

    return (
        <>
            <Menu />
            <div>
                <h2 className="text-center mb-4" style={estiloContenedor}>Administrar cursos</h2>
            </div>
            <div className="container-fluid my-5">
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <CrearCurso />
                    </div>
                </div>

                <div className="row justify-content-center my-3">
                    <div className="col-md-9">
                    <ObtenerCursos />
                    </div>

                    <div className="col-md-9 my-5">
                        <ObtenerCursosActivos />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cursos;