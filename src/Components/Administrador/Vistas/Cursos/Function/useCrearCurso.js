import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useCrearCurso() {
    const [valorFormulario, setValorFormulario] = useState({
        Curso: '',
        Area: '',
        Creador: '',
        Duracion: '',
        Inicio: '',
        Fin: ''
    });
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const token = Cookies.get('token');
    const correo = Cookies.get('correo');

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setValorFormulario((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));
    };

    const limpiarFormulario = () => {
        setValorFormulario({
            Curso: "",
            Area: "",
            Creador: "",
            Duracion: "",
            Inicio: "",
            Fin: ""
        });
    }

    const enviarFormulario = async () => {
        const { Curso, Area, Duracion, Inicio, Fin } = valorFormulario;
        if (!Curso || !Area || !Duracion || !Inicio || !Fin) {
            setMensajeAlerta('Por favor, complete todos los campos antes de guardar');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
            return;
        }

        const inicioString = Inicio.toString();
        const finString = Fin.toString();

        try {
            const nuevosDatos = {
                curso: Curso,
                area: Area,
                creador: correo,
                duracion: Duracion,
                inicio: inicioString,
                fin: finString
            };

            const url = `https://servidor-61h9.onrender.com/API/v1/cursos/crear/cursos`;

            //Crear nuevo curso
            const respuesta = await axios.post(url, nuevosDatos, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (respuesta.status === 200) {
                setMensajeAlerta('Curso creado correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    // Recargar la página después de una edición exitosa
                    window.location.reload();
                }, 5000);
            } else {
                setMensajeAlerta('Error al crear el curso');
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