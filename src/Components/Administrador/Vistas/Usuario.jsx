import React from "react";
import Menu from "../Menu/Menu";
import TablaCSV from "./Usuarios/TablaCSV";
import AgregarUsuarios from "./Usuarios/AgragarUsuarios";
import UsuariosApoyo from "./Usuarios/UsuariosApoyo";
import UsuariosDocente from "./Usuarios/UsuariosDocente";

const Usuarios = () => {
    const estiloContenedor = {
        background: "#0F1F38",
        color: "#FFFFFF",
        padding: "10px"
    }

    return (
        <>
            <Menu />
            <div>
                <h2 className="text-center mb-4" style={estiloContenedor}>Agregar usuarios</h2>
            </div>
            <div className="container-fluid my-5">
                <div className="row justify-content-center my-3">
                    <div className="col-md-7 mb-3">
                        <TablaCSV />
                    </div>
                    <div className="col-md-3 mb-3">
                        <AgregarUsuarios />
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-center mb-4" style={estiloContenedor}>Administrar de usuarios</h2>
            </div>
            <div className="container-fluid my-5">
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <UsuariosApoyo />
                    </div>
                    <div className="col-md-9 mt-4">
                        <UsuariosDocente />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Usuarios;