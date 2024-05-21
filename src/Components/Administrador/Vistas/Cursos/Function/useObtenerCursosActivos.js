import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useObtenerCursosActivo() {
    const token = Cookies.get('token');
    const area = Cookies.get('area');
    const rol = Cookies.get('rol');
    const [cursos, setCursos] = useState([]);
    const [usuariosDocente, setUsuariosDocentes] = useState([]);
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
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState([]);

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
    }

    const obtenerCursosActivos = useCallback(async () => {
        try {
            let url;
            if (rol === 'AP') {
                url = 'https://servidor-61h9.onrender.com/API/v1/cursos/buscar/activos';

                const areaActual = {
                    area: area
                }
                console.log(areaActual)
                const respuesta = await axios.post(url, areaActual, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setCursos(respuesta.data);
            } else if (rol === 'A') {
                url = 'https://servidor-61h9.onrender.com/API/v1/cursos/buscar/activos/todos';
                const respuesta = await axios.get(url, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setCursos(respuesta.data);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [rol, token, area, setCursos]);

    const obtenerUsuariosDocentes = useCallback(async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/usuario/buscar/docente`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `${token}`,
                }
            });
            setUsuariosDocentes(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            obtenerUsuariosDocentes();
        }
    }, [obtenerUsuariosDocentes, token]);


    const manejarSeleccionCurso = (curso) => {
        if (cursoSeleccionado && cursoSeleccionado.id === curso.id) {
            setCursoSeleccionado(null);
        } else {
            setCursoSeleccionado(curso);
        }
    };

    const manejarSeleccionUsuario = (usuario) => {
        if (usuarioSeleccionado && usuarioSeleccionado.some(u => u._id === usuario._id)) {
            setUsuarioSeleccionado(usuarioSeleccionado.filter(u => u._id !== usuario._id));
        } else {
            setUsuarioSeleccionado([...usuarioSeleccionado, usuario]);
        }
    };


    const eliminarCurso = async () => {
        if (cursoSeleccionado) {
            const curso = cursoSeleccionado.curso;
            try {
                const url = `https://servidor-61h9.onrender.com/API/v1/cursos/eliminar`;

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
                        // Recargar la página después de una edición exitosa
                        window.location.reload();
                    }, 5000);
                    obtenerCursosActivos();
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
                    // Recargar la página después de una edición exitosa
                    window.location.reload();
                }, 5000);
                obtenerCursosActivos();
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

    useEffect(() => {
        if (token) {
            obtenerCursosActivos();
        }
    }, [obtenerCursosActivos, setCursos, token]);

    const cursosFiltrados = cursos.filter(curso =>
        curso.curso.toLowerCase().includes(busqueda.toLowerCase())
    );

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;

    const totalPaginas = Math.ceil(cursosFiltrados.length / elementosPorPagina);

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

    const vincularCurso = async () => {
        try {
            if (!cursoSeleccionado || usuarioSeleccionado.length === 0) {
                console.error("No se ha seleccionado un curso o un usuario para vincular.");
                return;
            }

            const url = `https://servidor-61h9.onrender.com/API/v1/usuario/agregar-curso`;

            const datos = {
                curso: cursoSeleccionado.curso,
                correo: usuarioSeleccionado,
            };

            const respuesta = await axios.patch(url, datos, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (respuesta.status === 200) {
                obtenerUsuariosDocentes();
                setMensajeAlerta('Curso vinculado correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    // Recargar la página después de una edición exitosa
                    window.location.reload();
                }, 5000);
            } else {
                setMensajeAlerta('Error al vincular el curso');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error al vincular el curso:', error);
        }
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };

    const accionBoton = () => {
        cerrarModal();
        editarCurso();
    }


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
        usuariosDocente,
        usuarioSeleccionado,
        manejarCambioPagina,
        accionBoton,
        cerrarModal,
        manejarSeleccionCurso,
        eliminarCurso,
        manejarCambioInput,
        limpiarFormulario,
        abrirModal,
        setBusqueda,
        manejarSeleccionUsuario,
        vincularCurso
    };
}