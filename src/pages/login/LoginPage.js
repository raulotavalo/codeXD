import React, { useState } from "react";
import { Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import "../../styles/LoginPage.css";
import {login} from '../../redux/reducer/loginSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageLogo from "../../components/ImageLogo";
import soapLogin from "../../soap/soapLogin";

const LoginPage = props => {
    const [user, setUser]=useState("");
    const [password, setPassword]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e) =>  {
        e.preventDefault();
        const data = await soapLogin(user, password);
        alert(data);
        if (user==='ADM' && password==='Matilde.02'){
            dispatch(
                login({
                    user: user,
                    name: 
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
                                    <ImageLogo/>
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