import React, { useState } from "react";
import { Form } from 'react-bootstrap';

export default function useAccesoEncuesta() {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [preguntas, setPreguntas] = useState([]);

    const seleccionarOpcion = (opcion) => {
        setOpcionSeleccionada(opcion);
        let preguntasFormulario = [];

        if (opcion === 'opcion1') {
            preguntasFormulario.push(
                <div key="opcion1">
                    <Form.Group controlId="pregunta1">
                        <Form.Label>¿Qué tan útil encontraste el curso?</Form.Label>
                        <div>
                            <Form.Group controlId="pregunta2">
                                <Form.Label>Ingresa tu nombre completo</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="pregunta2">
                                <Form.Label>Ingresa tu correo electrónico</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                            <Form.Check
                                type="radio"
                                label="Muy útil"
                                name="pregunta1"
                                id="pregunta1_muyUtil"
                            />
                            <Form.Check
                                type="radio"
                                label="Útil"
                                name="pregunta1"
                                id="pregunta1_util"
                            />
                            <Form.Check
                                type="radio"
                                label="Poco útil"
                                name="pregunta1"
                                id="pregunta1_pocoUtil"
                            />
                            <Form.Check
                                type="radio"
                                label="No útil"
                                name="pregunta1"
                                id="pregunta1_noUtil"
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="pregunta2">
                        <Form.Label>¿Qué temas te gustaría que se trataran en futuros cursos?</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="expectativas">
                        <Form.Label>¿Consideras que el curso cumplió tus expectativas?</Form.Label>
                        <Form.Check
                            type="radio"
                            name="expectativas"
                            label="Sí"
                        />
                        <Form.Check
                            type="radio"
                            name="expectativas"
                            label="No"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="claridad">
                        <Form.Label>¿Cómo evaluarías la claridad de la información presentada en el curso?</Form.Label>
                        <div className="d-flex justify-content-between">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(numero => (
                                <span key={numero}>{numero}</span>
                            ))}
                        </div>
                        <input type="range" min="0" max="10" step="1" className="form-range" />
                    </Form.Group>
                </div>
            );
        } else if (opcion === 'opcion2') {
            preguntasFormulario.push(
                <div key="opcion2">
                    <Form.Group controlId="calidadMaterial">
                        <Form.Label>¿Cómo calificarías la calidad del material didáctico proporcionado en el curso?</Form.Label>
                        <div>
                            <Form.Group controlId="pregunta2">
                                <Form.Label>Ingresa tu nombre completo</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="pregunta2">
                                <Form.Label>Ingresa tu correo electrónico</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                            <Form.Check
                                type="radio"
                                label="Muy buena"
                                name="calidadMaterial"
                                id="calidadMaterial_muyBuena"
                            />
                            <Form.Check
                                type="radio"
                                label="Buena"
                                name="calidadMaterial"
                                id="calidadMaterial_buena"
                            />
                            <Form.Check
                                type="radio"
                                label="Regular"
                                name="calidadMaterial"
                                id="calidadMaterial_regular"
                            />
                            <Form.Check
                                type="radio"
                                label="Mala"
                                name="calidadMaterial"
                                id="calidadMaterial_mala"
                            />
                            <Form.Check
                                type="radio"
                                label="Muy mala"
                                name="calidadMaterial"
                                id="calidadMaterial_muyMala"
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="accesibilidad">
                        <Form.Label>¿Qué tan accesible encontraste la plataforma o herramientas utilizadas en el curso?</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                label="Muy accesible"
                                name="accesibilidad"
                                id="accesibilidad_muyAccesible"
                            />
                            <Form.Check
                                type="radio"
                                label="Accesible"
                                name="accesibilidad"
                                id="accesibilidad_accesible"
                            />
                            <Form.Check
                                type="radio"
                                label="Poco accesible"
                                name="accesibilidad"
                                id="accesibilidad_pocoAccesible"
                            />
                            <Form.Check
                                type="radio"
                                label="No accesible"
                                name="accesibilidad"
                                id="accesibilidad_noAccesible"
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="satisfaccionDuracion">
                        <Form.Label>¿Cuál fue tu nivel de satisfacción con la duración del curso?</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                label="Muy satisfecho/a"
                                name="satisfaccionDuracion"
                                id="satisfaccionDuracion_muySatisfecho"
                            />
                            <Form.Check
                                type="radio"
                                label="Satisfecho/a"
                                name="satisfaccionDuracion"
                                id="satisfaccionDuracion_satisfecho"
                            />
                            <Form.Check
                                type="radio"
                                label="Neutral"
                                name="satisfaccionDuracion"
                                id="satisfaccionDuracion_neutral"
                            />
                            <Form.Check
                                type="radio"
                                label="Insatisfecho/a"
                                name="satisfaccionDuracion"
                                id="satisfaccionDuracion_insatisfecho"
                            />
                            <Form.Check
                                type="radio"
                                label="Muy insatisfecho/a"
                                name="satisfaccionDuracion"
                                id="satisfaccionDuracion_muyInsatisfecho"
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="recomendarCurso">
                        <Form.Label>¿Recomendarías este curso a otras personas interesadas en el tema?</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                label="Definitivamente sí"
                                name="recomendarCurso"
                                id="recomendarCurso_definitivamenteSi"
                            />
                            <Form.Check
                                type="radio"
                                label="Sí"
                                name="recomendarCurso"
                                id="recomendarCurso_si"
                            />
                            <Form.Check
                                type="radio"
                                label="No estoy seguro/a"
                                name="recomendarCurso"
                                id="recomendarCurso_noSeguro"
                            />
                            <Form.Check
                                type="radio"
                                label="No"
                                name="recomendarCurso"
                                id="recomendarCurso_no"
                            />
                            <Form.Check
                                type="radio"
                                label="Definitivamente no"
                                name="recomendarCurso"
                                id="recomendarCurso_definitivamenteNo"
                            />
                        </div>
                    </Form.Group>
                </div>
            );
        } else if (opcion === 'opcion3') {
            preguntasFormulario.push(
                <div key="opcion3">
                    <Form.Group controlId="pregunta2">
                        <Form.Label>Ingresa tu nombre completo</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="pregunta2">
                        <Form.Label>Ingresa tu correo electrónico</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group controlId="sugerenciasMejoras">
                        <Form.Label>¿Qué sugerencias tienes para mejorar el contenido o la experiencia del curso?</Form.Label>
                        <Form.Control as="textarea" rows={1} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="parteFavorita">
                        <Form.Label>¿Cuál fue tu parte favorita del curso y por qué?</Form.Label>
                        <Form.Control as="textarea" rows={1} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="experienciaCurso">
                        <Form.Label>¿Tienes alguna experiencia o anécdota que quieras compartir sobre el curso?</Form.Label>
                        <Form.Control as="textarea" rows={1} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="otrosComentarios">
                        <Form.Label>¿Hay algún otro comentario o feedback que quieras proporcionar?</Form.Label>
                        <Form.Control as="textarea" rows={1} />
                    </Form.Group>

                </div>
            );
        }
        setPreguntas(preguntasFormulario);
    };

    return {
        opcionSeleccionada,
        preguntas,
        seleccionarOpcion
    };
}