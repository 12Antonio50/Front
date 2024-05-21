import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdDeleteForever } from "react-icons/md";
import { BsFillSave2Fill } from "react-icons/bs";
import { Form } from "react-bootstrap";
import useAgregarPublicoNuevo from "./Function/useAgregarPublicoNuevo";

const RegistrarPublico = () => {
    const {
        manejarCambioInput,
        enviarFormulario,
        limpiarFormulario,
        valorFormulario,
        mostrarAlerta,
        mensajeAlerta,
    } = useAgregarPublicoNuevo();


    const estiloBTN = {
        border: "none",
        color: "#FFFFFF",
        borderRadio: "5px",
    }


    const estiloCard = {
        border: "none",
        color: "#FFFFFF"
    }

    return (
        <>
            <div className="card h-100">
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-header d-flex justify-content-center">
                    <h5 className="card-title">Registrar público</h5>
                </div>
                <div className="card-body">

                    <Form.Label>Nombre(s)</Form.Label>
                    <Form.Control
                        type="text"
                        id="Nombre"
                        name="Nombre"
                        value={valorFormulario.Nombre}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        type="email"
                        id="Correo"
                        name="Correo"
                        value={valorFormulario.Correo}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <br />
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="text"
                        id="Telefono"
                        name="Telefono"
                        value={valorFormulario.Telefono}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Celular</Form.Label>
                    <Form.Control
                        type="text"
                        id="Celular"
                        name="Celular"
                        value={valorFormulario.Celular}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    {mostrarAlerta && (
                        <div className="contenedor-alerta">
                            <div className="mensaje-alerta">{mensajeAlerta}</div>
                        </div>
                    )}
                    
                </div>
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-footer d-flex justify-content-between">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="edit-tooltip">Guardar</Tooltip>}
                    >
                        <button
                            className="btn d-flex align-items-center justify-content-center"
                            style={{ ...estiloBTN, background: '#0F1F38' }}
                            onClick={enviarFormulario}
                        >
                            <BsFillSave2Fill />
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="delete-tooltip">Cancelar</Tooltip>}
                    >
                        <button
                            className="btn d-flex align-items-center justify-content-center"
                            style={{ ...estiloBTN, background: '#0F1F38' }}
                            onClick={limpiarFormulario}
                        >
                            <MdDeleteForever />
                        </button>
                    </OverlayTrigger>
                </div>
            </div>
        </>
    );
}

export default RegistrarPublico;