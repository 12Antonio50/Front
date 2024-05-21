import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { PiCheckCircleDuotone } from "react-icons/pi";
import { PiCircleDashed } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { Form, Pagination, Modal, Button, Accordion } from 'react-bootstrap';
import useObtenerCursosActivo from "./Function/useObtenerCursosActivos";
import Cookies from "js-cookie";

const ObtenerCursosActivos = () => {
    const {
        mostrarAlerta,
        mensajeAlerta,
        cursoSeleccionado,
        valorFormulario,
        busqueda,
        modalVisible,
        paginaActual,
        cursosFiltrados,
        indiceUltimoElemento,
        indicePrimerElemento,
        totalPaginas,
        usuariosDocente,
        usuarioSeleccionado,
        manejarCambioPagina,
        accionBoton,
        cerrarModal,
        manejarSeleccionCurso,
        manejarCambioInput,
        limpiarFormulario,
        abrirModal,
        setBusqueda,
        manejarSeleccionUsuario,
        vincularCurso
    } = useObtenerCursosActivo();

    const estiloBTN = {
        border: "none",
        color: "#FFFFFF",
        borderRadio: "5px",
    }

    const estiloCard = {
        border: "none",
        color: "#FFFFFF"
    }

    const estiloBTNModal = {
        background: "#F55449",
        border: "none"
    }

    const usuarioRol = Cookies.get('rol');

    const renderizarOpcion2 = () => {
        if (usuarioRol !== 'AP') {
            return (
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
            );
        }
    }

    return (
        <>
            <div className="card h-100">
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-header d-flex justify-content-center">
                    <h5 className="card-title">Cursos activos</h5>
                </div>
                <div className="card-body" style={{ overflow: 'auto' }}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar curso activo"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Curso</th>
                                <th scope="col">Área</th>
                                <th scope="col">Creador</th>
                                <th scope="col">Duración</th>
                                <th scope="col">Inicio y fin</th>
                                <th scope="col">Disponible</th>
                                <th scope="col">Encuestas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cursosFiltrados.length > 0 ? (
                                cursosFiltrados.slice(indicePrimerElemento, indiceUltimoElemento).map((curso, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => manejarSeleccionCurso(curso)}
                                        style={{ cursor: "pointer", backgroundColor: curso === cursoSeleccionado ? '#0F1F38' : 'transparent', color: curso === cursoSeleccionado ? '#FFFFFF' : '#000' }}
                                    >
                                        <td>{curso.curso}</td>
                                        <td>
                                            {curso.area === 'A' ? 'Administración' :
                                                curso.area === 'C' ? 'Contaduría' :
                                                    curso.area}
                                        </td>
                                        <td>{curso.creador}</td>
                                        <td>{curso.duracion}</td>
                                        <td>{`${curso.inicio} - ${curso.fin}`}</td>
                                        <td>{curso.disponible ? <PiCheckCircleDuotone style={{ color: "green" }} /> : <PiCircleDashed style={{ color: "black" }} />}</td>
                                        <td>{curso.encuestas.join(', ')}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No se encontraron cursos.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center aling-items-center">
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
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-footer d-flex justify-content-center">
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
                </div>
            </div>
            <Modal show={modalVisible} onHide={cerrarModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Editar curso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Curso</Form.Label>
                    <Form.Control
                        type="text"
                        id="CursoCambio"
                        name="CursoCambio"
                        value={valorFormulario.CursoCambio}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    {renderizarOpcion2()}
                    <br />
                    <Form.Label>Creador</Form.Label>
                    <Form.Control
                        type="text"
                        id="Creador"
                        name="Creador"
                        value={valorFormulario.Creador}
                        onChange={manejarCambioInput}
                    />
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
                    <Form.Label>Fin</Form.Label>
                    <Form.Control
                        type="date"
                        id="Fin"
                        name="Fin"
                        value={valorFormulario.Fin}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Encuestas</Form.Label>
                    <Form>
                        {cursoSeleccionado && cursoSeleccionado.encuestas && (
                            cursoSeleccionado.encuestas.map((encuesta, index) => (
                                <Form.Check
                                    key={index}
                                    type="checkbox"
                                    id={`encuesta-${index}`}
                                    label={encuesta}
                                />
                            ))
                        )}
                    </Form>
                    <br />
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Vincular curso</Accordion.Header>
                            <Accordion.Body>
                                {usuariosDocente.length > 0 ? (
                                    <Form>
                                        {usuariosDocente.map((usuario, index) => (
                                            <Form.Check
                                                key={index}
                                                type="checkbox"
                                                id={`usuario-${index}`}
                                                label={`${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`}
                                                value={usuario.correo}
                                                checked={usuarioSeleccionado && usuarioSeleccionado.includes(usuario.correo)}
                                                onChange={(e) => manejarSeleccionUsuario(e.target.value)}
                                            />
                                        ))}
                                    </Form>
                                ) : (
                                    <p>No hay usuarios docentes disponibles.</p>
                                )}
                                <br />
                                <Button className="w-100" onClick={vincularCurso}>Vincular</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between align-items-center">
                    <Button style={estiloBTNModal} variant="secondary" onClick={limpiarFormulario}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={accionBoton}
                    >
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ObtenerCursosActivos;