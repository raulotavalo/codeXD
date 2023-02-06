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
            <Row style={{ height: '100vh' }}>
                <SideBar />
                <Col>
                    <Card>
                        <h1 className="welcomeTitle">Bienvenido a ODISEO</h1>
                        <Card.Body className="imageContainer">
                            <ImageLogo />
                        </Card.Body>
                    </Card>
                </Col>
            </Row> :
            <Row style={{ height: '100vh' }}>
                <h1>No esta logeado</h1>
            </Row>
    );
};




export default Inicio;