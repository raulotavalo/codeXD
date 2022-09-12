//import Sidebar from './components/Sidebar'
import './App.css';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import IndexPage from './pages/IndexPage';
import CrearCliente from './pages/CrearCliente';
import ActualizarCliente from './pages/ActualizarCliente';
import EliminarCliente from './pages/EliminarCliente';
import Ventas from './pages/Ventas';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = [
  {
    path: "/",
    index: true,
    main: () => <div><Login /></div>
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
