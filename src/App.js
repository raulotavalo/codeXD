//import Sidebar from './components/Sidebar'
import './App.css';
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Index from './pages/inicio/Inicio';
import CrearCliente from './pages/CrearCliente';
import ActualizarCliente from './pages/ActualizarCliente';
import EliminarCliente from './pages/EliminarCliente';
import Ventas from './pages/facturacion/ventas';
import PageLogin from './pages/login/LoginPage';
import CarteraRegistrarPago from './pages/cartera/RegistrarPago';
import CarteraRegistrarAnticipo from './pages/cartera/RegistrarAnticipo';
import CarteraReimprimirRecibo from './pages/cartera/ReimprimirRecibo';
import CarteraReporteCaja from './pages/cartera/ReporteCajaCobranza';
import CarteraReprocesoTablet from './pages/cartera/ReprocesoRecaudoTablet';
import Preciador from './pages/preciador/Preciador';
import Precios from './pages/precios/Precios';
import ImprimirEtiquetas from './pages/imprimirEtiquetas/imprimirEtiquetas';
import GenerarPagares from './pages/generarPagares/generarPagares';
import EliminarHuella from './pages/eliminarhuella/eliminarHuella';
import ConsultaLote from './pages/pinpad/consultaLote';
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
  ,
  {
    path: "/cartera/registrarpago",
    main: () => <div><CarteraRegistrarPago /></div>
  }
  ,
  {
    path: "/cartera/registraranticipo",
    main: () => <div><CarteraRegistrarAnticipo /></div>
  }
  ,
  {
    path: "/cartera/reimprimirrecibo",
    main: () => <div><CarteraReimprimirRecibo /></div>
  }
  ,
  {
    path: "/cartera/reportecaja",
    main: () => <div><CarteraReporteCaja /></div>
  }
  ,
  {
    path: "/cartera/reprocesotablet",
    main: () => <div><CarteraReprocesoTablet /></div>
  }
  ,
  {
    path: "/preciador",
    main: () => <div><Preciador /></div>
  }
  ,
  {
    path: "/precios",
    main: () => <div><Precios /></div>
  }
  ,
  {
    path: "/imprimiretiquetas",
    main: () => <div><ImprimirEtiquetas /></div>
  }
  ,
  {
    path: "/generarpagares",
    main: () => <div><GenerarPagares /></div>
  }
  ,
  {
    path: "/eliminarhuella",
    main: () => <div><EliminarHuella /></div>
  }
  ,
  {
    path: "/pinpad/consultalote",
    main: () => <div><ConsultaLote /></div>
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
