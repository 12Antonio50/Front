import React from "react";
import { Form, Pagination, Modal, Button } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import useRespuestas from "./Functions/useRespuestas";

const Respuestas = () => {
    const {
        encuestaSeleccionada,
        valorFormulario,
        busqueda,
        modalVisible,
        paginaActual,
        encuestasFiltradas,
        indiceUltimoElemento,
        indicePrimerElemento,
        totalPaginas,
        manejarCambioPagina,
        accionBoton,
        cerrarModal,
        manejarSeleccionEncuesta,
        abrirModal,
        setBusqueda,
    } = useRespuestas();

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

    return (
        <>
            <div className="card h-100">
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-header d-flex justify-content-center">
                    <h5 className="card-title">Encuestas</h5>
                </div>
                <div className="card-body" style={{ overflow: 'auto' }}>

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
                                <th scope="col">Preguntas</th>
                                <th scope="col">Respuestas</th>
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
                                        <td>
                                            <ol>
                                                {encuesta.preguntas.map((pregunta, index) => (
                                                    <li key={index}>{pregunta.texto}</li>
                                                ))}
                                            </ol>
                                        </td>
                                        <td>
                                            <ol>
                                                {/* Mostrar todas las respuestas, independientemente de su tipo */}
                                                {encuesta.respuestas.map((respuesta, index) => (
                                                    <li key={index}>
                                                        {/* Verificar si hay respuestas en respuestasArray */}
                                                        {respuesta.respuestasArray && respuesta.respuestasArray.map((resp, idx) => (
                                                            <div key={idx}>
                                                                {/* Verificar si hay respuesta de texto */}
                                                                {resp.respuestaTexto !== undefined && (
                                                                    <div>{resp.respuestaTexto}</div>
                                                                )}
                                                                {/* Verificar si hay escala numérica */}
                                                                {resp.escalaNumerica !== undefined && (
                                                                    <div>{resp.escalaNumerica}</div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </li>
                                                ))}
                                            </ol>
                                        </td>

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
                </div>
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-footer d-flex justify-content-center">
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
                    />
                    <br />
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        type="text"
                        id="Descripcion"
                        name="Descripcion"
                        value={valorFormulario.Descripcion}
                    />
                    <br />
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                        id="Fecha"
                        name="Fecha"
                        value={valorFormulario.Fecha}
                    />
                    <br />
                    <Form.Label>Creador</Form.Label>
                    <Form.Control
                        type="email"
                        id="Creador"
                        name="Creador"
                        value={valorFormulario.Creador}
                    />
                    <br />
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between align-items-center">
                    <Button style={estiloBTNModal} variant="secondary" >
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

export default Respuestas;
