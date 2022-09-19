import React, { useState } from "react";
import { Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import "../styles/LoginPage.css";
import {login} from '../redux/reducer/loginSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = props => {
    const [user, setUser]=useState("");
    const [password, setPassword]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (user==='ADM' && password==='Matilde.01'){
            dispatch(
                login({
                    user: user,
                    password: password,
                    loggedIn: true
                })
            );
            
            navigate("/indexpage");

        }else{
            alert("Credenciales incorrectas");
        }
        
    };

    const onUserChange=(event)=>{
        setUser(event.target.value);
    }

    const onPasswordChanged=(event)=>{
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
                                    <Image style={{ alignSelf: 'center' }} src={require('../images/logo.png')} />
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