import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Form, Pagination, Modal, Button } from "react-bootstrap";
import useUsuariosDeApoyo from "./Function/UsuariosDeApoyo";
import Cookies from "js-cookie";

const UsuariosApoyo = () => {
    const {
        mostrarAlerta,
        mensajeAlerta,
        usuarioSeleccionado,
        valorFormulario,
        modalVisible,
        totalPaginas,
        paginaActual,
        busqueda,
        usuarioFiltrados,
        indiceUltimoElemento,
        indicePrimerElemento,
        setBusqueda,
        abrirModal,
        cerrarModal,
        accionBoton,
        manejarSeleccionUsuario,
        eliminarUsuario,
        manejarCambioInput,
        limpiarFormulario,
        manejarCambioPagina
    } = useUsuariosDeApoyo();

    const estiloBTN = {
        border: "none",
        color: "#FFFFFF",
        borderRadio: "5px",
    };

    const estiloCard = {
        border: "none",
        color: "#FFFFFF"
    };

    const estiloBTNModal = {
        background: "#F55449",
        border: "none"
    }

    const estiloBTNModalCorrecto = {
        background: "#0F1F38",
        border: "none"
    }

    const usuarioRol = Cookies.get('rol');

    const renderizarOpcionEliminar = () => {
        if (usuarioRol !== 'AP') {
            return (
                <>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="edit-tooltip">Editar</Tooltip>}
                    >
                        <button
                            className="btn d-flex align-items-center justify-content-center"
                            style={{ ...estiloBTN, background: '#0F1F38' }}
                            onClick={abrirModal}
                        >
                            <FaEdit />
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="delete-tooltip">Eliminar</Tooltip>}
                    >
                        <button
                            onClick={eliminarUsuario}
                            className="btn d-flex align-items-center justify-content-center"
                            style={{ ...estiloBTN, background: '#0F1F38' }}
                        >
                            <MdDeleteForever />
                        </button>
                    </OverlayTrigger>
                </>
            );
        }
    }

    return (
        <>
            <div className="card">
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-header d-flex align-items-center justify-content-center">
                    <h5 className="card-title">Administradores de apoyo</h5>
                </div>
                <div className="card-body" style={{ overflow: 'auto' }}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar administrador de apoyo"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nombre(s)</th>
                                <th scope="col">Apellido Paterno</th>
                                <th scope="col">Apellido Materno</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Área</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarioFiltrados.length > 0 ? (
                                usuarioFiltrados.slice(indicePrimerElemento, indiceUltimoElemento).map((usuario, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => manejarSeleccionUsuario(usuario)}
                                        style={{ cursor: "pointer", backgroundColor: usuario === usuarioSeleccionado ? '#0F1F38' : 'transparent', color: usuario === usuarioSeleccionado ? '#FFFFFF' : '#000' }}
                                    >
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido_paterno}</td>
                                        <td>{usuario.apellido_materno}</td>
                                        <td>{usuario.correo}</td>
                                        <td>
                                            {usuario.area === 'A' ? 'Administración' : usuario.area === 'C' ? 'Contaduría' : usuario.area}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No se encontraron Administradores de apoyo.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center align-items-center">
                        <Pagination>
                            <Pagination.First onClick={() => manejarCambioPagina(1)} disabled={paginaActual === 1} />
                            <Pagination.Prev onClick={() => manejarCambioPagina(paginaActual - 1)} disabled={paginaActual === 1} />
                            {[...Array(totalPaginas)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={paginaActual === index + 1}
                                    onClick={() => manejarCambioPagina(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}

                            <Pagination.Next onClick={() => manejarCambioPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} />
                            <Pagination.Last onClick={() => manejarCambioPagina(totalPaginas)} disabled={paginaActual === totalPaginas} />
                        </Pagination>
                    </div>
                    {mostrarAlerta && (
                        <div className="contenedor-alerta">
                            <div className="mensaje-alerta">{mensajeAlerta}</div>
                        </div>
                    )}
                </div>
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-footer d-flex justify-content-between">
                    {renderizarOpcionEliminar()}
                </div>
            </div>
            <Modal show={modalVisible} onHide={cerrarModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Editar administrador de apoyo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Nombre</Form.Label>
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
                    <Form.Select
                        id="Rol"
                        name="Rol"
                        value={valorFormulario.Rol}
                        onChange={manejarCambioInput}
                    >
                        <option>Selecciona un rol</option>
                        <option value="A">Administrador</option>
                        <option value="AP">Administrador de apoyo</option>
                        <option value="D">Docente</option>
                    </Form.Select>
                    <br />
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        type="email"
                        id="Correo"
                        name="Correo"
                        value={valorFormulario.CorreoCambio}
                        onChange={manejarCambioInput}
                    />
                    <br />
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between align-items-center">
                    <Button
                        style={estiloBTNModal}
                        onClick={limpiarFormulario}
                    >
                        Cancelar
                    </Button>
                    <Button
                        style={estiloBTNModalCorrecto}
                        onClick={accionBoton}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UsuariosApoyo;