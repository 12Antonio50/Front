import { useState, useCallback, useMemo } from "react";
import * as d3 from "d3-dsv";
import axios from "axios";
import Cookies from "js-cookie";

export default function useTablaCSVArchivo() {
    const token = Cookies.get('token');
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [datosCSV, setDatosCSV] = useState([]);
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [datosJson, setDatosJson] = useState([]);

    // Calcula la fecha futura
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 1); // Agrega 1 día a la fecha actual

    const [formularioEdicion, setFormularioEdicion] = useState({
        Nombre: '',
        Correo: '',
        Telefono: '',
        Celular: '',
        Fecha: fechaActual
    });


    const columnasRequeridas = useMemo(() => [
        "Nombre",
        "Correo",
        "Teléfono",
        "Celular",
        "Fecha"
    ], []);

    const tieneTodasLasColumnas = useCallback((datos) => {
        return columnasRequeridas.every((col) => datos.columns.includes(col));
    }, [columnasRequeridas]);

    const manejarCargaCSV = useCallback(
        (evento) => {
            const archivo = evento.target.files[0];

            if (!archivo) {
                setMensajeAlerta('Por favor, seleccione un archivo CSV');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMensajeAlerta(false);
                }, 5000);
                return;
            }

            if (archivo.type !== "text/csv" && !archivo.name.endsWith(".csv")) {
                setMensajeAlerta('El archivo seleccionado no es un archivo CSV');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMensajeAlerta(false);
                }, 5000);
                return;
            }

            const lector = new FileReader();
            lector.onload = (e) => {
                const contenidoArchivo = e.target.result;

                try {
                    const datos = d3.csvParse(contenidoArchivo);
                    if (!tieneTodasLasColumnas(datos)) {
                        setMensajeAlerta('El archivo CSV debe contener las siguientes columnas: Nombre, Correo, Teléfono, y Celular.');
                        setMostrarAlerta(true);
                        setTimeout(() => {
                            setMensajeAlerta(false);
                        }, 5000);
                        return;
                    }

                    const datosFiltrados = datos.filter((item) => columnasRequeridas.every((col) => item[col] && item[col].trim() !== ""));

                    setDatosCSV(datosFiltrados);

                    const datosConvertidos = datosFiltrados.map((item) => {
                        const itemConvertido = {};
                        Object.entries(item).forEach(([clave, valor]) => {
                            itemConvertido[clave] = valor ? valor.trim() : "";
                        });
                        return itemConvertido;
                    });

                    setDatosJson(datosConvertidos);

                } catch (error) {
                    setMensajeAlerta('Error al parsear el archivo CSV. Por favor, verifica el formato del archivo');
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMensajeAlerta(false);
                    }, 8000);
                }
            };

            lector.readAsText(archivo);
        },
        [columnasRequeridas, tieneTodasLasColumnas]
    );

    const manejarSeleccionFila = (index) => {
        setFilaSeleccionada(index);
        setFormularioEdicion(datosJson[index]);
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormularioEdicion((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const guardarCambios = () => {
        const nuevosDatosJson = [...datosJson];
        nuevosDatosJson[filaSeleccionada] = formularioEdicion;
        setDatosJson(nuevosDatosJson);
        setFilaSeleccionada(null);
    };

    const eliminarFila = () => {
        if (filaSeleccionada === null) {
            setMensajeAlerta('Seleccione una fila primero');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMensajeAlerta(false);
            }, 5000);
            return;
        }

        setDatosJson((datosAnteriores) => datosAnteriores.filter((_, idx) => idx !== filaSeleccionada));

        setFilaSeleccionada(null);
    };

    const agregarFila = () => {
        if (datosJson.length === 0) {
            setMensajeAlerta('Seleccione un archivo primero');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMensajeAlerta(false);
            }, 5000);
            return;
        }
        const nuevaFila = {
            Nombre: "valor 1",
            Correo: "valor 2",
            Teléfono: "valor 3",
            Celular: "valor 4",
            Fecha: "valor 5"

        };
        setDatosJson((estadoPrevio) => [...estadoPrevio, nuevaFila]);
    };

    const enviarDatosCSV = async () => {
        if (datosJson.length === 0) {
            setMensajeAlerta('No hay datos para enviar');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
            return;
        }

        try {
            let convertirDatos = datosJson.map((item) => {
                const convertirItem = {
                    correo: item["Correo"] || "",
                    nombre: item["Nombre"] || "",
                    telefono: item["Teléfono"] || "",
                    celular: item["Celular"] || "",
                    fecha: item["Fecha"] || ""
                };
                return convertirItem;
            });

            const url = `https://servidor-61h9.onrender.com/API/v1/publico/crear/lista`;

            const respuesta = await axios.post(url, convertirDatos, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (respuesta.status === 200) {
                setMensajeAlerta('Datos CSV enviados correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    // Recargar la página después de una edición exitosa
                    window.location.reload();
                }, 5000);
            } else {
                setMensajeAlerta('Error al enviar los datos CSV');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error al enviar los datos CSV:', error);
            setMensajeAlerta('Error al enviar los datos CSV. Por favor, inténtelo de nuevo.');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
        }
    };

    return {
        manejarCargaCSV,
        manejarSeleccionFila,
        manejarCambio,
        guardarCambios,
        agregarFila,
        eliminarFila,
        enviarDatosCSV,
        mostrarAlerta,
        mensajeAlerta,
        datosJson,
        datosCSV,
        filaSeleccionada,
        formularioEdicion
    };
}
