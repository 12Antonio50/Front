import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useRespuestas() {
    const token = Cookies.get('token');
    const [encuestas, setEncuestas] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState([]);
    const [encuestaSeleccionada, setEncuestaSeleccionada] = useState(null);
    const [valorFormulario, setValorFormulario] = useState({
        TituloOriginal: '',
        TituloCambio: '',
        Descripcion: '',
        Fecha: '',
        Duracion: '',
        Creador: '',
        Preguntas: encuestaSeleccionada ? encuestaSeleccionada.preguntas.map(pregunta => ({ texto: '' })) : []
    });
    const [busqueda, setBusqueda] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const elementosPorPagina = 10;
    const [paginaActual, setPaginaActual] = useState(1);
    const [tipoPreguntaSeleccionado, setTipoPreguntaSeleccionado] = useState('todas');


    const obtenerEncuestas = useCallback(async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/encuestas/obtener/encuetas`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setEncuestas(respuesta.data);
            console.log(respuesta.data)
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    const manejarSeleccionEncuesta = (encuesta) => {
        if (encuestaSeleccionada && encuestaSeleccionada.id === encuesta.id) {
            setEncuestaSeleccionada(null);
        } else {
            setEncuestaSeleccionada(encuesta);
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
    }

    return {
        encuestaSeleccionada,
        valorFormulario,
        busqueda,
        modalVisible,
        paginaActual,
        encuestasFiltradas,
        indiceUltimoElemento,
        indicePrimerElemento,
        totalPaginas,
        setCursoSeleccionado,
        cursoSeleccionado,
        manejarCambioPagina,
        accionBoton,
        cerrarModal,
        manejarSeleccionEncuesta,
        abrirModal,
        setBusqueda,
        obtenerEncuestas,
        manejarCambioTab,
    };
}
