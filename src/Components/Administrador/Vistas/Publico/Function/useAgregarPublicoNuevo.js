import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useAgregarPublicoNuevo() {
    const [valorFormulario, setValorFormulario] = useState({
        Nombre: '',
        Correo: '',
        Telefono: '',
        Celular: '',
        Fecha: new Date().toISOString().split('T')[0], // Obtiene la fecha actual y la formatea como "YYYY-MM-DD"
    });
    const token = Cookies.get('token');
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setValorFormulario((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));
    };

    const limpiarFormulario = () => {
        setValorFormulario({
            Correo: "",
            Nombre: "",
            Telefono: "",
            Celular: "",
        });
    }

    const enviarFormulario = async () => {
        const { Correo, Nombre, Telefono, Celular, Fecha } = valorFormulario;
        if (!Correo || !Nombre || !Telefono || !Celular || !Fecha) {
            setMensajeAlerta('Por favor, complete todos los campos antes de guardar');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMensajeAlerta(false);
            }, 5000)
            return;
        }

        try {
            const nuevosDatos = {
                correo: Correo,
                nombre: Nombre,
                telefono: Telefono,
                celular: Celular,
                fecha: Fecha,
            };

            const url = `https://servidor-61h9.onrender.com/API/v1/publico/crear`;

            const respuesta = await axios.post(url, nuevosDatos, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (respuesta.status === 200) {
                limpiarFormulario();
                setMensajeAlerta('Usuario registrado correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    // Recargar la página después de una edición exitosa
                    window.location.reload();
                }, 5000);
            } else {
                setMensajeAlerta('Error al registrar al usuario');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return {
        manejarCambioInput,
        enviarFormulario,
        limpiarFormulario,
        valorFormulario,
        mostrarAlerta,
        mensajeAlerta,
    }
}
