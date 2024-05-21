import React from "react";
import { Form, Pagination, Modal, Button, Accordion } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import useObtenerEncuestas from "./Functions/useObtenerEncuestas";
import { PiCheckCircleDuotone } from "react-icons/pi";
import { PiCircleDashed } from "react-icons/pi";
import Cookies from "js-cookie";

const ObtenerEncuestas = () => {
    const {
        cursos,
        mostrarAlerta,
        mensajeAlerta,
        encuestaSeleccionada,
        valorFormulario,
        busqueda,
        modalVisible,
        paginaActual,
        encuestasFiltradas,
        indiceUltimoElemento,
        indicePrimerElemento,
        totalPaginas,
        cursoSeleccionado,
        manejarCambioPagina,
        accionBoton,
        cerrarModal,
        manejarSeleccionEncuesta,
        eliminarEncuesta,
        manejarCambioInput,
        limpiarFormulario,
        abrirModal,
        setBusqueda,
        manejarCambioPregunta,
        manejarCambioTab,
        accionCerrar,
        manejarSeleccionCurso
    } = useObtenerEncuestas();

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

    const renderizarOpcion = () => {
        if (usuarioRol !== 'AP') {
            return (
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="delete-tooltip">Eliminar</Tooltip>}
                >
                    <button
                        className="btn d-flex align-items-center justify-content-center"
                        style={{ ...estiloBTN, background: '#0F1F38' }}
                        onClick={eliminarEncuesta}
                    >
                        <MdDeleteForever />
                    </button>
                </OverlayTrigger>
            );
        }
    }

    return (
        <>
            <div className="card h-100">
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-header d-flex justify-content-center">
                    <h5 className="card-title">Encuestas</h5>
                </div>
                <div className="card-body" style={{ overflow: 'auto' }}>
                    <Tabs
                        defaultActiveKey="todas"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        onSelect={manejarCambioTab}
                    >
                        <Tab eventKey="todas" title="Todas">
                            {/* Renderiza las encuestas filtradas aquí */}
                        </Tab>
                        <Tab eventKey="escalaNumerica" title="Escala">
                            {/* Renderiza las encuestas filtradas aquí */}
                        </Tab>
                        <Tab eventKey="respuestaAbierta" title="Libre">
                            {/* Renderiza las encuestas filtradas aquí */}
                        </Tab>
                        <Tab eventKey="opcionMultiple" title="Opción multiple">
                            {/* Renderiza las encuestas filtradas aquí */}
                        </Tab>
                    </Tabs>

                    <Form.Control
                        type="text"
                        placeholder="Buscar encuesta"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Título</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Creador</th>
                                <th scope="col">Preguntas</th>
                                <th scope="col">Disponible</th>
                            </tr>
                        </thead>
                        <tbody>
                            {encuestasFiltradas.length > 0 ? (
                                encuestasFiltradas.slice(indicePrimerElemento, indiceUltimoElemento).map((encuesta, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => manejarSeleccionEncuesta(encuesta)}
                                        style={{ cursor: "pointer", backgroundColor: encuesta === encuestaSeleccionada ? '#0F1F38' : 'transparent', color: encuesta === encuestaSeleccionada ? '#FFFFFF' : '#000' }}
                                    >
                                        <td>{encuesta.titulo}</td>
                                        <td>{encuesta.descripcion}</td>
                                        <td>{encuesta.fecha}</td>
                                        <td>{encuesta.creador}</td>
                                        <td>
                                            <ol>
                                                {encuesta.preguntas.map((pregunta, index) => (
                                                    <li key={index}>{pregunta.texto}</li>
                                                ))}
                                            </ol>
                                        </td>
                                        <td>{encuesta.disponible ? <PiCheckCircleDuotone style={{ color: "green" }} /> : <PiCircleDashed style={{ color: "black" }} />}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No se encontraron encuestas.</td>
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
                        overlay={<Tooltip id="delete-tooltip">Ver encuesta</Tooltip>}
                    >
                        <button
                            className="btn d-flex align-items-center justify-content-center"
                            style={{ ...estiloBTN, background: '#0F1F38' }}
                            onClick={abrirModal}
                        >
                            <FaRegEye />
                        </button>
                    </OverlayTrigger>
                    {renderizarOpcion()}
                </div>
            </div>
            <Modal show={modalVisible} onHide={cerrarModal} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Editar encuesta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        id="TituloCambio"
                        name="TituloCambio"
                        value={valorFormulario.TituloCambio}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        type="text"
                        id="Descripcion"
                        name="Descripcion"
                        value={valorFormulario.Descripcion}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                        id="Fecha"
                        name="Fecha"
                        value={valorFormulario.Fecha}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Creador</Form.Label>
                    <Form.Control
                        type="email"
                        id="Creador"
                        name="Creador"
                        value={valorFormulario.Creador}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Preguntas</Form.Label>
                    <ol>
                        {encuestaSeleccionada && valorFormulario.Preguntas.map((pregunta, index) => (
                            <li key={index}>
                                <Form.Control
                                    type="text"
                                    id={`Preguntas-${index}`}
                                    name={`Preguntas-${index}`}
                                    value={pregunta.texto}
                                    onChange={(e) => manejarCambioPregunta(e.target.value, index)}
                                />
                            </li>
                        ))}
                    </ol>
                    <br />
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Vincular curso</Accordion.Header>
                            <Accordion.Body>
                                {cursos.length > 0 ? (
                                    <Form>
                                        {cursos.map((curso, index) => (
                                            <Form.Check
                                                key={index}
                                                type="checkbox"
                                                id={`usuario-${index}`}
                                                label={`${curso.curso}`}
                                                value={curso.curso}
                                                checked={cursoSeleccionado && cursoSeleccionado.includes(curso.curso)}
                                                onChange={(e) => manejarSeleccionCurso(e.target.value)}
                                            />
                                        ))}
                                    </Form>
                                ) : (
                                    <p>No hay usuarios docentes disponibles.</p>
                                )}
                                <br />
                                <Button className="w-100" onClick={accionCerrar}>Vincular</Button>
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

export default ObtenerEncuestas;