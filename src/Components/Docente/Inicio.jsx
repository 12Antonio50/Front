import React from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Menu from './Menu/Menu';
import { Accordion } from "react-bootstrap";
import useObtenerCursos from '../Docente/Function/useObtenerCursos';
import "./Style.css";

const InicioDocente = () => {
    const { docente, cursosFiltrados } = useObtenerCursos();

    const tileContent = ({ date }) => {
        // Verificar si el día es sábado (6) o domingo (0)
        if (date.getDay() === 6 || date.getDay() === 0) {
            return null; // No se muestran cursos en sábado y domingo
        }

        const dateStr = date.toISOString().split('T')[0];
        const cursosEnFecha = cursosFiltrados.filter(curso => {
            return curso.inicio <= dateStr && dateStr <= curso.fin;
        });

        // Si hay cursos, devolver un div con una clase de estilo para resaltar el día
        if (cursosEnFecha.length > 0) {
            return <div className="curso-day-highlight">{cursosEnFecha.map(curso => curso.curso).join(', ')}</div>;
        }
        // Si no hay cursos para este día, devolver null
        return null;
    };

    const renderCursos = (cursos) => (
        <Accordion>
            {cursos.map((curso, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>{curso.curso}</Accordion.Header>
                    <Accordion.Body style={{ color: "white" }}>
                        <ol>
                            {docente && docente.cursos && docente.cursos.length > 0 && docente.cursos.includes(curso.curso) ? (
                                curso.encuestas && curso.encuestas.length > 0 ? (
                                    curso.encuestas.map((estudiante, i) => (
                                        <li key={i}>{estudiante}</li>
                                    ))
                                ) : (
                                    <li>Este curso aún no cuenta con encuestas</li>
                                )
                            ) : (
                                <li>No hay cursos del docente</li>
                            )}
                        </ol>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );

    return (
        <div className="inicio-docente" style={{ width: "100vw", height: "100vh", overflow: "auto" }}>
            <Menu />
            <div className='container-fluid' style={{ background: "#F4EBDE" }}>
                <div className='row'>
                    <div className='col-md-4 calendar-container text-center' style={{ background: "#F4EBDE", padding: "20px" }}>
                        <h3>Calendario de clases</h3>
                        <Calendar
                            className="calendario"
                            tileContent={tileContent} />
                    </div>
                    <div className='col-md-4 cursos-container' style={{ border: "none", background: "#8E9B97", padding: "20px", color: "#fff", fontFamily: "Arial, sans-serif" }}>
                        <h3 className='text-center'>Cursos a impartir</h3>
                        {docente && docente.cursos && docente.cursos.length > 0 ? (
                            <div>
                                {docente.cursos.map((curso, index) => (
                                    <div key={index} style={{ padding: "8px", marginBottom: "5px", borderRadius: "5px" }}>
                                        {curso}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No hay cursos</p>
                        )}
                    </div>
                    <div className='col-md-4 cursos-container text-center d-flex flex-column justify-content-center align-items-center' style={{ border: "none", background: "#537072", padding: "20px", color: "#fff", fontFamily: "Arial, sans-serif" }}>
                        <h3 style={{ marginBottom: "20px" }}>Cargar material de clases</h3>
                        <button style={{ backgroundColor: "#2C4A52", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "not-allowed" }} disabled>Próximamente</button>
                    </div>
                    <div className='col-md-6 cursos-filtrados-container' style={{ background: "#2C4A52", padding: "20px" }}>
                        <h3 className="text-center" style={{ color: "#FFFFFF" }}>Encuestas</h3>
                        <div className="accordion-page">
                            {cursosFiltrados && cursosFiltrados.length > 0 ? renderCursos(cursosFiltrados) : <p>No hay cursos filtrados</p>}
                        </div>
                    </div>
                    <div className='col-md-6 alumnos-container' style={{ background: "#2C4A52", color: "#fff", padding: "20px" }}>
                        <h3 className="text-center" style={{ color: "#FFFFFF" }}>Alumnos</h3>
                        <div className="accordion-page">
                            <Accordion >
                                {docente && docente.cursos && docente.cursos.length > 0 && cursosFiltrados && cursosFiltrados.length > 0 ? (
                                    cursosFiltrados.map((curso, index) => (
                                        <Accordion.Item eventKey={index.toString()} key={index}>
                                            <Accordion.Header>{curso.curso}</Accordion.Header>
                                            <Accordion.Body style={{ background: "#2C4A52", color: "#fff" }}>
                                                <h4>{curso.curso}</h4>
                                                <ol>
                                                    {curso.publico && curso.publico.length > 0 ? (
                                                        curso.publico.map((alumno, i) => (
                                                            <li key={i}>{alumno}</li>
                                                        ))
                                                    ) : (
                                                        <li>No hay alumnos registrados para este curso</li>
                                                    )}
                                                </ol>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))
                                ) : (
                                    <Accordion.Item>
                                        <Accordion.Header>No hay cursos filtrados o cursos del docente</Accordion.Header>
                                        <Accordion.Body>No hay cursos filtrados o cursos del docente</Accordion.Body>
                                    </Accordion.Item>
                                )}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InicioDocente;
