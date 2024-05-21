import React, { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { PiUsersThree } from "react-icons/pi";
import useAgregarPublicoNuevo from "../../Vistas/Publico/Function/useAgregarPublicoNuevo";

const AccesoPublico = () => {
    const {
        manejarCambioInput,
        enviarFormulario,
        limpiarFormulario,
        valorFormulario,
        mostrarAlerta,
        mensajeAlerta,
    } = useAgregarPublicoNuevo();

    const [modal, setModal] = useState(false);

    const cerrarModal = () => setModal(false);
    const abrirModal = () => setModal(true);

    const estiloIcon = {
        color: "#FFFFFF"
    }

    const estiloBTN = {
        background: "none",
        border: "none",
        color: "#FFFFFF"
    }

    const estiloBTNModal = {
        background: "#F55449",
        border: "none"
    }

    const estiloBTNModalCorrecto = {
        background: "#0F1F38",
        border: "none"
    }

    return (
        <>
            <li className="nav-item d-flex align-items-center my-2">
                <PiUsersThree style={estiloIcon} />
                <button style={estiloBTN} onClick={abrirModal}>Público</button>
            </li>
            <Modal
                backdrop="static"
                show={modal}
                onHide={cerrarModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Registrar público</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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

                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between" >
                    <Button
                        style={estiloBTNModal}
                        onClick={limpiarFormulario}
                    >
                        Cancelar</Button>
                    <Button
                        style={estiloBTNModalCorrecto}
                        onClick={enviarFormulario}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AccesoPublico;