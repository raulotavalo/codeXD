//import Sidebar from './components/Sidebar'
import './App.css';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Index from './pages/IndexPage';
import CrearCliente from './pages/CrearCliente';
import ActualizarCliente from './pages/ActualizarCliente';
import EliminarCliente from './pages/EliminarCliente';
import Ventas from './pages/Ventas';
import PageLogin from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';

import SideBar from "./components/SideBar";


const routes = [
  {
    path: "/",
    index: true,
    main: () => <div><PageLogin /></div>
  }
  ,
  {
    path: "/addclientes",
    main: () => <div><CrearCliente /></div>
  }
  ,
  {
    path: "/updclientes",
    main: () => <div><ActualizarCliente /></div>
  }
  ,
  {
    path: "/delclientes",
    main: () => <div><EliminarCliente /></div>
  }
  ,
  {
    path: "/ventas",
    main: () => <div><Ventas /></div>
  }
  ,
  {
    path: "/indexpage",
    main: () => <div><Index /></div>
  }


];

function App() {
  return (
    <Container fluid>
        <Router>

          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                index={route.index}
                path={route.path}
                exact={route.exact}
                element={<route.main />}
              />
            ))}
          </Routes>

        </Router>
    </Container>
  );
}

export default App
