import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Chart from 'chart.js/auto';

const RespuestasEscalaGrafica = () => {
    const token = Cookies.get('token');
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [encuestas, setEncuestas] = useState([]);
    const [selectedEncuesta, setSelectedEncuesta] = useState('');
    const [encuestasData, setEncuestasData] = useState([]);

    const obtenerEncuestas = useCallback(async () => {
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/encuestas/obtener/encuetas`;
            const respuesta = await axios.get(url, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setEncuestas(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffect(() => {
        obtenerEncuestas();
    }, [token, obtenerEncuestas]);

    const handleEncuestaChange = (event) => {
        setSelectedEncuesta(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://servidor-61h9.onrender.com/API/v1/obtener/respuestas/tipo/escala',
                    { titulo: selectedEncuesta },
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                const data = response.data;
                console.log('Datos de encuestas recibidos:', data);
                setEncuestasData(data.resultados);
            } catch (error) {
                console.error('Error al obtener datos de encuestas:', error);
            }
        };

        if (selectedEncuesta) {
            fetchData();
        }
    }, [token, selectedEncuesta]);

    useEffect(() => {
        const renderChart = () => {
            const ctx = chartRef.current.getContext('2d');
    
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
    
            if (encuestasData && encuestasData.length > 0) {
                // Encontrar el valor máximo de los datos
                const maxDataValue = Math.max(...encuestasData.map(encuesta => encuesta.promedio));
    
                const datasets = encuestasData.map((encuesta) => ({
                    label: encuesta.pregunta,
                    data: [encuesta.promedio], // Aquí estamos asumiendo que solo hay un valor de promedio por pregunta
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }));
    
                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: encuestasData.map(encuesta => encuesta.pregunta),
                        datasets,
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: maxDataValue, // Establecer el valor máximo como el valor máximo de los datos
                            },
                        },
                    },
                });
    
                chartRef.current.style.display = 'block';
            } else {
                chartRef.current.style.display = 'none';
            }
        };
    
        renderChart();
    }, [encuestasData]);
    


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <select
                        className="form-select"
                        value={selectedEncuesta}
                        onChange={handleEncuestaChange}
                    >
                        <option value="">Seleccione una encuesta</option>
                        {encuestas.map((encuesta) => (
                            <option key={encuesta.id} value={encuesta.titulo}>
                                {encuesta.titulo}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <canvas ref={chartRef} />
                </div>
            </div>
        </div>
    );
};

export default RespuestasEscalaGrafica;
