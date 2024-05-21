import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BsFillSave2Fill } from "react-icons/bs";
import useCrearEncuesta from "./Functions/useCrearEncuesta";

const CrearEncuestas = () => {
    const {
        enviarFormulario,
        manejarCambioInput,
        handleAgregarOpcion,
        handleCrearPregunta,
        handleEliminarPregunta,
        toggleSeleccion,
        setTipoPregunta,
        setPregunta,
        setMinValue,
        setMaxValue,
        setOpcionTexto,
        opciones,
        opcionTexto,
        pregunta,
        tipoPregunta,
        maxValue,
        minValue,
        mensajeAlerta,
        mostrarAlerta,
        valorFormulario
    } = useCrearEncuesta();

    const estiloBTN = {
        border: "none",
        color: "#FFFFFF",
        borderRadio: "5px",
    }

    const estiloCard = {
        border: "none",
        color: "#FFFFFF"
    }

    return (
        <>
            <div>
                <div style={{ overflow: 'auto' }}>
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        id="Titulo"
                        name="Titulo"
                        value={valorFormulario.Titulo}
                        onChange={manejarCambioInput}
                    />
                    <br />
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={1}
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
                    <div className="d-flex justify-content-center">
                        <h5>Crear pregunta</h5>
                    </div>
                    <br />
                    <Form.Group controlId="formTipoPregunta">
                        <Form.Label>Tipo de Pregunta</Form.Label>
                        <Form.Control as="select" value={tipoPregunta} onChange={(e) => setTipoPregunta(e.target.value)}>
                            <option value="">Seleccionar tipo de pregunta</option>
                            <option value="escalaNumerica">Escala</option>
                            <option value="respuestaAbierta">Texto</option>
                            <option value="opcionMultiple">Opción Múltiple</option>
                        </Form.Control>
                        <br />
                    </Form.Group>
                    <Form.Group controlId="formPregunta">
                        <Form.Label>Pregunta</Form.Label>
                        <Form.Control type="text" value={pregunta} onChange={(e) => setPregunta(e.target.value)} />
                    </Form.Group>
                    <br />
                    {tipoPregunta === "escalaNumerica" && (
                        <Row>
                            <Col>
                                <Form.Label>Valor Mínimo</Form.Label>
                                <Form.Control type="number" value={minValue} onChange={(e) => setMinValue(e.target.value)} />
                            </Col>
                            <Col>
                                <Form.Label>Valor Máximo</Form.Label>
                                <Form.Control type="number" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
                            </Col>
                        </Row>
                    )}

                    <br />
                    <br />

                    {tipoPregunta === "opcionMultiple" && (
                        <>
                            <Form.Group controlId="formOpciones">
                                <Form.Label>Opciones</Form.Label>
                                <div className="d-flex align-items-center mb-3">
                                    <Form.Control type="text" value={opcionTexto} onChange={(e) => setOpcionTexto(e.target.value)} />
                                    <Button variant="primary" onClick={handleAgregarOpcion} className="ms-2">Agregar</Button>
                                </div>
                                <ul className="list-group opciones-list">
                                    {opciones.map((opcion, index) => (
                                        <li key={index} className="list-group-item d-flex align-items-center">
                                            {tipoPregunta === "opcionMultiple" && (
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={opcion.seleccionada}
                                                    onChange={() => toggleSeleccion(index)}
                                                    className="me-2"
                                                />
                                            )}
                                            {tipoPregunta !== "opcionMultiple" && (
                                                <Form.Check
                                                    type="radio"
                                                    checked={opcion.seleccionada}
                                                    readOnly
                                                    className="me-2"
                                                />
                                            )}
                                            <span>{opcion.texto}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Form.Group>
                        </>
                    )}
                    <Button className="w-100" style={{ ...estiloBTN, background: '#0F1F38' }} onClick={handleCrearPregunta}>Crear pregunta</Button>
                    <div className="container-fluid my-5">
                        {/* Estructura del formulario y las preguntas */}
                        {valorFormulario.Preguntas && valorFormulario.Preguntas.map((pregunta, index) => (
                            <div key={index} className="mb-3">
                                {/* Contenedor de la pregunta */}
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* Muestra el número de la pregunta y su texto */}
                                    <p>{index + 1}. {pregunta.texto}</p>
                                    {/* Agrega un botón para eliminar la pregunta */}
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="delete-tooltip">Eliminar</Tooltip>}
                                    >
                                        <button
                                            onClick={() => handleEliminarPregunta(index)}
                                            className="btn d-flex align-items-center justify-content-center" style={{ ...estiloBTN, background: '#0F1F38' }}>
                                            <MdDeleteForever />
                                        </button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {mostrarAlerta && (
                <div className="contenedor-alerta">
                    <div className="mensaje-alerta">{mensajeAlerta}</div>
                </div>
            )}
            <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-footer d-flex justify-content-center">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="delete-tooltip">Crear</Tooltip>}
                >
                    <button
                        className="w-100 btn d-flex align-items-center justify-content-center"
                        style={{ ...estiloBTN, background: '#0F1F38' }}
                        onClick={enviarFormulario}
                    >
                        <BsFillSave2Fill />
                    </button>
                </OverlayTrigger>
            </div>
        </>
    );
}

export default CrearEncuestas;