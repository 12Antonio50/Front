import React from 'react';
import { Container, Col, Row, Card, ListGroup, Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import useEditarUsuario from '../../Administrador/Menu/ComponentesMenu/Functions/UsuarioFuncion';
import Menu from "./Menu";
import Cookies from "js-cookie";

const UsuariosDocente = () => {
    const {
        manejarPreventDefault,
        manejarCambioInput,
        editarUsuario,
        manejoMultiplesCambios,
        alternarModal,
        modalAbierto,
        usuario,
        formularioUsuario,
        password,
        mostrarAlerta,
        mensajeAlerta
    } = useEditarUsuario();

    const estiloContenedorFluid = {
        background: "#FFFFFF",
    };

    const usuarioRol = Cookies.get('rol');

    const renderizarOpcion = () => {
        if (usuarioRol !== 'AP' && usuarioRol !== 'D') {
            return (
                <>
                    <ListGroup.Item>
                        <Row>
                            <Col md={3}>
                                Área
                            </Col>
                            <Col md={9}>
                                <Form.Select aria-label="Seleccionar Acción" name="Area" value={formularioUsuario.Area} onChange={manejarCambioInput}>
                                    <option>Seleccionar una área</option>
                                    <option value="A">Administración</option>
                                    <option value="C">Contaduria</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={3}>
                                Rol
                            </Col>
                            <Col md={9}>
                                <Form.Select aria-label="Seleccionar Acción" name="Rol" value={formularioUsuario.Rol} onChange={manejarCambioInput}>
                                    <option>Seleccionar un rol</option>
                                    <option value="A">Administrador</option>
                                    <option value="AP">Administrador de apoyo</option>
                                    <option value="D">Docente</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </>
            );
        }
    }

    return (
        <>
            <Menu />

            <Container fluid style={estiloContenedorFluid}>
                <Row className="justify-content-center align-items-center h-100">
                    <Col xs={12} md={12} className="my-3">
                        <Card>
                            <Card.Body className="my-5">
                                <Row>
                                    <Col md={6}>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Card.Title>Información</Card.Title>
                                        </div>
                                        <Row className="g-0">
                                            <Col md={6}>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroup.Item>Nombre</ListGroup.Item>
                                                    <ListGroup.Item>Apellido paterno</ListGroup.Item>
                                                    <ListGroup.Item>Apellido materno</ListGroup.Item>
                                                    <ListGroup.Item>Correo electrónico</ListGroup.Item>
                                                    <ListGroup.Item>Área</ListGroup.Item>
                                                    <ListGroup.Item>Rol</ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                            <Col md={6}>
                                                {usuario ? (
                                                    <ListGroup className="list-group-flush">
                                                        <ListGroup.Item>{usuario.nombre}</ListGroup.Item>
                                                        <ListGroup.Item>{usuario.apellido_paterno}</ListGroup.Item>
                                                        <ListGroup.Item>{usuario.apellido_materno}</ListGroup.Item>
                                                        <ListGroup.Item>{usuario.correo}</ListGroup.Item>
                                                        <ListGroup.Item>{usuario.area}</ListGroup.Item>
                                                        <ListGroup.Item>{usuario.rol}</ListGroup.Item>
                                                    </ListGroup>
                                                ) : (
                                                    <p>Cargando datos...</p>
                                                )}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Card.Title>Actualizar información</Card.Title>
                                        </div>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col md={3}>
                                                        Nombre
                                                    </Col>
                                                    <Col md={9}>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Ingrese nombre"
                                                            name="Nombre"
                                                            value={formularioUsuario.Nombre}
                                                            onChange={manejarCambioInput}
                                                        />
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col md={3}>
                                                        Apellido paterno
                                                    </Col>
                                                    <Col md={9}>
                                                        <Form.Control
                                                            type="text"
                                                            name="Apellido_paterno"
                                                            placeholder="Ingrese apellido paterno"
                                                            value={formularioUsuario.Apellido_paterno}
                                                            onChange={manejarCambioInput}
                                                        />
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col md={3}>
                                                        Apellido materno
                                                    </Col>
                                                    <Col md={9}>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Ingrese apellido materno"
                                                            name="Apellido_materno"
                                                            value={formularioUsuario.Apellido_materno}
                                                            onChange={manejarCambioInput}
                                                        />
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col md={3}>
                                                        Correo electrónico
                                                    </Col>
                                                    <Col md={9}>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Ingrese correo electrónico"
                                                            name="CorreoCambio"
                                                            value={formularioUsuario.CorreoCambio || ''}
                                                            onChange={manejarCambioInput}
                                                        />
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {renderizarOpcion()}
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col md={3}>
                                                        Contraseña
                                                    </Col>
                                                    <Col md={9}>
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Ingrese contraseña"
                                                            onCopy={manejarPreventDefault}
                                                            onCut={manejarPreventDefault}
                                                            name="ConfirmarPasword"
                                                            value={formularioUsuario.ConfirmarPasword}
                                                            onChange={manejarCambioInput}
                                                            id="inputPassword5"
                                                            aria-describedby="passwordHelpBlock"
                                                        />
                                                        <Form.Text id="passwordHelpBlock" muted>
                                                            Tu contraseña debe tener entre 10 y 20 caracteres, contener letras y números, y no debe contener espacios ni emojis.
                                                        </Form.Text>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col md={3}>
                                                        Confirmar contraseña
                                                    </Col>
                                                    <Col md={9}>
                                                        <Form.Group controlId="password">
                                                            <Form.Control
                                                                type="password"
                                                                placeholder="Ingrese contraseña"
                                                                name="Password"
                                                                value={password}
                                                                onChange={manejoMultiplesCambios}
                                                                onCopy={manejarPreventDefault}
                                                                onCut={manejarPreventDefault}
                                                            />
                                                        </Form.Group>
                                                        <p>{password}</p>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                                {mostrarAlerta && (
                                    <div className="contenedor-alerta d-flex justify-content-center aling-items-center">
                                        <div className="mensaje-alerta" style={{ fontSize: "25px", color: "red" }}>{mensajeAlerta}</div>
                                    </div>
                                )}
                                <Button style={{ background: "#2C4A52", border: "none" }} onClick={() => alternarModal(true)} className="w-100">Actualizar datos</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal
                show={modalAbierto}
                onHide={() => alternarModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center justify-content-center">
                    ¿Está seguro de que desea guardar los cambios editados?
                </Modal.Body>
                <Modal.Footer className="d-flex align-items-center justify-content-between">
                    <Button variant="secondary" onClick={() => alternarModal(false)}>Cancelar</Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            editarUsuario();
                            alternarModal(false);
                        }}
                    >
                        Aceptar
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UsuariosDocente;
