import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Chart from 'chart.js/auto';

const EncuestasPorcentajesGenerales = () => {
    const token = Cookies.get('token');
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [encuestas, setEncuestas] = useState([]);
    const [selectedEncuesta, setSelectedEncuesta] = useState('');
    const [encuestasData, setEncuestasData] = useState([]);

    const obtenerEncuestas = useCallback(async () => {
        try {
            const url = `http://localhost:4000/API/v1/encuestas/obtener/encuetas`;
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
                    'https://servidor-61h9.onrender.com/API/v1/obtener/respuestas/tipo/opcion',
                    { titulo: selectedEncuesta },
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                const data = response.data;
                console.log(data)

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
                const datasets = encuestasData.map((encuesta) => {
                    const data = Object.values(encuesta.porcentajes);
                    const label = encuesta.pregunta;
                    return {
                        label,
                        data,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    };
                });

                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(encuestasData[0].porcentajes),
                        datasets,
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
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

export default EncuestasPorcentajesGenerales;
