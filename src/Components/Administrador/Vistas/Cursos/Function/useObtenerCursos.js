import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useObtenerCursos() {
    const token = Cookies.get('token');
    const [cursos, setCursos] = useState([]);
    const [usuariosApoyo, setUsuariosApoyo] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [valorFormulario, setValorFormulario] = useState({
        CursoOriginal: '',
        CursoCambio: '',
        Area: '',
        Creador: '',
        Duracion: '',
        Inicio: '',
        Fin: ''
    });
    const [busqueda, setBusqueda] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const elementosPorPagina = 10;
    const [paginaActual, setPaginaActual] = useState(1);
    const [checkboxSeleccionados, setCheckboxSeleccionados] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState([]);
    const [usuariosVinculados, setUsuariosVinculados] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [encuestaSeleccionada, setEncuestaSeleccionada] = useState("");
    const [urlSeleccionada, setUrlSeleccionada] = useState("");

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setValorFormulario((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));
    };

    const limpiarFormulario = () => {
        setValorFormulario({
            CursoCambio: "",
            Area: "",
            Creador: "",
            Duracion: "",
            Inicio: "",
            Fin: ""
        });
        setCheckboxSeleccionados([]);
    }

    const obtenerCursos = useCallback(async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/cursos/buscar`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            if (respuesta.status === 200) {
                setCursos(respuesta.data);
            } else {
                console.error("Error al obtener los cursos:", respuesta.statusText);
            }
        } catch (error) {
            console.error("Error al obtener los cursos:", error);
        }
    }, [token]);

    const obtenerUsuariosApoyo = useCallback(async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/publico/obtenerInformacion`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setUsuariosApoyo(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffect(() => {
        if (cursoSeleccionado) {
            // Obtener usuarios vinculados solo para el curso seleccionado
            const usuarios = cursoSeleccionado.publico;
            setUsuariosVinculados(usuarios);
        }
    }, [cursoSeleccionado]);

    useEffect(() => {
        if (token) {
            obtenerUsuariosApoyo();
        }
    }, [obtenerUsuariosApoyo, token]);

    useEffect(() => {
        if (token) {
            obtenerCursos();
        }
    }, [obtenerCursos, token, setCursos]);

    const manejarSeleccionCurso = (curso) => {
        if (cursoSeleccionado && cursoSeleccionado.id === curso.id) {
            setCursoSeleccionado(null);
        } else {
            setCursoSeleccionado(curso);
        }
    };

    const manejarSeleccionUsuario = (nombreUsuario) => {
        // Verificar si el usuario ya está seleccionado
        const index = usuarioSeleccionado.indexOf(nombreUsuario);
        if (index === -1) {
            // Si no está seleccionado, agregarlo al array
            setUsuarioSeleccionado([...usuarioSeleccionado, nombreUsuario]);
        } else {
            // Si está seleccionado, eliminarlo del array
            const newSeleccionados = [...usuarioSeleccionado];
            newSeleccionados.splice(index, 1);
            setUsuarioSeleccionado(newSeleccionados);
        }
    };

    const eliminarCurso = async () => {
        if (cursoSeleccionado) {
            const curso = cursoSeleccionado.curso;
            try {
                const url = `https://servidor-61h9.onrender.com/API/v1/cursos/eliminar/curso`;

                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `${token}`,
                    },
                    data: {
                        curso: curso
                    },
                });

                if (response.status === 200) {
                    setMensajeAlerta('Curso eliminado correctamente');
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                        window.location.reload();
                    }, 5000);
                    obtenerCursos();
                } else {
                    setMensajeAlerta('Error al eliminar el curso');
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 5000);
                }
            } catch (error) {
                console.error('Error al eliminar el curso:', error);
            }
        } else {
            setMensajeAlerta('No se ha seleccionado ningún curso para eliminar.');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
        }
    };

    const editarCurso = async () => {
        try {
            if (!cursoSeleccionado) {
                console.error("No hay curso seleccionado para editar.");
                return;
            }

            const url = `https://servidor-61h9.onrender.com/API/v1/cursos/editar/curso`;

            const cursoEditado = valorFormulario.CursoCambio || valorFormulario.CursoOriginal;

            const datosEditados = {
                cursoOriginal: cursoSeleccionado.curso,
                cursoCambio: cursoEditado,
                area: valorFormulario.Area || cursoSeleccionado.area,
                creador: valorFormulario.Creador || cursoSeleccionado.creador,
                inicio: valorFormulario.Inicio || cursoSeleccionado.inicio,
                duracion: valorFormulario.Duracion || cursoSeleccionado.duracion,
                fin: valorFormulario.Fin || cursoSeleccionado.fin,
            };

            const respuesta = await axios.patch(url, datosEditados, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            console.log('Respuesta de la API:', respuesta.data);

            if (respuesta.status === 200) {
                setMensajeAlerta('Curso editado correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    window.location.reload();
                }, 5000);

                obtenerCursos();
            } else {
                setMensajeAlerta('Error al editar el curso');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error al editar el curso:', error);
        }
    };

    const manejarCambioPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const cursosFiltrados = cursos.filter(curso =>
        curso.curso.toLowerCase().includes(busqueda.toLowerCase())
    );

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;

    const totalPaginas = Math.ceil(cursosFiltrados.length / elementosPorPagina);

    const [paginaActualUsuario, setPaginaActualUsuario] = useState(1);
    const indiceUltimoElementoUsuario = paginaActualUsuario * elementosPorPagina;
    const indicePrimerElementoUsuario = indiceUltimoElementoUsuario - elementosPorPagina;
    const usuariosActuales = usuariosApoyo.slice(indicePrimerElementoUsuario, indiceUltimoElementoUsuario);
    const totalPaginasUsuario = Math.ceil(usuariosApoyo.length / elementosPorPagina);

    const manejarCambioPaginaUsuario = (numeroPagina) => {
        setPaginaActualUsuario(numeroPagina);
    };

    const abrirModal = () => {
        setModalVisible(true);
        if (cursoSeleccionado) {
            setValorFormulario({
                CursoCambio: cursoSeleccionado.curso,
                Area: cursoSeleccionado.area,
                Creador: cursoSeleccionado.creador,
                Duracion: cursoSeleccionado.duracion,
                Inicio: cursoSeleccionado.inicio,
                Fin: cursoSeleccionado.fin
            });
        }
    };

    const abrirModal1 = (encuesta = null) => {
        // Formatear la URL completa en el formato necesario
        const urlCompleta = `http://localhost:3000/enviar/${encodeURIComponent(encuesta)}`;
        console.log(urlCompleta);
        setUrlSeleccionada(urlCompleta);
        setModalAbierto(true);
    };

    const cerrarModal1 = () => {
        setModalAbierto(false);
        setEncuestaSeleccionada("");
    };

    const desvincularEncuesta = async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/cursos/quitar-encueta`;

            const cursoSeleccionadoEnviar = cursoSeleccionado.curso;

            for (const cursoSeleccionado of checkboxSeleccionados) {
                const enviarDatos = {
                    titulo: cursoSeleccionado,
                    curso: cursoSeleccionadoEnviar,
                };

                console.log('Enviando datos para desvincular curso:', enviarDatos);

                const respuesta = await axios.patch(url, enviarDatos, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                if (respuesta.status === 200) {
                    console.log(`Curso "${cursoSeleccionado}" desvinculado correctamente`);
                    obtenerCursos();
                    setMensajeAlerta('Cursos desvinculados correctamente');
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 5000);
                } else {
                    console.error(`Error al desvincular el curso "${cursoSeleccionado}"`);
                }
            }

        } catch (error) {
            console.error('Error al desvincular los cursos:', error);
            setMensajeAlerta('Error al desvincular los cursos');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
        }
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };

    const accionBoton = () => {
        cerrarModal();
        editarCurso();
    }

    const vincularPublico = async () => {
        try {
            if (!cursoSeleccionado || !usuarioSeleccionado || !Array.isArray(usuarioSeleccionado) || usuarioSeleccionado.length === 0 || typeof usuarioSeleccionado[0] !== 'string') {
                setMensajeAlerta('No se ha seleccionado un curso o un alumno válido para vincular');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
                return;
            }
            const nombreUsuario = usuarioSeleccionado[0];

            const yaEstaVinculado = cursoSeleccionado.publico.some(nombre => nombre && typeof nombre === 'string' && nombre.toLowerCase() === nombreUsuario.toLowerCase());
            if (yaEstaVinculado) {
                setMensajeAlerta('El alumno ya está vinculado a este curso');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
                return;
            }

            console.log(cursoSeleccionado.publico);

            const url = `https://servidor-61h9.onrender.com/API/v1/cursos/agregar-alumno`;

            const datos = {
                curso: cursoSeleccionado.curso,
                nombre: usuarioSeleccionado,
            };

            const respuesta = await axios.patch(url, datos, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (respuesta.status === 200) {
                obtenerCursos();
                obtenerUsuariosApoyo();
                setMensajeAlerta('Alumno vinculado correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    //window.location.reload();
                }, 5000);
            } else {
                setMensajeAlerta('Error al vincular el Alumno');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error al vincular el Alumno:', error);
        }
    };

    const desvincularAlumno = async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/cursos/quitar-alumno`;

            const cursoSeleccionadoEnviar = cursoSeleccionado.curso;

            for (const cursoSeleccionado of checkboxSeleccionados) {
                const enviarDatos = {
                    nombre: cursoSeleccionado,
                    curso: cursoSeleccionadoEnviar,
                };

                console.log('Enviando datos para desvincular curso:', enviarDatos);

                const respuesta = await axios.patch(url, enviarDatos, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                if (respuesta.status === 200) {
                    console.log(`Curso "${cursoSeleccionado}" desvinculado correctamente`);
                    obtenerCursos();
                    obtenerUsuariosApoyo();
                    setMensajeAlerta('Alumno desvinculados correctamente');
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 5000);
                } else {
                    console.error(`Error al desvincular al alumno "${cursoSeleccionado}"`);
                }
            }

        } catch (error) {
            console.error('Error al desvincular los Alumnos:', error);
            setMensajeAlerta('Error al desvincular los Alumnos');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
        }
    };

    const accionCerrar = () => {
        cerrarModal();
        vincularPublico();
    }

    const enviarEncuesta = async () => {
        if (!cursoSeleccionado || !cursoSeleccionado.publico || !cursoSeleccionado.publico.length) {
            console.error('Error: cursoSeleccionado o cursoSeleccionado.publico es null o vacío');
            return;
        }

        try {
            const nombresUsuarios = cursoSeleccionado.publico;
            const respuestaUsuarios = await axios.get('https://servidor-61h9.onrender.com/API/v1/publico/obtenerInformacion', {
                headers: {
                    Authorization: `${token}`,
                },
            });
            const mapaUsuarios = new Map(respuestaUsuarios.data.map(usuario => [usuario.nombre, usuario.correo]));
            const correosUsuarios = nombresUsuarios.map(nombre => mapaUsuarios.get(nombre));
            const correosValidos = correosUsuarios.filter(correo => correo !== undefined && correo !== null);

            const urlCompleta = urlSeleccionada;
            const url = `https://servidor-61h9.onrender.com/API/v1/encuestas/enviar/encuesta`;
            const data = {
                correo: correosValidos,
                url: urlCompleta
            };

            const respuesta = await axios.patch(url, data, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            if (respuesta.status === 200) {
                setMensajeAlerta('Encuesta enviada correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            } else {
                setMensajeAlerta('Error al enviar la Encuesta');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error al enviar la encuesta:', error);
            setMensajeAlerta('Error al enviar la Encuesta');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
        }
    };

    return {
        mostrarAlerta,
        mensajeAlerta,
        cursoSeleccionado,
        valorFormulario,
        busqueda,
        modalVisible,
        paginaActual,
        cursosFiltrados,
        indiceUltimoElemento,
        indicePrimerElemento,
        totalPaginas,
        checkboxSeleccionados,
        usuarioSeleccionado,
        usuariosApoyo,
        paginaActualUsuario,
        usuariosActuales,
        totalPaginasUsuario,
        usuariosVinculados,
        modalAbierto,
        encuestaSeleccionada,
        urlSeleccionada,
        cursos,
        desvincularAlumno,
        manejarCambioPaginaUsuario,
        manejarCambioPagina,
        accionBoton,
        cerrarModal,
        manejarSeleccionCurso,
        eliminarCurso,
        manejarCambioInput,
        limpiarFormulario,
        abrirModal,
        setBusqueda,
        obtenerCursos,
        setCheckboxSeleccionados,
        desvincularEncuesta,
        accionCerrar,
        manejarSeleccionUsuario,
        enviarEncuesta,
        abrirModal1,
        cerrarModal1
    };
}