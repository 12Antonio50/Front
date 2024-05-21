import React, { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { TbUserShield } from "react-icons/tb";
import useAgregarUsuarioNuevo from "../../Vistas/Usuarios/Function/AgregarUsuarioNuevo";
import Cookies from "js-cookie";

const AccesoUsuario = () => {
    const {
        manejarCambioInput,
        enviarFormulario,
        limpiarFormulario,
        valorFormulario,
        mostrarAlerta,
        mensajeAlerta,
    } = useAgregarUsuarioNuevo();

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

    const renderizarOpcion = () => {
        if (usuarioRol !== 'AP') {
            return (
                <option value="A">Administrador</option>
            );
        }
    }

    return (
        <>

            <li className="nav-item d-flex align-items-center my-2">
                <TbUserShield style={estiloIcon} />
                <button style={estiloBTN} onClick={abrirModal}>Usuarios</button>
            </li>
            <Modal
                backdrop="static"
                show={modal}
                onHide={cerrarModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Registrar usuario</Modal.Title>
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
                    <Form.Label>Apellido paterno</Form.Label>
                    <Form.Control
                        type="text"
                        id="Apellido_paterno"
                        name="Apellido_paterno"
                        value={valorFormulario.Apellido_paterno}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Apellido materno</Form.Label>
                    <Form.Control
                        type="text"
                        id="Apellido_materno"
                        name="Apellido_materno"
                        value={valorFormulario.Apellido_materno}
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
                    <Form.Select
                        id="Area"
                        name="Area"
                        value={valorFormulario.Area}
                        onChange={manejarCambioInput}
                    >
                        <option>Selecciona una área</option>
                        <option value="A">Administración</option>
                        <option value="C">Contaduría</option>
                    </Form.Select>
                    <br />
                    <br />
                    <Form.Select
                        id="Rol"
                        name="Rol"
                        value={valorFormulario.Rol}
                        onChange={manejarCambioInput}
                    >
                        <option>Selecciona un rol</option>
                        {renderizarOpcion()}
                        <option value="AP">Administrador de apoyo</option>
                        <option value="D">Docente</option>
                    </Form.Select>
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

export default AccesoUsuario;