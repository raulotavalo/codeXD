import React, {useState} from "react";
import SideBar from "../../components/SideBar";
import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal, Table} from 'react-bootstrap';
import { DatePicker } from "@material-ui/pickers";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import "../../styles/Container.css"


const ReprocesoRecaudoTablet = props => {
    //VARIABLES DE USUARIO
    const user = useSelector(selectUser);

    return (
        user ?
        <Row className="editCode">
                <SideBar/>
                <Col>
                <Row id="iniPage">
                <Col>               
                        <br />
                        <Card>
                            <Card.Body>
                            <Form id="addCodeForm">
                                <Row><h2>Reproceso tablet</h2></Row>
                                <br />
                            </Form>
                        </Card.Body>
                    </Card>
                    <br />
                    
                    </Col>
                </Row>
            </Col>
            
        </Row> : <h1>No esta logeado</h1>
    );
};



export default ReprocesoRecaudoTablet;