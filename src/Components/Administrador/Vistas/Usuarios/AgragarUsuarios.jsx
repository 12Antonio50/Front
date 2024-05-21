import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdDeleteForever } from "react-icons/md";
import { BsFillSave2Fill } from "react-icons/bs";
import { Form } from "react-bootstrap";
import useAgregarUsuarioNuevo from "./Function/AgregarUsuarioNuevo";
import Cookies from "js-cookie";

const AgregarUsuarios = () => {
    const {
        manejarCambioInput,
        enviarFormulario,
        limpiarFormulario,
        valorFormulario,
        mostrarAlerta,
        mensajeAlerta,
    } = useAgregarUsuarioNuevo();


    const estiloBTN = {
        border: "none",
        color: "#FFFFFF",
        borderRadio: "5px",
    }

    const estiloCard = {
        border: "none",
        color: "#FFFFFF"
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
            <div className="card h-100">
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-header d-flex justify-content-center">
                    <h5 className="card-title">Registrar usuario</h5>
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

export default AgregarUsuarios;