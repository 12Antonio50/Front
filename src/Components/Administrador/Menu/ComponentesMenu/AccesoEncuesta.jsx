import React, { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { LuClipboardList } from "react-icons/lu";
import useAccesoEncuesta from "./Functions/useAccesoEncuesta";

const AccesoEncuesta = () => {
    const {
        preguntas,
        seleccionarOpcion
    } = useAccesoEncuesta();

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
                <LuClipboardList style={estiloIcon} />
                <button style={estiloBTN} onClick={abrirModal}>Encuestas</button>
            </li>
            <Modal
                backdrop="static"
                show={modal}
                onHide={cerrarModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear encuesta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" />
                    <br />
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={1} />
                    <br />
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                    />
                    <br />
                    <Form.Label>Selecciona una de las opciones que esta cargadas</Form.Label>
                    <br />
                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" className="me-2 w-100" onClick={() => seleccionarOpcion('opcion1')}>Opción 1</Button>
                        <Button variant="secondary" className="me-2 w-100" onClick={() => seleccionarOpcion('opcion2')}>Opción 2</Button>
                        <Button variant="secondary" className="me-2 w-100" onClick={() => seleccionarOpcion('opcion3')}>Opción 3</Button>
                    </div>
                    <br />
                    <br />
                    {preguntas.length > 0 && preguntas}
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between" >
                    <Button
                        style={estiloBTNModal}
                        onClick={cerrarModal}
                    >
                        Cancelar</Button>
                    <Button style={estiloBTNModalCorrecto}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AccesoEncuesta;