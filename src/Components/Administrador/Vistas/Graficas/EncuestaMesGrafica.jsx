import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import Chart from 'chart.js/auto';

const EncuestasMesGrafica = () => {
    const token = Cookies.get('token');
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Los meses van de 0 a 11, sumamos 1 para que vayan de 1 a 12

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://servidor-61h9.onrender.com/API/v1/encuesta/obtener/porcentaje/respuestas',
                    {
                        anio: selectedYear,
                        mes: selectedMonth
                    },
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                const data = response.data;

                // Actualizar el estado de los datos de la encuesta
                renderChart(data);
            } catch (error) {
                console.error('Error al obtener datos de encuestas:', error);
            }
        };

        fetchData();
    }, [token, selectedYear, selectedMonth]);

    // Función para renderizar el gráfico
    const renderChart = (encuestasData) => {
        const ctx = chartRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (encuestasData && encuestasData.length > 0) {
            const labels = encuestasData.map(encuesta => encuesta.encuesta);
            const respuestas = encuestasData.map(encuesta => encuesta.respuestas);

            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Número de respuestas',
                        data: respuestas,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Restablecer la visibilidad del gráfico
            chartRef.current.style.display = 'block';
        } else {
            // Si no hay datos disponibles, ocultar el gráfico
            chartRef.current.style.display = 'none';
        }
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <select id="year" className="form-select" value={selectedYear} onChange={handleYearChange}>
                        <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                        <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                    </select>
                </div>
                <div className="col">
                    <select id="month" className="form-select" value={selectedMonth} onChange={handleMonthChange}>
                        <option value={1}>Enero</option>
                        <option value={2}>Febrero</option>
                        <option value={3}>Marzo</option>
                        <option value={4}>Abril</option>
                        <option value={5}>Mayo</option>
                        <option value={6}>Junio</option>
                        <option value={7}>Julio</option>
                        <option value={8}>Agosto</option>
                        <option value={9}>Septiembre</option>
                        <option value={10}>Octubre</option>
                        <option value={11}>Noviembre</option>
                        <option value={12}>Diciembre</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <canvas ref={chartRef} />
                </div>
            </div>
        </div>
    );
};

export default EncuestasMesGrafica;
