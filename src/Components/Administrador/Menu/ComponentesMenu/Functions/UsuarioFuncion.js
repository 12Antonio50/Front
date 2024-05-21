import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useEditarUsuario() {
    const [usuario, setUsuario] = useState(null);
    const [formularioUsuario, setFormularioUsuario] = useState({
        CorreoOriginal: "",
        CorreoCambio: "",
        Nombre: "",
        Apellido_paterno: "",
        Apellido_materno: "",
        Area: "",
        Rol: "",
        Password: "",
        ConfirmarPasword: ""
    });
    const token = Cookies.get('token');
    const correo = Cookies.get('correo');
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [password, setPassword] = useState('');

    // Alterna el estado del modal
    const alternarModal = (estado) => {
        setModalAbierto(estado);
    };

    // Obtiene información de usuario
    const bucarUsuario = useCallback(async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/usuario/obtenerUnico/SCQuick`;
            const dato = { correo: correo };
            const respuesta = await axios.post(url, dato, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            // Convierte los datos de área y rol recibidos a valores legibles
            respuesta.data.area = respuesta.data.area === "A" ? "Administración" : "Contaduría";
            respuesta.data.rol = respuesta.data.rol === "A" ? "Administrador" : (respuesta.data.rol === "D" ? "Docente" : "Administrador de apoyo");

            setUsuario(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    }, [correo, token]);

    // Cargar información de usuario en el montaje
    useEffect(() => {
        bucarUsuario();
    }, [token, bucarUsuario]);

    // Limpia el formulario
    const limpiarFormulario = () => {
        setFormularioUsuario({
            CorreoOriginal: "",
            CorreoCambio: "",
            Nombre: "",
            Apellido_paterno: "",
            Apellido_materno: "",
            Area: "",
            Rol: "",
            Password: "",
            ConfirmarPasword: ""
        });
    };

    // Maneja cambios en los inputs
    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setFormularioUsuario((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));
    };

    const cambioEstadoCambio = (event) => {
        setPassword(event.target.value);
    }

    const manejarPreventDefault = (event) => {
        event.preventDefault();
    };

    const manejoMultiplesCambios = (event) => {
        manejarCambioInput(event);
        cambioEstadoCambio(event);
    }

    const editarUsuario = async () => {
        // Define la función de validación dentro de `editarUsuario`
        const validarContraseña = (password) => {
            if (password === "") {
                return true;
            }
    
            // Verifica la longitud de la contraseña
            if (password.length < 10 || password.length > 20) {
                setMensajeAlerta("La contraseña debe tener entre 10 y 20 caracteres.");
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 3000);
                return false;
            }
    
            // Verifica si contiene letras y números
            const tieneLetras = /[a-zA-Z]/.test(password);
            const tieneNumeros = /\d/.test(password);
    
            // Verifica si contiene espacios o emojis
            const contieneEspaciosEmojis = /[\s\uD800-\uDBFF\uDC00-\uDFFF]/.test(password);
    
            if (!tieneLetras || !tieneNumeros || contieneEspaciosEmojis) {
                setMensajeAlerta("La contraseña debe contener letras y números, y no debe contener espacios ni emojis.");
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 3000);
                return false;
            }

            return true;
        };
    
        try {
            // Verifica si la contraseña y la confirmación de la contraseña coinciden
            if (formularioUsuario.Password !== formularioUsuario.ConfirmarPasword) {
                setMensajeAlerta("La contraseña y la confirmación de la contraseña no coinciden.");
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 3000);
                // Salir de la función sin realizar la actualización
                return;
            }
    
            // Verifica si al menos un campo del formulario tiene un valor
            const tieneCampoLleno = Object.values(formularioUsuario).some(
                (valor) => valor !== '' && valor !== null && valor !== undefined
            );
    
            if (!tieneCampoLleno) {
                setMensajeAlerta("Por favor, complete al menos un campo antes de proceder.");
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 3000);
                return;
            }
    
            // Valida la contraseña antes de proceder
            if (!validarContraseña(formularioUsuario.ConfirmarPasword)) {
                setMensajeAlerta("La contraseña no cumple con los requisitos establecidos.");
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 3000);
                // Salir de la función sin realizar la actualización
                return;
            }
    
            // Define los datos editados inicialmente a partir del formulario
            const datosEditados = {
                nombre: formularioUsuario.Nombre,
                apellido_paterno: formularioUsuario.Apellido_paterno,
                apellido_materno: formularioUsuario.Apellido_materno,
                correoOriginal: correo,
                correoCambio: formularioUsuario.CorreoCambio,
                area: formularioUsuario.Area,
                rol: formularioUsuario.Rol,
                password: formularioUsuario.ConfirmarPasword,
            };
    
            // Filtra los campos vacíos o `undefined` de `datosEditados`
            const datosEditadosFiltrados = Object.fromEntries(
                Object.entries(datosEditados).filter(([key, value]) => value !== '' && value !== null && value !== undefined)
            );
    
            // Realiza la solicitud PATCH con los datos filtrados
            const url = `https://servidor-61h9.onrender.com/API/v1/usuario/actualizar-scquick`;
            const respuesta = await axios.patch(url, datosEditadosFiltrados, {
                headers: {
                    Authorization: `${token}`,
                },
            });
    
            // Espera la función `bucarUsuario`
            await bucarUsuario();
    
            // Si la respuesta es exitosa, limpia el formulario
            if (respuesta.status === 200) {
                limpiarFormulario();
                setMensajeAlerta("Actualización correcta");
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 3000);
            } else {
                setMensajeAlerta("Error en la actualización");
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        manejarPreventDefault,
        cambioEstadoCambio,
        bucarUsuario,
        manejarCambioInput,
        editarUsuario,
        alternarModal,
        manejoMultiplesCambios,
        modalAbierto,
        usuario,
        formularioUsuario,
        mostrarAlerta,
        mensajeAlerta,
        password
    };
}