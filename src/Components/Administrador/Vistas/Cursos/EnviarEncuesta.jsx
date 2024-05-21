import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImagenPluma from "../../../../img/Edificios.jpg";
import { Spinner } from "react-bootstrap";

const Enviar = () => {
    const { tituloEncuesta } = useParams();
    const [encuesta, setEncuesta] = useState(null);
    const [mostrarAlertas, setMostrarAlertas] = useState(false);

    const obtenerUnicaEncuesta = async () => {
        try {
            const data = { titulo: tituloEncuesta };
            const url = `http://localhost:4000/API/v1/encuestas/buscar/encuesta`;
            const respuesta = await axios.post(url, data);
            setEncuesta(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        obtenerUnicaEncuesta();
    }, []);

    const handleInputChange = (index, event) => {
        const { value, checked } = event.target;
        const preguntasActualizadas = [...encuesta.preguntas];

        if (preguntasActualizadas[index].tipo === "opcionMultiple") {
            preguntasActualizadas[index].opciones.forEach((opcion, opcionIndex) => {
                if (opcion.texto === value) {
                    preguntasActualizadas[index].opciones[opcionIndex].seleccionada = checked;
                } else {
                    preguntasActualizadas[index].opciones[opcionIndex].seleccionada = false; // Deseleccionar otras opciones
                }
            });
        } else {
            preguntasActualizadas[index].respuesta = value;
        }

        setEncuesta({ ...encuesta, preguntas: preguntasActualizadas });
    };

    const enviarRespuestas = async () => {
        try {
            // Validar si todas las preguntas han sido respondidas
            const todasRespondidas = encuesta.preguntas.every(pregunta => pregunta.respuesta || pregunta.opciones.some(opcion => opcion.seleccionada));
            if (!todasRespondidas) {
                // Mostrar mensaje de error si no todas las preguntas están respondidas
                alert("No se pueden enviar las respuestas. Por favor responde todas las preguntas.");
                return;
            }

            const url = "http://localhost:4000/API/v1/encuestas/respuetas";
            const respuestas = encuesta.preguntas.map(pregunta => {
                if (pregunta.tipo === "opcionMultiple") {
                    return {
                        preguntaId: pregunta._id,
                        tipo: pregunta.tipo,
                        valor: pregunta.opciones.filter(opcion => opcion.seleccionada).map(opcion => opcion.texto)
                    };
                } else {
                    return {
                        preguntaId: pregunta._id,
                        tipo: pregunta.tipo,
                        valor: pregunta.respuesta || ''
                    };
                }
            });
            const respuesta = await axios.post(url, {
                titulo: encuesta.titulo,
                respuestas: respuestas,
            });
            console.log("Respuestas enviadas correctamente:", respuesta.data);
            setMostrarAlertas(true); // Mostrar la alerta cuando las respuestas se envían correctamente
        } catch (error) {
            console.error("Error al enviar respuestas:", error);
        }
    };

    if (!encuesta) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#0F1F38" }}>
                <Spinner animation="grow" style={{ width: '4rem', height: '4rem', background: "#FFFFFF" }} />
            </div>
        );
    }


    return (
        <div>
            <div
                style={{
                    backgroundImage: `url(${ImagenPluma})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: "Arial, sans-serif",
                    zIndex: -1,
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="container-fluid h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="p-4 rounded-lg col-lg-8 h-100" style={{ background: "#FFFFFF" }}>
                            <div className="container">
                                <h1
                                    className="my-4 display-4 text-center"
                                    style={{ color: "#0f1f38", fontFamily: "Arial, sans-serif" }}
                                >
                                    {encuesta.titulo}
                                </h1>
                                <br />
                                <h2
                                    className="lead"
                                    style={{ textAlign: "justify", color: "#1b4b5a", fontFamily: "Arial, sans-serif" }}
                                >
                                    {encuesta.descripcion}
                                </h2>
                                <br />
                                <form>
                                    {encuesta.preguntas.map((pregunta, index) => (
                                        <div key={pregunta._id} className="mb-4">
                                            <p
                                                className="mb-1 lead"
                                                style={{ color: "#1b4b5a", fontFamily: "Arial, sans-serif" }}
                                            >
                                                {index + 1}. {pregunta.texto}
                                            </p>
                                            {pregunta.tipo === "opcionMultiple" ? (
                                                pregunta.opciones.map((opcion, opcionIndex) => (
                                                    <div key={opcionIndex} className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            id={`opcion-${index}-${opcionIndex}`}
                                                            name={`pregunta-${index}`}
                                                            value={opcion.texto}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            className="form-check-input"
                                                            checked={opcion.seleccionada || false}
                                                        />
                                                        <label
                                                            htmlFor={`opcion-${index}-${opcionIndex}`}
                                                            className="form-check-label"
                                                            style={{ color: "#1b4b5a", fontFamily: "Arial, sans-serif" }}
                                                        >
                                                            {opcion.texto}
                                                        </label>
                                                    </div>
                                                ))
                                            ) : pregunta.tipo === "escalaNumerica" ? (
                                                <div className="d-flex align-items-center">
                                                    <input
                                                        type="range"
                                                        id={`respuesta-${index}`}
                                                        name={`pregunta-${index}`}
                                                        min="0"
                                                        max="10"
                                                        step="1"
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        value={pregunta.respuesta || '0'}
                                                        className="form-range me-3"
                                                        style={{ width: "100%" }}
                                                    />
                                                    <div className="fw-bold">{pregunta.respuesta || '0'}</div>
                                                </div>
                                            ) : (
                                                <input
                                                    className="form-control mb-2"
                                                    type="text"
                                                    id={`respuesta-${index}`}
                                                    name={`pregunta-${index}`}
                                                    placeholder="Escribe tu respuesta aquí"
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    value={pregunta.respuesta || ''}
                                                    style={{
                                                        color: "#1b4b5a",
                                                        border: "none",
                                                        borderBottom: "1px solid #8E7970",
                                                        borderRadius: "0",
                                                        boxShadow: "none",
                                                        WebkitBoxShadow: "none",
                                                        fontFamily: "Arial, sans-serif"
                                                    }}
                                                />
                                            )}
                                            {index < encuesta.preguntas.length - 1 && <br />}
                                        </div>
                                    ))}
                                    <br />
                                    <br />
                                    <button
                                        type="button"
                                        style={{ background: "#F55449", border: "none" }}
                                        className="btn btn-primary btn-lg btn-block w-100"
                                        onClick={enviarRespuestas}
                                    >
                                        Enviar respuestas
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Enviar;
