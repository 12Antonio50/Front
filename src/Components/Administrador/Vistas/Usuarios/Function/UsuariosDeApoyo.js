import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useUsuariosDeApoyo() {
    const token = Cookies.get('token');
    const [usuariosApoyo, setUsuariosApoyo] = useState([]);
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
        Rol: ''
    });
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
            correoCambio: "",
            Nombre: "",
            Apellido_paterno: "",
            Apellido_materno: "",
            Area: "",
            Rol: ""
        });
    }

    const obtenerUsuariosApoyo = useCallback(async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/usuario/buscar/administrador-apoyo-scquick`;
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

    const manejarSeleccionUsuario = (usuario) => {
        if (usuarioSeleccionado && usuarioSeleccionado.id === usuario.id) {
            setUsuarioSeleccionado(null);
        } else {
            setUsuarioSeleccionado(usuario);
        }
    };

    useEffect(() => {
        if (token) {
            obtenerUsuariosApoyo();
        }
    }, [obtenerUsuariosApoyo, token]);

    useEffect(() => {
        console.log("Usuario seleccionado:", usuarioSeleccionado);
    }, [usuarioSeleccionado]);

    const eliminarUsuario = async () => {
        if (usuarioSeleccionado) {
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
                    obtenerUsuariosApoyo();
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
            console.log('No se ha seleccionado ningún usuario para eliminar.');
        }
    };

    const editarUsuario = async () => {
        try {
            if (!usuarioSeleccionado) {
                console.error("No hay usuario seleccionado para editar.");
                return;
            }

            const url = `https://servidor-61h9.onrender.com/API/v1/usuario/actualizar-scquick`;;

            const correoEditado = valorFormulario.CorreoCambio || valorFormulario.CorreoOriginal;

            const datosEditados = {
                correoOriginal: usuarioSeleccionado.correo,
                correoCambio: correoEditado,
                nombre: valorFormulario.Nombre || usuarioSeleccionado.nombre,
                apellido_paterno: valorFormulario.Apellido_paterno || usuarioSeleccionado.apellido_paterno,
                apellido_materno: valorFormulario.Apellido_materno || usuarioSeleccionado.apellido_materno,
                area: valorFormulario.Area|| usuarioSeleccionado.area,
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

                obtenerUsuariosApoyo();
            } else {
                setMensajeAlerta('Error al editar el usuario');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error al editar el usuario:', error);
            if (error.response) {
                console.error('Respuesta de la API:', error.response.data);
            } else if (error.request) {
                console.error('Solicitud no recibió respuesta:', error.request);
            } else {
                console.error('Error en la configuración de la solicitud:', error.message);
            }
        }
    };

    const usuarioFiltrados = usuariosApoyo.filter(usuario =>
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const [modalVisible, setModalVisible] = useState(false);
    const elementosPorPagina = 10;
    const [paginaActual, setPaginaActual] = useState(1);

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const usuariosApoyoPaginaActual = usuariosApoyo.slice(indicePrimerElemento, indiceUltimoElemento);
    const totalPaginas = Math.ceil(usuarioFiltrados.length / elementosPorPagina);

    const manejarCambioPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

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
    }

    return {
        mostrarAlerta,
        mensajeAlerta,
        usuarioSeleccionado,
        valorFormulario,
        usuariosApoyoPaginaActual,
        modalVisible,
        totalPaginas,
        paginaActual,
        busqueda,
        usuarioFiltrados,
        indiceUltimoElemento,
        indicePrimerElemento,
        setBusqueda,
        abrirModal,
        cerrarModal,
        accionBoton,
        manejarSeleccionUsuario,
        eliminarUsuario,
        manejarCambioInput,
        limpiarFormulario,
        manejarCambioPagina
    };
}
