import React, { useState } from "react";
import { Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import "../../styles/LoginPage.css";
import { login } from '../../redux/reducer/loginSlice'
import { transactionMod } from '../../redux/reducer/transactionsSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageLogo from "../../components/ImageLogo";
import soapLogin from "../../soap/soapLogin";
import soapGetTransactions from "../../soap/soapGetTransactions";


const LoginPage = props => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const options = {
        htmlparser2: {
            lowerCaseTags: false,
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await soapLogin(user, password);
        const userJS = JSON.parse(data);
        if (userJS.info = 'Y') {
            dispatch(
                login({
                    idUser: userJS.idUsuario,
                    user: userJS.usuario,
                    nickName: userJS.alias,
                    state: userJS.estado,
                    ident: userJS.identificacion,
                    name: userJS.nombre,
                    salesmanCode: userJS.codigoVendedor,
                    loggedIn: true
                })
            );

            const routs = await builTransactions(userJS.idUsuario);

            console.log("RUTAS: " + JSON.stringify(routs));
            dispatch(
                transactionMod(routs)
            );
            navigate("/indexpage");

        } else {
            alert("Credenciales incorrectas");
        }

    };

    async function builTransactions(idUser) {
        const data = await soapGetTransactions(idUser, '');
        const modulesJS = JSON.parse(data);
        const routes = [];
        const parserDOM = new DOMParser();
        //await modulesJS.map(async (module, index) => {
        for (const indexModule in modulesJS) {
            const module = modulesJS[indexModule];
            const dataModule = await soapGetTransactions(idUser, module.idModulo);
            const transactionsJS = JSON.parse(dataModule);
            const subroutes = [];
            //await transactionsJS.map((transaction, index) => {
            for (const indexTransaction in transactionsJS) {
                const transaction = transactionsJS[indexTransaction];
                delete transaction['_diffgr:id'];
                delete transaction['_msdata:rowOrder'];
                transaction.iconoWeb=transaction.iconoWeb.trim();
                subroutes.push(transaction);
            }
            //});
            delete module['_diffgr:id'];
            delete module['_msdata:rowOrder'];
            module.iconoWeb=module.iconoWeb.trim();
            if (subroutes.length != 0) {
                module.subRoutes = subroutes;
            }
            routes.push(module);
        }
        //});
        return (routes);
    }

    const onUserChange = (event) => {
        setUser(event.target.value);
    }

    const onPasswordChanged = (event) => {
        setPassword(event.target.value);
    }

    return (
        <Row className="mainContainer">
            <div className='cardDivContainer'>
                <Card className='cardContainer'>
                    <Card.Body className='cardBodyContainer'>
                        <Form className='formContainer' id="loginForm" onSubmit={handleSubmit}>
                            <Col>
                                <Form.Group className="mb-3">
                                    <ImageLogo />
                                </Form.Group>
                            </Col>
                            <Col className='colContainer' xs={9}>
                                <Form.Group className="mb-3">
                                    <Form.Label >Ingrese su usuario:</Form.Label>
                                    <Form.Control type="text" placeholder="Usuario" id="codMat" onChange={onUserChange} name="codMat" required />
                                </Form.Group>
                            </Col>
                            <Col className='colContainer' xs={9}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ingrese su contraseña:</Form.Label>
                                    <Form.Control type="password" placeholder="Contraseña" id="descMat" onChange={onPasswordChanged} name="descMat" required />
                                </Form.Group>
                            </Col>
                            <Col className='colButtonContainer' xs={9}>
                                <Button variant="primary" type="submit">
                                    Ingresar
                                </Button>
                            </Col>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Row>
    );
};




export default LoginPage;