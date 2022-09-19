import React from "react";
import { Row, Col, Card, Image } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectUser } from "../redux/reducer/loginSlice";
import SideBar from "../components/SideBar";


const IndexPage = props => {
    const user = useSelector(selectUser);

    return (
        user ?

            <Row className="welcome">
                
                <SideBar/>
                <Col>
                    <Row>
                        <h1 className="welcomeTitle">Bienvenido al gestor de materiales</h1>

                    </Row>
                </Col>
            </Row> : <h1>No esta logeado</h1>
    );
};




export default IndexPage;