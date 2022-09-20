import { NavLink } from "react-router-dom";
import {FaBook, FaArrowRight, FaClipboardList, FaBars, FaHome, FaLock, FaMoneyBill, FaUser, FaRegClipboard, FaSuitcase, FaPoll, FaFunnelDollar, FaDonate } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch, BiPrinter, BiLabel } from "react-icons/bi";
import { ImLocation} from "react-icons/im";
import { TbFingerprintOff} from "react-icons/tb";
import { SiYamahamotorcorporation} from "react-icons/si";


import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "../styles/Sidebar.css"
const routes = [
  {
    path: "/indexpage",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/addclientes",
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
        icon: <FaLock />,
      },
      {
        path: "/devoluciones",
        name: "Devoluciones",
        icon: <FaMoneyBill />,
      },
      {
        path: "/proformas",
        name: "Proformas",
        icon: <FaMoneyBill />,
      },
      {
        path: "/arqueocaja",
        name: "Arqueo de caja",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/messages",
    name: "Cartera",
    icon: <FaSuitcase />,
  },
  {
    path: "/analytics",
    name: "Reportes",
    icon: <FaPoll />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/file-manager",
    name: "Preciador",
    icon: <FaFunnelDollar />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/order",
    name: "Consolidar ATS",
    icon: <BsCartCheck />,
  },
  {
    path: "/settings",
    name: "Precios",
    icon: <FaDonate />,
    exact: true
  },
  {
    path: "/saved",
    name: "Imprimir etiquetas",
    icon: <BiPrinter />,
  },
  {
    path: "/saved",
    name: "Modelo experto",
    icon: <AiFillHeart />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Actualizar ubicación",
    icon: <ImLocation />,
  },
  {
    path: "/saved",
    name: "Generar pagares",
    icon: <FaClipboardList />,
  },
  {
    path: "/saved",
    name: "Traslados",
    icon: <FaArrowRight />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "PIN PAD",
    icon: <FaBook />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Eliminar registro huella",
    icon: <TbFingerprintOff />,
  },
  {
    path: "/saved",
    name: "YAMAHA",
    icon: <SiYamahamotorcorporation />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Etiquetas series",
    icon: <BiLabel />,
  },
];

const SideBar = ({ children }) => {
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

  return (
    <>
      <div id = "sidebar">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

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
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Buscar"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
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
