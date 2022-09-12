import React from "react";
import Sidebar from "../components/Sidebar"
import Header from "../components/commons/Header"
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button} from 'react-bootstrap'


const IndexPage = props => {
    return (
        <div className="main">

            
           
            <Sidebar />

            
            <div className="container">
                <Row id="iniPage">
                
                    <Col>
                        <h1>Bienvenido !!!</h1>
                        <Card>
                            <Card.Body>
                            <Form id="addCodeForm">
                                
                                <Row>
                                    <Col xs={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label >Ingrese el código del material:</Form.Label>
                                            <Form.Control type="text" placeholder="Código material" id="codMat" name="codMat" required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Ingrese la descripción del Material:</Form.Label>
                                            <Form.Control type="text" placeholder="Descripción del material" id="descMat" name="descMat" required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};



export default IndexPage;