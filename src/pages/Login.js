import React, { Component } from "react";
import "../styles/Login.css";
import { Row, Col, Card, Form, Button} from 'react-bootstrap'


class Login extends Component {

    state={
        form:{
            username: '',
            password:''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    render(){
        return (
            <>
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label htmlFor="">Usuario</label>
                        <br />
                        <input type="text" className="form-control" name="username" onChange={this.handleChange}/>
                        <br />
                        <label htmlFor="">Contraseña</label>
                        <br />
                        <input type="password" className="form-control" name="password" onChange={this.handleChange}/>
                        <br />
                        <button className="btn btn-primary">Ingresar</button>
                    </div>

                </div>
            </div>
            </>
        );
    }
}

export default Login;