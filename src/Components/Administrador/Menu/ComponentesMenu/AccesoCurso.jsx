import React, { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { CiViewList } from "react-icons/ci";
import useCrearCurso from "../../Vistas/Cursos/Function/useCrearCurso";
import Cookies from "js-cookie";

const AccesoCurso = () => {
    const {
        manejarCambioInput,
        enviarFormulario,
        limpiarFormulario,
        valorFormulario,
        mostrarAlerta,
        mensajeAlerta,
    } = useCrearCurso();

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

    const usuarioRol = Cookies.get('rol');
    const usuarioArea = Cookies.get('area');

    const renderizarOpcion = () => {
        if (usuarioRol === 'AP' && usuarioArea === 'A') {
            return (
                <Form.Select
                    id="Area"
                    name="Area"
                    value={valorFormulario.Area}
                    onChange={manejarCambioInput}
                >
                    <option value="">Seleccione un área</option>
                    <option value="A">Administración</option>
                </Form.Select>
            );
        } else if (usuarioRol === 'AP' && usuarioArea === 'C') {
            return (
                <Form.Select
                    id="Area"
                    name="Area"
                    value={valorFormulario.Area}
                    onChange={manejarCambioInput}
                >
                    <option value="">Seleccione un área</option>
                    <option value="C">Contaduría</option>
                </Form.Select>
            );
        } else if (usuarioRol === 'A') {
            // Si el rol es "A", renderiza el Form.Select con las opciones estándar
            return (
                <Form.Select
                    id="Area"
                    name="Area"
                    value={valorFormulario.Area}
                    onChange={manejarCambioInput}
                >
                    <option value="">Seleccione un área</option>
                    <option value="A">Administración</option>
                    <option value="C">Contaduría</option>
                </Form.Select>
            );
        } else {
            return null;
        }
    }

    return (
        <>
            <li className="nav-item d-flex align-items-center my-2">
                <CiViewList style={estiloIcon} />
                <button style={estiloBTN} onClick={abrirModal}>Cursos</button>
            </li>
            <Modal
                backdrop="static"
                show={modal}
                onHide={cerrarModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Crear curso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        id="Curso"
                        name="Curso"
                        value={valorFormulario.Curso}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    {renderizarOpcion()}
                    <br />
                    <Form.Label>Duración</Form.Label>
                    <Form.Control
                        type="text"
                        id="Duracion"
                        name="Duracion"
                        value={valorFormulario.Duracion}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Inicio</Form.Label>
                    <Form.Control
                        type="date"
                        id="Inicio"
                        name="Inicio"
                        value={valorFormulario.Inicio}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Finaliza</Form.Label>
                    <Form.Control
                        type="date"
                        id="Fin"
                        name="Fin"
                        value={valorFormulario.Fin}
                        onChange={manejarCambioInput}
                    />
                    <br />
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
                        onClick={() => enviarFormulario()}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AccesoCurso;