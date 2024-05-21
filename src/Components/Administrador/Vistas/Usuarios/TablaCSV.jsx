import React, { useRef } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { BsFillSave2Fill } from "react-icons/bs";
import { FaPaperclip } from "react-icons/fa";
import useTablaCSVArchivo from "./Function/useTablaCSVArchivo";

const TablaCSV = () => {
    const {
        manejarCargaCSV,
        agregarFila,
        manejarSeleccionFila,
        eliminarFila,
        manejarCambio,
        guardarCambios,
        enviarDatosCSV,
        mostrarAlerta,
        mensajeAlerta,
        formularioEdicion,
        datosJson,
        filaSeleccionada
    } = useTablaCSVArchivo();

    const estiloBTN = {
        border: "none",
        color: "#FFFFFF",
        borderRadio: "5px",
    }

    const estiloCard = {
        border: "none",
        color: "#FFFFFF"
    }

    const estiloInput = {
        border: 'none',
        background: '#0F1F38',
        color: '#FFFFFF',
        width: '100%'
    }

    const inputFileRef = useRef(null);

    const handleButtonClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    return (
        <>
            <div className="card h-100">
                <div style={{ ...estiloCard, background: '#0F1F38' }} className="card-header d-flex justify-content-between">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="cargar-tooltip">Cargar el documento con la extensión .CSV</Tooltip>}
                    >
                        <button
                            className="btn d-flex align-items-center justify-content-center"
                            style={{ ...estiloBTN, background: '#0F1F38' }}
                            onClick={handleButtonClick}
                        >
                            <FaPaperclip />
                        </button>
                    </OverlayTrigger>
                    <input
                        type="file"
                        accept=".csv"
                        ref={inputFileRef}
                        style={{ display: 'none' }}
                        onChange={manejarCargaCSV}
                    />
                    <h5 className="card-title">Lista de usuarios</h5>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="edit-tooltip">Guardar</Tooltip>}
                    >
                        <button onClick={enviarDatosCSV} className="btn d-flex align-items-center justify-content-center" style={{ ...estiloBTN, background: '#0F1F38' }}>
                            <BsFillSave2Fill />
                        </button>
                    </OverlayTrigger>
                </div>
                <div className="card-body" style={{ overflow: 'auto' }}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Correo</th>
                                <th scope="col">Nombre(s)</th>
                                <th scope="col">Apellido Paterno</th>
                                <th scope="col">Apellido materno</th>
                                <th scope="col">Área</th>
                                <th scope="col">Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosJson.map((item, index) => (
                                <tr
                                    key={index}
                                    onClick={() => manejarSeleccionFila(index)}
                                    style={{ cursor: "pointer", backgroundColor: index === filaSeleccionada ? '#0F1F38' : 'transparent', color: index === filaSeleccionada ? '#FFFFFF' : '#000' }}
                                >
                                    {filaSeleccionada === index ? (
                                        <>
                                            <td><input style={estiloInput} type="email" name="Correo" value={formularioEdicion.Correo} onChange={manejarCambio} /></td>
                                            <td><input style={estiloInput} type="text" name="Nombre" value={formularioEdicion.Nombre} onChange={manejarCambio} /></td>
                                            <td><input style={estiloInput} type="text" name="Apellido paterno" value={formularioEdicion['Apellido paterno']} onChange={manejarCambio} /></td>
                                            <td><input style={estiloInput} type="text" name="Apellido materno" value={formularioEdicion['Apellido materno']} onChange={manejarCambio} /></td>
                                            <td><input style={estiloInput} type="text" name="Área" value={formularioEdicion.Área} onChange={manejarCambio} /></td>
                                            <td><input style={estiloInput} type="text" name="Rol" value={formularioEdicion.Rol} onChange={manejarCambio} /></td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{item.Correo}</td>
                                            <td>{item.Nombre}</td>
                                            <td>{item['Apellido paterno']}</td>
                                            <td>{item['Apellido materno']}</td>
                                            <td>{item.Área}</td>
                                            <td>{item.Rol}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                            onClick={guardarCambios}
                            className="btn d-flex align-items-center justify-content-center"
                            style={{ ...estiloBTN, background: '#0F1F38' }}
                        >
                            <FaEdit />
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="edit-tooltip">Agregar</Tooltip>}
                    >
                        <button
                            onClick={agregarFila}
                            className="btn d-flex align-items-center justify-content-center"
                            style={{ ...estiloBTN, background: '#0F1F38' }}>
                            <FaPlus />
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="delete-tooltip">Eliminar</Tooltip>}
                    >
                        <button onClick={eliminarFila} className="btn d-flex align-items-center justify-content-center" style={{ ...estiloBTN, background: '#0F1F38' }}>
                            <MdDeleteForever />
                        </button>
                    </OverlayTrigger>
                </div>
            </div>
        </>
    );
}

export default TablaCSV;