import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Cookies from 'js-cookie';

const EncuestasGrafica = ({ className }) => {
    const token = Cookies.get('token');
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [encuestasPorMes, setEncuestasPorMes] = useState({});
    const anioActual = new Date().getFullYear();

    // Función para obtener el nombre del mes a partir de su número
    const getMonthName = (month) => {
        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return monthNames[month - 1];
    };

    // Llamada a la API para obtener los datos de encuestas por mes
    useEffect(() => {
        axios.post(
            'https://servidor-61h9.onrender.com/API/v1/encuesta/obtener/porcentaje/creacion',
            { anio: anioActual },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        )
        .then(response => {
            // Reestructurar los datos para que las claves sean nombres de meses
            const formattedData = {};
            Object.keys(response.data).forEach(month => {
                const monthName = getMonthName(parseInt(month));
                formattedData[monthName] = response.data[month];
            });

            console.log("Datos recibidosss (formateados):", formattedData); // Verificar los datos formateados
            setEncuestasPorMes(formattedData); // Actualizar el estado con los datos formateados
        })
        .catch(error => {
            console.error('Error al obtener los datos de las encuestas:', error);
        });
    }, [token, anioActual]);

    useEffect(() => {
        if (chartInstance.current !== null) {
            chartInstance.current.destroy();
        }

        if (chartRef && chartRef.current && Object.keys(encuestasPorMes).length > 0) { // Asegurarse de que hay datos antes de renderizar el gráfico
            const ctx = chartRef.current.getContext('2d');

            const dataValues = Object.values(encuestasPorMes).map(mes => mes.total);
            const minIndex = dataValues.indexOf(Math.min(...dataValues));
            const backgroundColors = dataValues.map((_, index) => index === minIndex ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)');
            const borderColors = dataValues.map((_, index) => index === minIndex ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)');

            chartInstance.current = new Chart(ctx, {
                type: 'bar', // Gráfica de barras
                data: {
                    labels: Object.keys(encuestasPorMes),
                    datasets: [
                        {
                            label: 'Número de encuestas creadas',
                            data: dataValues,
                            backgroundColor: backgroundColors,
                            borderColor: borderColors,
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [encuestasPorMes]);

    return <canvas ref={chartRef} className={className} />;
};

export default EncuestasGrafica;
