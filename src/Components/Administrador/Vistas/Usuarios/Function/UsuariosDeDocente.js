import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useUsuariosDeDocente() {
    const token = Cookies.get('token');
    const [usuariosDocente, setUsuariosDocentes] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [valorFormulario, setValorFormulario] = useState({
        CorreoOriginal: '',
        CorreoCambio: '',
        Nombre: '',
        Apellido_materno: '',
        Apellido_paterno: '',
        Area: '',
        Rol: '',
        Cursos: []
    });
    const [modalVisible, setModalVisible] = useState(false);
    const elementosPorPaginaDocente = 10;
    const [paginaActualDocente, setPaginaActualDocente] = useState(1);
    const [checkboxSeleccionados, setCheckboxSeleccionados] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setValorFormulario((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));
    };

    const limpiarFormulario = () => {
        setValorFormulario({
            CorreoCambio: "",
            Nombre: "",
            Apellido_paterno: "",
            Apellido_materno: "",
            Area: "",
            Rol: "",
            Cursos: []
        });
        setCheckboxSeleccionados([]);
    };

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

    const manejarSeleccionUsuario = (usuario) => {
        if (usuarioSeleccionado && usuarioSeleccionado.id === usuario.id) {
            setUsuarioSeleccionado(null);
        } else {
            setUsuarioSeleccionado(usuario);
        }
    };

    useEffect(() => {
        console.log("Usuario seleccionado:", usuarioSeleccionado);
    }, [usuarioSeleccionado]);

    const eliminarUsuario = async () => {
        if (usuarioSeleccionado) {
            if (usuarioSeleccionado.cursos.length > 0) {
                setMensajeAlerta('El usuario tiene cursos asociados y no puede ser eliminado.');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
                return;
            }
            const correo = usuarioSeleccionado.correo;
            try {
                const url = `https://servidor-61h9.onrender.com/API/v1/usuario/eliminar-scquick`;
                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `${token}`,
                    },
                    data: {
                        correo: correo
                    },
                });

                if (response.status === 200) {
                    setMensajeAlerta('Usuarios eliminado correctamente');
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 5000);
                    obtenerUsuariosDocentes();
                } else {
                    setMensajeAlerta('Error al eliminar el usuario');
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 5000);
                }
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        } else {
            setMensajeAlerta('No se ha seleccionado ningún usuario para eliminar.');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
        }
    };

    const editarUsuario = async () => {
        try {
            if (!usuarioSeleccionado) {
                setMensajeAlerta('No hay usuario seleccionado para editar.');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
                return;
            }

            if (usuarioSeleccionado.cursos.length > 0 && valorFormulario.Rol !== usuarioSeleccionado.rol) {
                setMensajeAlerta('El usuario tiene cursos asociados y no se puede cambiar su rol.');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
                return;
            }

            const url = `https://servidor-61h9.onrender.com/API/v1/usuario/actualizar-scquick`;
            const correoEditado = valorFormulario.CorreoCambio || valorFormulario.CorreoOriginal;

            const datosEditados = {
                correoOriginal: usuarioSeleccionado.correo,
                correoCambio: correoEditado,
                nombre: valorFormulario.Nombre || usuarioSeleccionado.nombre,
                apellido_paterno: valorFormulario.Apellido_paterno || usuarioSeleccionado.apellido_paterno,
                apellido_materno: valorFormulario.Apellido_materno || usuarioSeleccionado.apellido_materno,
                area: valorFormulario.Area || usuarioSeleccionado.area,
                rol: valorFormulario.Rol || usuarioSeleccionado.rol,
            };

            const respuesta = await axios.patch(url, datosEditados, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            console.log('Respuesta de la API:', respuesta.data);

            if (respuesta.status === 200) {
                setMensajeAlerta('Usuario editado correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);

                obtenerUsuariosDocentes();
            } else {
                setMensajeAlerta('Error al editar el usuario');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error al editar el usuario:', error);
        }
    };


    const desvincularCurso = async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/usuario/quitar-curso`;

            const correoBusqueda = usuarioSeleccionado.correo;

            for (const cursoSeleccionado of checkboxSeleccionados) {
                const enviarDatos = {
                    correo: correoBusqueda,
                    curso: cursoSeleccionado,
                };

                console.log('Enviando datos para desvincular curso:', enviarDatos);

                const respuesta = await axios.patch(url, enviarDatos, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                if (respuesta.status === 200) {
                    console.log(`Curso "${cursoSeleccionado}" desvinculado correctamente`);
                    obtenerUsuariosDocentes();
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

    const usuarioFiltrados = usuariosDocente.filter(usuario =>
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const indiceUltimoElementoDocente = paginaActualDocente * elementosPorPaginaDocente;
    const indicePrimerElementoDocente = indiceUltimoElementoDocente - elementosPorPaginaDocente;

    const usuariosDocentePaginaActual = usuariosDocente.slice(indicePrimerElementoDocente, indiceUltimoElementoDocente);

    const totalPaginasDocente = Math.ceil(usuarioFiltrados.length / elementosPorPaginaDocente);

    const manejarCambioPaginaDocente = (numeroPagina) => {
        setPaginaActualDocente(numeroPagina);
    }

    const abrirModal = () => {
        setModalVisible(true);
        if (usuarioSeleccionado) {
            setValorFormulario({
                CorreoCambio: usuarioSeleccionado.correo,
                Nombre: usuarioSeleccionado.nombre,
                Apellido_paterno: usuarioSeleccionado.apellido_paterno,
                Apellido_materno: usuarioSeleccionado.apellido_materno,
                Area: usuarioSeleccionado.area,
                Rol: usuarioSeleccionado.rol,
            });
        }
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };

    const accionBoton = () => {
        cerrarModal();
        editarUsuario();
        if (checkboxSeleccionados.length > 0) {
            desvincularCurso();
        } else {
            editarUsuario();
        }
    };

    return {
        mostrarAlerta,
        mensajeAlerta,
        usuariosDocente,
        usuarioSeleccionado,
        valorFormulario,
        usuariosDocentePaginaActual,
        totalPaginasDocente,
        modalVisible,
        paginaActualDocente,
        checkboxSeleccionados,
        busqueda,
        usuarioFiltrados,
        indiceUltimoElementoDocente,
        indicePrimerElementoDocente,
        setBusqueda,
        manejarSeleccionUsuario,
        eliminarUsuario,
        manejarCambioInput,
        limpiarFormulario,
        editarUsuario,
        manejarCambioPaginaDocente,
        abrirModal,
        accionBoton,
        cerrarModal,
        setCheckboxSeleccionados
    }
}