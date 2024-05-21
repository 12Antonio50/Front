import React from "react";
import Menu from "../Menu/Menu";
import { Accordion } from 'react-bootstrap';
import ObtenerEncuestas from "./Encuestas/ObtenerEncuestas";
import CrearEncuestas from "./Encuestas/CrearEncuesta";
import Respuestas from "./Encuestas/Respuestas";

const Encuestas = () => {

    const estiloContenedor = {
        background: "#0F1F38",
        color: "#FFFFFF",
        padding: "10px"
    }

    return (
        <>
            <Menu />
            <div>
                <h2 className="text-center mb-4" style={estiloContenedor}>Administrar encuestas</h2>
            </div>
            <div className="container-fluid my-5">
                <div className="row justify-content-center my-3">
                    <div className="col-md-10 mb-3">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Crear encuesta</Accordion.Header>
                                <Accordion.Body>
                                    <CrearEncuestas />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className="col-md-10 mb-3">
                        <ObtenerEncuestas />
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-center mb-4" style={estiloContenedor}>Respuestas</h2>
            </div>
            <div className="container-fluid my-5">
                <div className="row justify-content-center my-3">
                    <div className="col-md-10 mb-3">
                        <Respuestas />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Encuestas;
