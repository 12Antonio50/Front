import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Cookies from 'js-cookie';

const PublicoGrafica = ({ className }) => {
    const token = Cookies.get('token');
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [chartSize, setChartSize] = useState({ width: 400, height: 400 });
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
            'https://servidor-61h9.onrender.com/API/v1/publico/obtener/porcentaje/respuestas',
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

            console.log("Datos recibidos (formateados):", formattedData); // Verificar los datos formateados
            setEncuestasPorMes(formattedData); // Actualizar el estado con los datos formateados
        })
        .catch(error => {
            console.error('Error al obtener los datos los alumnos:', error);
        });
    }, [token, anioActual]); // Se incluye el token como dependencia para que la solicitud se realice cada vez que el token cambie

    useEffect(() => {
        if (chartInstance.current !== null) {
            chartInstance.current.destroy();
        }

        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            chartInstance.current = new Chart(ctx, {
                type: 'line', // Cambiar a línea
                data: {
                    labels: Object.keys(encuestasPorMes),
                    datasets: [
                        {
                            label: 'Alumnos registrados',
                            data: Object.values(encuestasPorMes).map(mes => mes.total),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderWidth: 1,
                            fill: true // Rellenar bajo la línea
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
    }, [chartSize, encuestasPorMes]); 

    useEffect(() => {
        const updateChartSize = () => {
            if (chartRef.current) {
                setChartSize({
                    width: chartRef.current.offsetWidth,
                    height: chartRef.current.offsetHeight
                });
            }
        };

        updateChartSize(); 
        window.addEventListener('resize', updateChartSize); 

        return () => {
            window.removeEventListener('resize', updateChartSize); 
        };
    }, []);

    return <canvas ref={chartRef} className={className} />;
};

export default PublicoGrafica;
