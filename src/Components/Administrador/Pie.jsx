import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Cookies from "js-cookie";

const PieChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [cursosData, setCursosData] = useState([]);
    const token = Cookies.get('token');

    // Función para generar una paleta de colores basada en el número de cursos
    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = (i * 360) / numColors;
            colors.push(`hsla(${hue}, 70%, 50%, 0.7)`);
        }
        return colors;
    };

    // Llamada a la API para obtener los datos de los cursos
    useEffect(() => {
        axios.post(
            'https://servidor-61h9.onrender.com/API/v1/cursos/porcentaje/publico',
            null,
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        )
        .then(response => {
            // Actualizar el estado con los datos recibidos
            setCursosData(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error al obtener los datos del curso:', error);
        });
    }, [token]);

    useEffect(() => {
        if (cursosData && cursosData.length > 0) {
            const cursosLabels = cursosData.map(curso => curso.curso);
            const personasRegistradas = cursosData.map(curso => curso.numeroPublico);
            const numCursos = cursosLabels.length;
            const backgroundColor = generateColors(numCursos);

            const ctx = chartRef.current.getContext('2d');

            // Limpiar el gráfico anterior si existe
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: cursosLabels,
                    datasets: [{
                        label: 'Cantidad de alumnos Registradas',
                        data: personasRegistradas,
                        backgroundColor: backgroundColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Cantidad de alumnos registradas por curso'
                        }
                    }
                }
            });
        }
    }, [cursosData]);

    return <canvas ref={chartRef} />;
};

export default PieChart;
