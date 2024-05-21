import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Form, Pagination, Modal, Button } from "react-bootstrap";
import useObtenerPublico from "./Function/useObtenerPublico";
import Cookies from "js-cookie";

const ObtenerPublico = () => {
    const {
        mostrarAlerta,
        mensajeAlerta,
        usuarioSeleccionado,
        valorFormulario,
        modalVisible,
        paginaActual,
        totalPaginas,
        busqueda,
        publicoFiltrados,
        indiceUltimoElemento,
        indicePrimerElemento,
        setBusqueda,
        manejarSeleccionUsuario,
        eliminarUsuario,
        manejarCambioInput,
        limpiarFormulario,
        manejarCambioPagina,
        abrirModal,
        cerrarModal,
        accionBoton
    } = useObtenerPublico();

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

    const renderizarOpcion = () => {
        if (usuarioRol !== 'AP') {
            return (
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
            );
        }
    }

    return (
        <>
            <div className="card">
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-header d-flex align-items-center justify-content-center">
                    <h5 className="card-title">Público</h5>
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
                                <th scope="col">Teléfono</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Correo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {publicoFiltrados.length > 0 ? (
                                publicoFiltrados.slice(indicePrimerElemento, indiceUltimoElemento).map((usuario, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => manejarSeleccionUsuario(usuario)}
                                        style={{ backgroundColor: usuario === usuarioSeleccionado ? '#0F1F38' : 'transparent', color: usuario === usuarioSeleccionado ? '#FFFFFF' : '#000' }}
                                    >

                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.telefono}</td>
                                        <td>{usuario.celular}</td>
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
                    {renderizarOpcion()}
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
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        type="email"
                        id="CorreoCambio"
                        name="CorreoCambio"
                        value={valorFormulario.CorreoCambio}
                        onChange={manejarCambioInput}
                    />
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

export default ObtenerPublico;