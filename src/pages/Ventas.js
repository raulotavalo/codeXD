import React, {Component, useState} from "react";

import { FaBars } from 'react-icons/fa';
import { Row, Col, Card, Form, Button, Modal} from 'react-bootstrap';
import { DatePicker } from "@material-ui/pickers";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/reducer/loginSlice";

const url = "https://jsonplaceholder.typicode.com/users/1/todos";

class Ventas extends Component {

    state={
        data:[]
    }

    //PETICION GET API JSON
    peticionGet=()=>{
        axios.get(url).then(response=>{
            console.log(response.data);
            this.setState({data: response.data});
        })
    };



    //COMPONENTE CICLO DE VIDA
    componentDidMount() {
    this.peticionGet();

    };

    

    render(){

    return (

        <div >
        <Row>
            <Col>
            Peticion Get
            </Col>
        </Row>
        <Row>
            <Col>
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>texto</th>
                        <th>estado</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((texto)=>{
                        return(
                            <tr>
                                <td key={texto}>{texto.id}</td>
                                <td key={texto}>{texto.title}</td>
                                <td key={texto}>{texto.completed ? 'ok':'x'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </Col>
        </Row>
        </div> 
    );
}
};

export default Ventas;