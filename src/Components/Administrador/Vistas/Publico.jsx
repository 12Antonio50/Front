import React from "react";
import Menu from "../Menu/Menu";
import RegistrarPublico from "./Publico/RegistrarPublico";
import TablaCSVPublico from "./Publico/TablaCSVPublico";
import ObtenerPublico from "./Publico/ObtenerPublico";

const Publico = () => {
    const estiloContenedor = {
        background: "#0F1F38",
        color: "#FFFFFF",
        padding: "10px"
    }

    return (
        <>
            <Menu />
            <div>
                <h2 className="text-center mb-4" style={estiloContenedor}>Agregar público</h2>
            </div>
            <div className="container-fluid my-5">
                <div className="row justify-content-center my-3">
                    <div className="col-md-7 mb-3">
                        <TablaCSVPublico />
                    </div>

                    <div className="col-md-3 mb-3">
                        <RegistrarPublico />
                    </div>
                </div>
            </div>
            <div>
            </div>
            <div>
                <h2 className="text-center mb-4" style={estiloContenedor}>Administrar público</h2>
            </div>
            <div className="container-fluid my-5">
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <ObtenerPublico />
                    </div>
                </div>
            </div>

        </>
    );
}

export default Publico;