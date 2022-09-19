import React from "react";
import Sidebar from "../components/Sidebar";
import { Row, Col, Card, Image } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectUser } from "../redux/reducer/loginSlice";


const IndexPage = props => {
    const user = useSelector(selectUser);

    return (
        user ?
            <div className="main">

                <Sidebar />

                
                <Row>
                    <h1 className="welcomeTitle">Bienvenido al gestor de materiales</h1>

                </Row>
            </div> : <h1>No esta logeado</h1>
    );
};




export default IndexPage;