import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/InicioDeSesion/Login";
import Password from "./Components/InicioDeSesion/Password";
import Inicio from "./Components/Administrador/Inicio";
import InicioDocente from "./Components/Docente/Inicio";
import Cursos from "./Components/Administrador/Vistas/Cursos";
import Dashboard from "./Components/Administrador/Vistas/Dashboard";
import Encuestas from "./Components/Administrador/Vistas/Encuestas";
import Publico from "./Components/Administrador/Vistas/Publico";
import Respuestas from "./Components/Administrador/Vistas/Respuestas";
import Usuarios from "./Components/Administrador/Vistas/Usuario";
import EnviarEncuesta from "./Components/Administrador/Vistas/Cursos/EnviarEncuesta";
import Cookies from "js-cookie";
import Usuario from "./Components/Administrador/Menu/ComponentesMenu/UsuariosDocente";
import UsuariosDocente from "./Components/Docente/Menu/Usuarios";
import "./Components/Style.css";

const NotFound = () => {
  return (
    <div className="error-404">
      <h1>404</h1>
    </div>
  );
};

const Loading = () => {
  return <div>Cargando...</div>;
};

function App() {
  const [autentificado, setAutentificado] = useState(!!Cookies.get("token"));
  const [usuarioRol, setUsuarioRol] = useState(Cookies.get("rol"));
  const [loading, setLoading] = useState(true);

  const comprobarAutenticacion = () => {
    const existeToken = Cookies.get("token");
    const existeRol = Cookies.get("rol");

    if (existeToken && existeRol) {
      setAutentificado(true);
      setUsuarioRol(existeRol);
    } else {
      setAutentificado(false);
      setUsuarioRol(null);
    }
  };

  useEffect(() => {
    comprobarAutenticacion();
    setLoading(false);
  }, []);

  const getInitialRoute = () => {
    if (loading) {
        return <Loading />;
    }

    if (autentificado) {
        // Verifica el rol del usuario y redirige según el caso
        if (usuarioRol === "A" || usuarioRol === "AP") {
            return <Navigate to="/inicio" replace />;
        } else if (usuarioRol === "D") {
            return <Navigate to="/inicio-docente" replace />;
        } else {
            // Si el rol no es reconocido, redirige a /404
            return <Navigate to="/404" replace />;
        }
    } else {
        // Si no está autenticado, muestra la página de inicio de sesión
        return <Login setUsuarioRol={setUsuarioRol} setAutentificado={setAutentificado} />;
    }
};

  const requiereRol = (componente, rolesPermitidos) => {
    return autentificado && rolesPermitidos.includes(usuarioRol)
        ? componente
        : <Navigate to="/404" replace />;
  };

  return (
    <Routes>
      <Route path="/" element={getInitialRoute()} />
      <Route path="/restablecer-contraseña" element={<Password />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/enviar/:tituloEncuesta" element={<EnviarEncuesta />} />

      {autentificado && (
        <>
          <Route path="/inicio" element={requiereRol(<Inicio />, ["A", "AP"])} />
          <Route path="/inicio-docente" element={requiereRol(<InicioDocente />, ["D"])} />
          <Route path="/curso" element={requiereRol(<Cursos />, ["A", "AP"])} />
          <Route path="/dashboard" element={requiereRol(<Dashboard />, ["A", "AP"])} />
          <Route path="/encuestas" element={requiereRol(<Encuestas />, ["A", "AP"])} />
          <Route path="/publico" element={requiereRol(<Publico />, ["A", "AP"])} />
          <Route path="/respuestas" element={requiereRol(<Respuestas />, ["A", "AP"])} />
          <Route path="/usuario" element={requiereRol(<Usuarios />, ["A", "AP"])} />
          <Route path="/configuracion" element={requiereRol(<Usuario />, ["A", "AP"])} />
          <Route path="/configuracion_docente" element={requiereRol(<UsuariosDocente />, ["D"])} />
        </>
      )}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
