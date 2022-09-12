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