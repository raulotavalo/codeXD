import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Row, Col, Card, Form, Button, Modal, Table, Tabs, Tab} from 'react-bootstrap';


const DetalleLote = ({ route, id }) => {

    return (
      <>
        {route.childrens.map((children, i) => (
            (() => {
                if(children.lote===id.toString()) {
                        return (
                          <tr key={i} custom={i}>
                          <td>{children.ipPinPad}</td>
                          <td>{children.tidPinPad}</td>
                          <td>{children.ipCaja}</td>
                          <td>{children.lote}</td>
                          <td>{children.numFactSap}</td>
                          <td>{children.numFactSri}</td>
                          <td>{children.baseIva}</td>
                          <td>{children.baseCero}</td>
                          <td>{children.valorIva}</td>
                          <td>{children.totalVenta}</td>
                          <td>{children.fecha}</td>
                          </tr>
                        )
                    } 
            })()  
        ))}
      </>
    );
  };
  
  export default DetalleLote;
  