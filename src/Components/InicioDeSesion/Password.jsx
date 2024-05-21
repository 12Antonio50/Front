import React, { useState } from "react";
import fondoImagen from "../../img/pluma.png";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import axios from "axios";

const Password = () => {

    const [correo, setCorreo] = useState("");
    const [alerta, setAlerta] = useState(null);

    const restablecerPassword = async (event) => {
        event.preventDefault();
        try {
            const url = `https://servidor-61h9.onrender.com/API/v1/usuario/reenviar/correo-scquick`;
            await axios.patch(url, {
                correo: correo
            });
            mostrarAlerta("La contraseña ha sido restablecida. Por favor, revise su correo electrónico para obtener la nueva contraseña.", "success");
        } catch (error) {
            console.error(error);
            mostrarAlerta("Ocurrió un error al restablecer la contraseña. Por favor, inténtelo de nuevo más tarde.", "danger");
        }
    }

    //Función para mostrar los mensajes en alertas
    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mensaje, tipo });
        setTimeout(() => {
            setAlerta(null);
        }, 3000);
    }

    const estiloFondo = {
        backgroundImage: `url(${fondoImagen})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
    };

    const estiloCardContenedor = {
        background: "rgba(255, 255, 255, 0.5)",
        width: "100%",
        maxWidth: "500px",
        borderRadius: "10px",
        margin: "auto",
        padding: "40px",

    };

    const estiloCard = {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
    };

    const estiloInput = {
        background: "none",
        border: "none",
        borderBottom: "2px solid #FFFFFF",
    };

    const estiloBTN = {
        backgroundColor: "#d19e00",
        border: "1px solid #d19e00",
        width: "200px",
        color: "#FFFFFF",
    };

    const estiloBtnURL = {
        border: "none",
        background: "none",
        color: "#d19e00",
        cursor: "pointer",
    }


    return (
        <div className="container-fluid d-flex vh-100 justify-content-center align-items-center" style={estiloFondo}>
            <div className="card" style={estiloCardContenedor}>
                <div className="card " style={estiloCard}>
                    <div className="container">
                        <div className="d-flex justify-content-center align-items-center my-5">
                            <h2 style={{ whiteSpace: 'nowrap' }}>Restablecer contraseña</h2>
                        </div>
                        <form>
                            <div className="mb-4">
                                <input
                                    style={estiloInput}
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo electrónico"
                                />
                            </div>
                            <div className="mb-4">
                                <div className="d-flex justify-content-end">
                                    <Link style={estiloBtnURL} to="/">Volvel al inicio</Link>
                                </div>
                            </div>
                            <div className="text-center mb-5">
                                <button
                                    style={estiloBTN}
                                    className="btn btn-primary my-3"
                                    onClick={restablecerPassword}
                                >
                                    Restablecer
                                </button>
                            </div>
                        </form>
                    </div>
                    {alerta && <Alert variant={alerta.tipo}>{alerta.mensaje}</Alert>}
                </div>
            </div>
        </div>
    );
}

export default Password;