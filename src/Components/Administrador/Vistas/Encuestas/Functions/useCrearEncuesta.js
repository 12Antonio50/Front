import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useCrearEncuesta() {
    const [valorFormulario, setValorFormulario] = useState({
        Titulo: '',
        Descripcion: '',
        Fecha: '',
        Preguntas: []
    });
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const token = Cookies.get('token');
    const correo = Cookies.get('correo');
    const [permitirSeleccionMultiple, setPermitirSeleccionMultiple] = useState(false);
    const [preguntas, setPreguntas] = useState([]);
    const [tipoPregunta, setTipoPregunta] = useState("");
    const [pregunta, setPregunta] = useState("");
    const [preguntaObligatoria, setPreguntaObligatoria] = useState(false);
    const [opciones, setOpciones] = useState([]);
    const [opcionTexto, setOpcionTexto] = useState("");
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(10);

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setValorFormulario((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));
    };

    const limpiarFormulario = () => {
        setValorFormulario({
            Titulo: "",
            Descripcion: "",
            Fecha: "",
        });
    }

    const enviarFormulario = async () => {
        const { Titulo, Descripcion, Fecha, Preguntas } = valorFormulario;
        if (!Titulo || !Descripcion || !Fecha || Preguntas.length === 0) {
            setMensajeAlerta('Por favor, complete todos los campos y al menos una pregunta antes de guardar');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMensajeAlerta(false);
            }, 5000);
            return;
        }
    
        try {
            const nuevosDatos = {
                titulo: Titulo,
                descripcion: Descripcion,
                fecha: Fecha,
                creador: correo,
                preguntas: Preguntas,
            };
    
            console.log(nuevosDatos)
    
            const url = `https://servidor-61h9.onrender.com/API/v1/encuestas/crear/encuesta`;
    
            const respuesta = await axios.post(url, nuevosDatos, {
                headers: {
                    Authorization: `${token}`,
                },
            });
    
            if (respuesta.status === 200) {
                limpiarFormulario();
                setMensajeAlerta('Encuesta creada correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    // Recargar la página después de una edición exitosa
                    //window.location.reload();
                }, 5000);
            } else {
                setMensajeAlerta('Error al crear la encuesta');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            }
    
        } catch (error) {
            console.error(error);
        }
    };    

    const handleAgregarOpcion = () => {
        if (opcionTexto.trim() !== "") {
            setOpciones([...opciones, { texto: opcionTexto, seleccionada: false }]);
            setOpcionTexto("");
        }
    };

    const handleCrearPregunta = () => {
        // Verificar que los campos no estén vacíos
        if (tipoPregunta.trim() === "" || pregunta.trim() === "") {
            alert("Por favor completa todos los campos");
            return;
        }

        // Crear la nueva pregunta
        const nuevaPregunta = {
            texto: pregunta,
            tipo: tipoPregunta,
            opciones: opciones
        };

        // Actualizar las preguntas en el estado valorFormulario
        setValorFormulario(prevState => ({
            ...prevState,
            Preguntas: [...prevState.Preguntas, nuevaPregunta]
        }));

        // Reiniciar los valores después de agregar la pregunta
        setTipoPregunta("");
        setPregunta("");
        setOpciones([]);
        setOpcionTexto("");
        setMinValue(0);
        setMaxValue(10);
        setPreguntaObligatoria(false);
    };

    const handleEliminarPregunta = (id) => {
        const nuevasPreguntas = preguntas.filter(pregunta => pregunta.id !== id);
        setPreguntas(nuevasPreguntas);

        const preguntasActualizadas = nuevasPreguntas.map((pregunta, index) => ({
            ...pregunta,
            id: index + 1
        }));
        setPreguntas(preguntasActualizadas);
    };

    const toggleSeleccion = (index) => {
        const nuevasOpciones = [...opciones];
        nuevasOpciones[index].seleccionada = !nuevasOpciones[index].seleccionada;
        setOpciones(nuevasOpciones);
    };

    return {
        enviarFormulario,
        manejarCambioInput,
        setPermitirSeleccionMultiple,
        handleAgregarOpcion,
        handleCrearPregunta,
        handleEliminarPregunta,
        toggleSeleccion,
        setTipoPregunta,
        setPregunta,
        setPreguntaObligatoria,
        setMinValue,
        setMaxValue,
        setOpcionTexto,
        opciones,
        opcionTexto,
        pregunta,
        tipoPregunta,
        maxValue,
        minValue,
        preguntaObligatoria,
        permitirSeleccionMultiple,
        mensajeAlerta,
        mostrarAlerta,
        valorFormulario
    }
}