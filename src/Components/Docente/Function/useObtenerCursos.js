import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useObtenerCursos() {
    const token = Cookies.get('token');
    const correo = Cookies.get('correo');
    const [docente, setDocente] = useState({});
    const [cursos, setCursos] = useState([]);
    const [cursosFiltrados, setCursosFiltrados] = useState([]);

    const buscardocente = useCallback(async () => {
        try {
            console.log("Buscando docente...");
            const url = `https://servidor-61h9.onrender.com/API/v1/usuario/obtenerUnico/SCQuick`;
            const dato = { correo: correo };
            const respuesta = await axios.post(url, dato, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            console.log("Docente encontrado:", respuesta.data);
            setDocente(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    }, [correo, token]);

    const obtenerCursos = useCallback(async () => {
        try {
            console.log("Obteniendo cursos...");
            const url = `https://servidor-61h9.onrender.com/API/v1/cursos/buscar`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            console.log("Cursos encontrados:", respuesta.data);
            setCursos(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffect(() => {
        obtenerCursos();
    }, [token, obtenerCursos]);

    useEffect(() => {
        buscardocente();
    }, [token, buscardocente]);

    useEffect(() => {
        if (docente.cursos && docente.cursos.length > 0 && cursos.length > 0) {
            console.log("Filtrando cursos del docente...");
            const cursosDelDocente = [];
            docente.cursos.forEach(cursoDocente => {
                const cursoEncontrado = cursos.find(curso => curso.curso === cursoDocente);
                if (cursoEncontrado) {
                    cursosDelDocente.push(cursoEncontrado);
                }
            });
            console.log("Cursos del docente encontrados:", cursosDelDocente);
            setCursosFiltrados(cursosDelDocente);
        }
    }, [docente, cursos]);

    const obtenerFechasCursos = () => {
        const fechasCursos = [];
        cursosFiltrados.forEach(curso => {
            fechasCursos.push({ inicio: curso.inicio, fin: curso.fin });
        });
        return fechasCursos;
    };

    return {
        docente,
        cursosFiltrados,
        obtenerFechasCursos,
    };
}
