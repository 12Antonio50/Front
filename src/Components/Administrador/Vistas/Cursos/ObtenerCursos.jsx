import React from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdDeleteForever } from "react-icons/md";
import { PiCheckCircleDuotone } from "react-icons/pi";
import { PiCircleDashed } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { Form, Pagination, Modal, Button, Accordion } from 'react-bootstrap';
import useObtenerCursos from "./Function/useObtenerCursos";
import Cookies from "js-cookie";

const ObtenerCursos = () => {
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
        checkboxSeleccionados,
        usuarioSeleccionado,
        paginaActualUsuario,
        usuariosActuales,
        totalPaginasUsuario,
        usuariosVinculados,
        modalAbierto,
        encuestaSeleccionada,
        urlSeleccionada,
        desvincularAlumno,
        manejarCambioPaginaUsuario,
        manejarCambioPagina,
        accionBoton,
        cerrarModal,
        manejarSeleccionCurso,
        eliminarCurso,
        manejarCambioInput,
        limpiarFormulario,
        abrirModal,
        setBusqueda,
        setCheckboxSeleccionados,
        desvincularEncuesta,
        accionCerrar,
        manejarSeleccionUsuario,
        enviarEncuesta,
        abrirModal1,
        cerrarModal1
    } = useObtenerCursos();

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

    const estiloBTNModalSend = {
        background: "#0F1F38",
        border: "none",
        width: "100%"
    }

    const usuarioRol = Cookies.get('rol');

    const renderizarOpcion = () => {
        if (usuarioRol !== 'AP') {
            return (
                <>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="delete-tooltip">Eliminar</Tooltip>}
                    >
                        <button
                            className="btn d-flex align-items-center justify-content-center"
                            style={{ ...estiloBTN, background: '#0F1F38' }}
                            onClick={eliminarCurso}
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
            <div className="card h-100">
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-header d-flex justify-content-center">
                    <h5 className="card-title">Listas de cursos</h5>
                </div>
                <div className="card-body" style={{ overflow: 'auto' }}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar curso"
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
                                <th scope="col">Alumnos</th>
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
                                        <td>
                                            {curso.encuestas.map((encuesta, index) => (
                                                <span key={index}>
                                                    {encuesta}
                                                    {index !== curso.encuestas.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </td>
                                        <td>{curso.publico.length}</td>
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
            {modalAbierto && (
                <Modal show={modalAbierto} onHide={cerrarModal1} size="fullscreen">
                    <Modal.Header closeButton>
                        <Modal.Title>{encuestaSeleccionada}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {urlSeleccionada && <iframe src={urlSeleccionada} title="Encuesta" width="100%" height="100%" style={{ border: "none" }} />}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="w-100" style={estiloBTNModalSend} onClick={enviarEncuesta}>Enviar encuesta</Button>
                    </Modal.Footer>
                </Modal>
            )}

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
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Enviar encuesta</Accordion.Header>
                            <Accordion.Body>
                                <ol>
                                    {cursoSeleccionado && cursoSeleccionado.encuestas.map((encuesta, index) => (
                                        <li key={index}>
                                            <Link to="#" onClick={() => abrirModal1(encuesta)}>
                                                {encuesta}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Desvincular encuestas</Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    {cursoSeleccionado && cursoSeleccionado.encuestas && (
                                        cursoSeleccionado.encuestas.map((encuesta, index) => (
                                            <Form.Check
                                                key={index}
                                                type="checkbox"
                                                id={`cursos-${index}`}
                                                label={encuesta}
                                                checked={checkboxSeleccionados.includes(encuesta)}
                                                onChange={() => {
                                                    if (checkboxSeleccionados.includes(encuesta)) {
                                                        setCheckboxSeleccionados(prevState => prevState.filter(item => item !== encuesta));
                                                    } else {
                                                        setCheckboxSeleccionados(prevState => [...prevState, encuesta]);
                                                    }
                                                }}
                                            />
                                        ))
                                    )}
                                </Form>
                                <br />
                                <Button className="w-100" onClick={desvincularEncuesta}>Desvincular encuesta</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Agregar alumnos</Accordion.Header>
                            <Accordion.Body>
                                {usuariosActuales.length > 0 ? (
                                    <Form>
                                        {usuariosActuales.map((usuario, index) => (
                                            <Form.Check
                                                key={index}
                                                type="checkbox"
                                                id={`usuario-${index}`}
                                                label={`${usuario.nombre}`}
                                                value={usuario.nombre}
                                                checked={usuarioSeleccionado && usuarioSeleccionado.includes(usuario.nombre)}
                                                onChange={(e) => manejarSeleccionUsuario(e.target.value)}
                                            />
                                        ))}
                                    </Form>
                                ) : (
                                    <p>No hay usuarios de apoyo disponibles.</p>
                                )}
                                <br />
                                <Button className="w-100" onClick={accionCerrar}>Vincular</Button>
                                <br />
                                <br />
                                <div className="d-flex justify-content-center aling-items-center">
                                    <Pagination>
                                        <Pagination.First onClick={() => manejarCambioPaginaUsuario(1)} disabled={paginaActualUsuario === 1} />
                                        <Pagination.Prev onClick={() => manejarCambioPaginaUsuario(paginaActualUsuario - 1)} disabled={paginaActualUsuario === 1} />
                                        {[...Array(totalPaginasUsuario)].map((_, index) => (
                                            <Pagination.Item
                                                key={index + 1}
                                                active={paginaActualUsuario === index + 1}
                                                onClick={() => manejarCambioPaginaUsuario(index + 1)}
                                            >
                                                {index + 1}
                                            </Pagination.Item>
                                        ))}
                                        <Pagination.Next onClick={() => manejarCambioPaginaUsuario(paginaActualUsuario + 1)} disabled={paginaActualUsuario === totalPaginasUsuario} />
                                        <Pagination.Last onClick={() => manejarCambioPaginaUsuario(totalPaginasUsuario)} disabled={paginaActualUsuario === totalPaginasUsuario} />
                                    </Pagination>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Desvincular Alumno</Accordion.Header>
                            <Accordion.Body>
                                <Form>
                                    <Form.Check
                                        type="checkbox"
                                        id="seleccionar-todos-desvincular"
                                        label="Seleccionar todos"
                                        checked={checkboxSeleccionados.length === usuariosVinculados.length}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            if (isChecked) {
                                                setCheckboxSeleccionados(usuariosVinculados.map(usuario => usuario));
                                            } else {
                                                setCheckboxSeleccionados([]);
                                            }
                                        }}
                                    />
                                    {usuariosVinculados.length > 0 ? (
                                        <>
                                            {usuariosVinculados.map((usuario, index) => (
                                                <Form.Check
                                                    key={index}
                                                    type="checkbox"
                                                    id={`usuario-${index}`}
                                                    label={`${usuario}`}
                                                    value={usuario}
                                                    checked={checkboxSeleccionados.includes(usuario)}
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        let nuevoEstado;
                                                        if (isChecked) {
                                                            nuevoEstado = [...checkboxSeleccionados, usuario];
                                                        } else {
                                                            nuevoEstado = checkboxSeleccionados.filter(selectedUser => selectedUser !== usuario);
                                                        }
                                                        setCheckboxSeleccionados(nuevoEstado);
                                                    }}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <p>No hay usuarios de apoyo disponibles.</p>
                                    )}
                                </Form>
                                <br />
                                <Button className="w-100" onClick={desvincularAlumno}>Desvincular</Button>
                                <br />
                                <br />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <br />
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

export default ObtenerCursos;