import { ProSidebar, Menu, MenuItem, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import React, { useState } from "react";
import { BsFillPersonFill} from 'react-icons/bs';
import { GiReturnArrow} from 'react-icons/gi';
import { FaPlus, FaEdit, FaList, FaStar,FaGem, FaMoneyBillWaveAlt,FaWpforms } from 'react-icons/fa';
import { FiArrowLeftCircle, FiArrowRightCircle, FiLogOut, FiMenu, FiFile, FiFileText } from "react-icons/fi";
import "../styles/Sidebar.css";
import { Link} from 'react-router-dom';

const Sidebar = props => {

    const [menuCollapse, setMenuCollapse] = useState(false);
    

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const menuFacturacion = [
        {
            icon: () => <FaStar />,
            text: "Inicio",
            linkTo: "/indexpage"
        },
        {
            icon: () => <BsFillPersonFill />,
            text: "Cliente",
            linkTo: "/addclientes"
        },
        {
            icon: () => <FaMoneyBillWaveAlt />,
            text: "Vender",
            linkTo: "/delclientes"
        },
        {
            icon: () => <GiReturnArrow />,
            text: "Devolución",
            linkTo: "/delclientes"
        },
        {
            icon: () => <FiFile />,
            text: "Crear proformas",
            linkTo: "/delclientes"
        },
        {
            icon: () => <FaWpforms />,
            text: "Arqueo de caja",
            linkTo: "/delclientes"
        }
    ];

    const menuCartera = [
        {
            icon: () => <FaStar />,
            text: "Registrar pago",
            linkTo: "/indexpage"
        },
        {
            icon: () => <FaPlus />,
            text: "Reporte caja cobranza",
            linkTo: "/addclientes"
        },
        {
            icon: () => <FaEdit />,
            text: "Registrar anticipo",
            linkTo: "/updclientes"
        },
        {
            icon: () => <FaList />,
            text: "Re imprimir Recibo pago",
            linkTo: "/delclientes"
        },
        {
            icon: () => <FaList />,
            text: "Re proceso recaudo tablet",
            linkTo: "/delclientes"
        }
    ];

    const menuReportes = [
        {
            icon: () => <FaStar />,
            text: "Reporte POS-SAP",
            linkTo: "/indexpage"
        },
        {
            icon: () => <FaPlus />,
            text: "Reporte facturas elec",
            linkTo: "/addclientes"
        },
        {
            icon: () => <FaEdit />,
            text: "Reporte ventas",
            linkTo: "/updclientes"
        },
        {
            icon: () => <FaList />,
            text: "Catalogo online",
            linkTo: "/delclientes"
        },
        {
            icon: () => <FaList />,
            text: "Reporte sábana",
            linkTo: "/delclientes"
        },
        {
            icon: () => <FaList />,
            text: "Procesar factura POS-SAP",
            linkTo: "/delclientes"
        },
        {
            icon: () => <FaList />,
            text: "Reporte ventas CEP",
            linkTo: "/delclientes"
        },
        {
            icon: () => <FaList />,
            text: "Reporte ventas (YMH)",
            linkTo: "/delclientes"
        },
        {
            icon: () => <FaList />,
            text: "Documentos electrónicos",
            linkTo: "/delclientes"
        }
    ];

    return (

            <div id="sidebar">
            <ProSidebar rtl={false} collapsed={menuCollapse}>
                <SidebarHeader>
                    <div className="logotext">
                        {/* small and big change using menucollapse state */}
                        <p>{menuCollapse ? <FiMenu /> : "Odiseo"}</p>
                    </div>
                    <div className="closemenu" onClick={menuIconClick}>
                        {/* changing menu collapse icon on click */}
                        {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu>
                        <SubMenu title="Facturación" icon={<FiFileText />}>
                            {menuFacturacion.map((option, index) => (
                                <MenuItem
                                    key={option.text} icon={<option.icon />}>{option.text}<Link key={option.text} to={option.linkTo} />
                                </MenuItem> 
                            ))}

                        </SubMenu>
                    </Menu>
                    <Menu>
                        <SubMenu title="Cartera" icon={<FaMoneyBillWaveAlt />}>
                            {menuCartera.map((option, index) => (
                                <MenuItem
                                    key={option.text} icon={<option.icon />}>{option.text}<Link key={option.text} to={option.linkTo} />
                                </MenuItem> 
                            ))}

                        </SubMenu>
                    </Menu>
                    <Menu>
                        <SubMenu title="Reportes" icon={<FaWpforms />}>
                            {menuReportes.map((option, index) => (
                                <MenuItem
                                    key={option.text} icon={<option.icon />}>{option.text}<Link key={option.text} to={option.linkTo} />
                                </MenuItem> 
                            ))}

                        </SubMenu>
                    </Menu>


                    
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="square">
                        <MenuItem icon={<FiLogOut />}>Logout<Link  to='/' /></MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
            </div>

    );
};

export default Sidebar


/*
import SidebarItem from "./SidebarItem";
import items from "../data/sidebar.json";
import React, { useState } from "react";
import "../styles/Sidebar.css";
import { FaPlus, FaEdit, FaList, FaStar } from 'react-icons/fa';
import { FiArrowLeftCircle, FiArrowRightCircle, FiLogOut, FiMenu } from "react-icons/fi";
import { ProSidebar, Menu, MenuItem, SidebarContent, SidebarFooter, SidebarHeader } from 'react-pro-sidebar';


const Sidebar = props => {
    const [menuCollapse, setMenuCollapse] = useState(false);

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <div className="sidebar">

              { items.map((item, index) => <SidebarItem key={index} item={item} />) }
                         
        </div>
    );
  };
  export default Sidebar
  */