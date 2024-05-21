import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Form, Pagination, Modal, Button } from "react-bootstrap";
import useUsuariosDeDocente from "./Function/UsuariosDeDocente";
import Cookies from "js-cookie";

const UsuariosDocente = () => {
    const {
        mostrarAlerta,
        mensajeAlerta,
        usuarioSeleccionado,
        valorFormulario,
        totalPaginasDocente,
        modalVisible,
        paginaActualDocente,
        checkboxSeleccionados,
        busqueda,
        usuarioFiltrados,
        indiceUltimoElementoDocente,
        indicePrimerElementoDocente,
        setBusqueda,
        manejarSeleccionUsuario,
        eliminarUsuario,
        manejarCambioInput,
        limpiarFormulario,
        manejarCambioPaginaDocente,
        abrirModal,
        accionBoton,
        cerrarModal,
        setCheckboxSeleccionados
    } = useUsuariosDeDocente();

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
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="delete-tooltip">Eliminar</Tooltip>}
                >
                    <button
                        className="btn d-flex align-items-center justify-content-center"
                        style={{ ...estiloBTN, background: '#0F1F38' }}
                        onClick={eliminarUsuario}
                    >
                        <MdDeleteForever />
                    </button>
                </OverlayTrigger>
            );
        }
    }

    const renderizarOpcionEliminar2 = () => {
        if (usuarioRol !== 'AP') {
            return (
                <>
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
                </>
            );
        }
    }

    return (
        <>
            <div className="card">
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-header d-flex aling-items-center justify-content-center">
                    <h5 className="card-title">Docentes</h5>
                </div>
                <div className="card-body" style={{ overflow: 'auto' }}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar docente"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Correo</th>
                                <th scope="col">Nombre(S)</th>
                                <th scope="col">Apellido Paterno</th>
                                <th scope="col">Apellido materno</th>
                                <th scope="col">Área</th>
                                <th scope="col">Cursos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarioFiltrados.length > 0 ? (
                                usuarioFiltrados.slice(indicePrimerElementoDocente, indiceUltimoElementoDocente).map((usuario, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => manejarSeleccionUsuario(usuario)}
                                        style={{ backgroundColor: usuario === usuarioSeleccionado ? '#0F1F38' : 'transparent', color: usuario === usuarioSeleccionado ? '#FFFFFF' : '#000' }}
                                    >
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido_paterno}</td>
                                        <td>{usuario.apellido_materno}</td>
                                        <td>{usuario.correo}</td>
                                        <td>
                                            {usuario.area === 'A' ? 'Administración' :
                                                usuario.area === 'C' ? 'Contaduría' :
                                                    usuario.area}
                                        </td>
                                        <td>{usuario.cursos.join(', ')}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No se encontraron docentes registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center aling-items-center">
                        <Pagination>
                            <Pagination.First onClick={() => manejarCambioPaginaDocente(1)} disabled={totalPaginasDocente === 1} />
                            <Pagination.Prev onClick={() => manejarCambioPaginaDocente(totalPaginasDocente - 1)} disabled={totalPaginasDocente === 1} />
                            {[...Array(totalPaginasDocente)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={totalPaginasDocente === index + 1}
                                    onClick={() => manejarCambioPaginaDocente(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}

                            <Pagination.Next onClick={() => manejarCambioPaginaDocente(totalPaginasDocente + 1)} disabled={paginaActualDocente === totalPaginasDocente} />
                            <Pagination.Last onClick={() => manejarCambioPaginaDocente(totalPaginasDocente)} disabled={paginaActualDocente === totalPaginasDocente} />
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
                        <button onClick={abrirModal} className="btn d-flex align-items-center justify-content-center" style={{ ...estiloBTN, background: '#0F1F38' }}>
                            <FaEdit />
                        </button>
                    </OverlayTrigger>
                    {renderizarOpcionEliminar()}
                </div>
            </div>
            <Modal show={modalVisible} onHide={cerrarModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Editar docente</Modal.Title>
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
                    {renderizarOpcionEliminar2()}
                    <br />
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        type="text"
                        id="CorreoCambio"
                        name="CorreoCambio"
                        value={valorFormulario.CorreoCambio}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Cursos</Form.Label>
                    <Form>
                        {usuarioSeleccionado && usuarioSeleccionado.cursos && (
                            usuarioSeleccionado.cursos.map((curso, index) => (
                                <Form.Check
                                    key={index}
                                    type="checkbox"
                                    id={`cursos-${index}`}
                                    label={curso}
                                    checked={checkboxSeleccionados.includes(curso)}
                                    onChange={() => {
                                        if (checkboxSeleccionados.includes(curso)) {
                                            setCheckboxSeleccionados(prevState => prevState.filter(item => item !== curso));
                                        } else {
                                            setCheckboxSeleccionados(prevState => [...prevState, curso]);
                                        }
                                    }}
                                />
                            ))
                        )}
                    </Form>

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

export default UsuariosDocente;