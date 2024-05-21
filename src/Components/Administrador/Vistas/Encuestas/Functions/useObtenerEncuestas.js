import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useObtenerEncuestas() {
    const token = Cookies.get('token');
    const [encuestas, setEncuestas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState([]);
    const [encuestaSeleccionada, setEncuestaSeleccionada] = useState(null);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [valorFormulario, setValorFormulario] = useState({
        TituloOriginal: '',
        TituloCambio: '',
        Descripcion: '',
        Fecha: '',
        Duracion: '',
        Creador: '',
        Preguntas: []
    });
    const [busqueda, setBusqueda] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const elementosPorPagina = 10;
    const [paginaActual, setPaginaActual] = useState(1);
    const [tipoPreguntaSeleccionado, setTipoPreguntaSeleccionado] = useState('todas');

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setValorFormulario((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));
    };

    const limpiarFormulario = () => {
        setValorFormulario({
            TituloCambio: "",
            Descripcion: "",
            Fecha: "",
            Duracion: "",
            Creador: "",
            Preguntas: []
        });
    }

    const obtenerEncuestas = useCallback(async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/encuestas/obtener/encuetas`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setEncuestas(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    const obtenerCursos = useCallback(async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/cursos/buscar`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setCursos(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            obtenerCursos();
        }
    }, [obtenerCursos, token, setCursos]);

    const manejarSeleccionEncuesta = (encuesta) => {
        if (encuestaSeleccionada && encuestaSeleccionada.id === encuesta.id) {
            setEncuestaSeleccionada(null);
        } else {
            setEncuestaSeleccionada(encuesta);
        }
    };

    const eliminarEncuesta = async () => {
        if (encuestaSeleccionada) {
            // Verificar si la encuesta está disponible para eliminar
            if (!encuestaSeleccionada.disponible) {
                setMensajeAlerta('No se puede eliminar una encuesta no disponible.');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
                return;
            }

            const encuesta = encuestaSeleccionada.titulo;
            try {
                const url = `https://servidor-61h9.onrender.com/API/v1/encuestas/eliminar/encuesta`;

                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `${token}`,
                    },
                    data: {
                        titulo: encuesta
                    },
                });

                if (response.status === 200) {
                    setMensajeAlerta('Encuesta eliminada correctamente');
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                        // Recargar la página después de una edición exitosa
                        window.location.reload();
                    }, 5000);
                    obtenerEncuestas();
                } else {
                    setMensajeAlerta('Error al eliminar la encuesta');
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 5000);
                }
            } catch (error) {
                console.error('Error al eliminar la encuesta:', error);
            }
        } else {
            setMensajeAlerta('No se ha seleccionado ninguna encuesta para eliminar.');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
        }
    };

    const editarEncuesta = async () => {
        try {
            if (!encuestaSeleccionada) {
                console.error("No hay encuesta seleccionada para editar.");
                return;
            }

            const url = `https://servidor-61h9.onrender.com/API/v1/encuestas/actualizar/encuesta`;

            const encuestaEditada = valorFormulario.TituloCambio || valorFormulario.TituloOriginal;

            const datosEditados = {
                tituloOriginal: encuestaSeleccionada.titulo,
                tituloCambio: encuestaEditada,
                descripcion: valorFormulario.Descripcion || encuestaSeleccionada.descripcion,
                fecha: valorFormulario.Fecha || encuestaSeleccionada.fecha,
                creador: valorFormulario.Creador || encuestaSeleccionada.creador,
                preguntas: valorFormulario.Preguntas || encuestaSeleccionada.preguntas,
            };

            const respuesta = await axios.patch(url, datosEditados, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (respuesta.status === 200) {
                setMensajeAlerta('Encuesta editada correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    // Recargar la página después de una edición exitosa
                    window.location.reload();
                }, 5000);

                obtenerEncuestas();
            } else {
                setMensajeAlerta('Error al editar la encuesta');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error al editar la encuesta:', error);
        }
    };

    const manejarCambioPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    useEffect(() => {
        if (token) {
            obtenerEncuestas();
        }
    }, [obtenerEncuestas, token, setEncuestas]);

    const encuestasFiltradas = encuestas.filter(encuesta => {
        if (tipoPreguntaSeleccionado === 'todas') {
            return encuesta.titulo.toLowerCase().includes(busqueda.toLowerCase());
        }
        return (encuesta.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
            encuesta.descripcion.toLowerCase().includes(busqueda.toLowerCase())) &&
            encuesta.preguntas.some(pregunta => pregunta.tipo === tipoPreguntaSeleccionado);
    });

    const manejarCambioTab = (tipo) => {
        setTipoPreguntaSeleccionado(tipo);
    };

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;

    const totalPaginas = Math.ceil(encuestasFiltradas.length / elementosPorPagina);

    const abrirModal = () => {
        setModalVisible(true);
        if (encuestaSeleccionada) {
            setValorFormulario({
                TituloCambio: encuestaSeleccionada.titulo,
                Descripcion: encuestaSeleccionada.descripcion,
                Fecha: encuestaSeleccionada.fecha,
                Creador: encuestaSeleccionada.creador,
                Preguntas: encuestaSeleccionada.preguntas,
            });
        }
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };

    const accionBoton = () => {
        cerrarModal();
        editarEncuesta();
    }

    const manejarCambioPregunta = (nuevoTexto, index) => {
        setValorFormulario((prevState) => {
            const nuevasPreguntas = prevState.Preguntas.map((pregunta, i) => {
                if (i === index) {
                    return { ...pregunta, texto: nuevoTexto };
                }
                return pregunta;
            });

            return { ...prevState, Preguntas: nuevasPreguntas };
        });
    };


    const manejarSeleccionCurso = (curso) => {
        if (cursoSeleccionado && cursoSeleccionado.some(u => u._id === curso._id)) {
            setCursoSeleccionado(cursoSeleccionado.filter(u => u._id !== curso._id));
        } else {
            setCursoSeleccionado([...cursoSeleccionado, curso]);
        }
    };

    const vincularCurso = async () => {
        try {
            // Verificar si se ha seleccionado una encuesta y si está disponible
            if (!encuestaSeleccionada || !encuestaSeleccionada.disponible) {
                setMensajeAlerta('No se ha seleccionado una encuesta disponible para vincular.');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
                return;
            }
    
            // Verificar si se ha seleccionado un curso
            if (!cursoSeleccionado) {
                setMensajeAlerta('No se ha seleccionado un curso para vincular.');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
                return;
            }
    
            const url = `https://servidor-61h9.onrender.com/API/v1/cursos/agregar-encuesta`;
    
            const datos = {
                encuesta: encuestaSeleccionada.titulo,
                curso: cursoSeleccionado,
            };
    
            const respuesta = await axios.patch(url, datos, {
                headers: {
                    Authorization: `${token}`,
                },
            });
    
            if (respuesta.status === 200) {
                obtenerEncuestas();
                setMensajeAlerta('Encuesta vinculada correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    // Recargar la página después de una edición exitosa
                    //window.location.reload();
                }, 5000);
            } else {
                setMensajeAlerta('Error al vincular la encuesta');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error al vincular la encuesta:', error);
        }
    };

    const accionCerrar = () => {
        cerrarModal();
        vincularCurso();
    }
    

    return {
        cursos,
        encuestas,
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
        obtenerEncuestas,
        manejarCambioPregunta,
        manejarCambioTab,
        accionCerrar,
        manejarSeleccionCurso
    };
}