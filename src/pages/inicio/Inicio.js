import React from "react";
import { Row, Col, Card, Image } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import SideBar from "../../components/SideBar";
import "../../styles/IndexPage.css";
import ImageLogo from "../../components/ImageLogo";


const Inicio = props => {
    const user = useSelector(selectUser);

    return (
        user ?
            <Row className="welcome">
                <SideBar />
                <Col>
                    <h1 className="welcomeTitle">Bienvenido a ODISEO</h1>
                    <Card>
                        <Card.Body className="imageContainer">
                            <ImageLogo/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> : <h1>No esta logeado</h1>
    );
};




export default Inicio;