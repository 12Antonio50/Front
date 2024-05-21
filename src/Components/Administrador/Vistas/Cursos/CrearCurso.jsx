import React from "react";
import { Form, Button, Accordion } from 'react-bootstrap';
import useCrearCurso from "./Function/useCrearCurso";
import Cookies from "js-cookie";

const CrearCurso = () => {
    const {
        manejarCambioInput,
        enviarFormulario,
        limpiarFormulario,
        valorFormulario,
        mostrarAlerta,
        mensajeAlerta,
    } = useCrearCurso();

    const usuarioRol = Cookies.get('rol');
    const usuarioArea = Cookies.get('area');

    const renderizarOpcion = () => {
        if (usuarioRol === 'AP' && usuarioArea === 'A') {
            return (
                <Form.Select
                    id="Area"
                    name="Area"
                    value={valorFormulario.Area}
                    onChange={manejarCambioInput}
                >
                    <option value="">Seleccione un área</option>
                    <option value="A">Administración</option>
                </Form.Select>
            );
        } else if (usuarioRol === 'AP' && usuarioArea === 'C') {
            return (
                <Form.Select
                    id="Area"
                    name="Area"
                    value={valorFormulario.Area}
                    onChange={manejarCambioInput}
                >
                    <option value="">Seleccione un área</option>
                    <option value="C">Contaduría</option>
                </Form.Select>
            );
        } else if (usuarioRol === 'A') {
            // Si el rol es "A", renderiza el Form.Select con las opciones estándar
            return (
                <Form.Select
                    id="Area"
                    name="Area"
                    value={valorFormulario.Area}
                    onChange={manejarCambioInput}
                >
                    <option value="">Seleccione un área</option>
                    <option value="A">Administración</option>
                    <option value="C">Contaduría</option>
                </Form.Select>
            );
        } else {
            return null;
        }
    }

    return (
        <>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Crear Curso</Accordion.Header>
                    <Accordion.Body>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            id="Curso"
                            name="Curso"
                            value={valorFormulario.Curso}
                            onChange={manejarCambioInput}
                        />
                        <br />
                        {renderizarOpcion()}

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
                        <Form.Label>Finaliza</Form.Label>
                        <Form.Control
                            type="date"
                            id="Fin"
                            name="Fin"
                            value={valorFormulario.Fin}
                            onChange={manejarCambioInput}
                        />
                        <br />
                        <br />
                        {mostrarAlerta && (
                            <div className="contenedor-alerta">
                                <div className="mensaje-alerta">{mensajeAlerta}</div>
                            </div>
                        )}
                        <div className="d-flex align-items-center justify-content-between">
                            <Button variant="secondary" onClick={limpiarFormulario}>
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={() => enviarFormulario()}>
                                Crear
                            </Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default CrearCurso;