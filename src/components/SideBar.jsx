import { NavLink } from "react-router-dom";
import React, { useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "../styles/Sidebar.css"
import { useSelector } from "react-redux";
import { getTransaction } from "../redux/reducer/transactionsSlice";
import {FaBars} from "react-icons/fa";
import Constants from '../Constants';


/*const routes = [
  {
    path: "/indexpage",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/facturacion",
    name: "Facturación",
    icon: <FaRegClipboard />,
    subRoutes: [
      {
        path: "/addclientes",
        name: "Clientes",
        icon: <FaUser />,
      },
      {
        path: "/ventas",
        name: "Ventas",
        icon: <FaMoneyBillWave />,
      },
      {
        path: "/devoluciones",
        name: "Devoluciones",
        icon: <FaRedoAlt />,
      },
      {
        path: "/proformas",
        name: "Proformas",
        icon: <FaFileAlt/>,
      },
      {
        path: "/arqueocaja",
        name: "Arqueo de caja",
        icon: <FaReceipt />,
      },
    ],
  },
  {
    path: "/cartera",
    name: "Cartera",
    icon: <FaSuitcase />,
    subRoutes: [
      {
        path: "/cartera/registrarpago",
        name: "Registrar pago ",
        icon: <FaMoneyBillWave />,
      },
      {
        path: "/cartera/reportecaja",
        name: "Reporte caja cobranza",
        icon: <FaPoll />,
      },
      {
        path: "/cartera/registraranticipo",
        name: "Registrar anticipo",
        icon: <FaDonate />,
      },
      {
        path: "/cartera/reimprimirrecibo",
        name: "Re-imprimir recibo pago",
        icon: <BiPrinter />,
      },
      {
        path: "/cartera/reprocesotablet",
        name: "Reproceso recaudo tablet",
        icon: <FaRedoAlt />,
      },
    ],
  },
  {
    path: "/",
    name: "Reportes",
    icon: <FaPoll />,
    subRoutes: [
      {
        path: "/",
        name: "Reporte POS-SAP ",
        icon: <FaStripeS />,
      },
      {
        path: "/",
        name: "Procesar fact POS-SAP",
        icon: <FaStripeS />,
      },
      {
        path: "/",
        name: "Reporte facturas elec",
        icon: <FaRegClipboard />,
      },
      {
        path: "/",
        name: "Documentos electrónicos",
        icon: <FaRegClipboard />,
      },
      {
        path: "/",
        name: "Reporte ventas",
        icon: <FaPoll />,
      },
      {
        path: "/",
        name: "Reporte ventas CEP",
        icon: <FaPoll />,
      },
      {
        path: "/",
        name: "Reporte ventas YMH",
        icon: <SiYamahamotorcorporation />,
      },
      {
        path: "/",
        name: "Catalogo online",
        icon: <FaRegClipboard />,
      },
      {
        path: "/",
        name: "Reporte sábana",
        icon: <FaPoll />,
      },
    ],
  },
  {
    path: "/preciador",
    name: "Preciador",
    icon: <FaFunnelDollar />,
  },
  {
    path: "/",
    name: "Consolidar ATS",
    icon: <FaConfluence />,
  },
  {
    path: "/precios",
    name: "Precios",
    icon: <FaDonate />,
    exact: true
  },
  {
    path: "/imprimiretiquetas",
    name: "Imprimir etiquetas",
    icon: <BiPrinter />,
  },
  {
    path: "/",
    name: "Modelo experto",
    icon: <FaJoomla />,
    subRoutes: [
      {
        path: "/",
        name: "Cotizador ",
        icon: <FaFunnelDollar />,
      },
      {
        path: "/",
        name: "Reporte operativo",
        icon: <FaPoll />,
      },
      {
        path: "/",
        name: "Reporte consultas",
        icon: <BiSearch />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Actualizar ubicación",
    icon: <ImLocation />,
  },
  {
    path: "/generarpagares",
    name: "Generar pagares",
    icon: <FaClipboardList />,
  },
  {
    path: "/saved",
    name: "Traslados",
    icon: <FaArrowRight />,
    subRoutes: [
      {
        path: "/",
        name: "Crear solicitud",
        icon: <FaRegClipboard />,
      },
      {
        path: "/",
        name: "Consulta solicitudes",
        icon: <BiSearch />,
      },
      {
        path: "/",
        name: "Crear solicitud CEP",
        icon: <FaRegClipboard />,
      },
      {
        path: "/",
        name: "Consultas solicitudes CEP",
        icon: <BiSearch />,
      },
    ],
  },
  {
    path: "/",
    name: "PIN PAD",
    icon: <FaBook />,
    subRoutes: [
      {
        path: "/pinpad/consultalote",
        name: "Consulta lote ",
        icon: <BiSearch />,
      },
      {
        path: "/",
        name: "Cierre PIN PAD",
        icon: <FaTimes />,
      },
    ],
  },
  {
    path: "/eliminarhuella",
    name: "Eliminar registro huella",
    icon: <TbFingerprintOff />,
  },
  {
    path: "/",
    name: "YAMAHA",
    icon: <SiYamahamotorcorporation />,
    subRoutes: [
      {
        path: "/",
        name: "Consulta de partes ",
        icon: <BiSearch />,
      },
      {
        path: "/",
        name: "Reporte consulta partes",
        icon: <FaPoll />,
      },
      {
        path: "/",
        name: "Orden de trabajo",
        icon: <FaHammer />,
      },
    ],
  },
  {
    path: "/",
    name: "Etiquetas series",
    icon: <BiLabel />,
  },
];
*/

const SideBar = ({ children }) => {

  const options = {
    htmlparser2: {
      lowerCaseTags: false
    }
  };
  const routes = useSelector(getTransaction);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  const parserDOM= new DOMParser();
  return (
    <>
      <div id = "sidebar" style={{width: isOpen ? "250px" : "45px"}}>
        <motion.div
          animate={{
            width: isOpen ? "250px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  ODISEO
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    key={index+route.rutaWeb}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.rutaWeb}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon" key={'div'+index+route.rutaWeb}>{Constants.icones[route.iconoWeb]}</div>
                  <AnimatePresence key={'ap'+index+route.rutaWeb}>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        key={'motion.div'+index+route.rutaWeb}
                        className="link_text"
                      >
                        {route.tituloWeb}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
