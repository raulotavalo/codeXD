import React, { useState, useEffect } from "react";
import Constants from "../Constants.js";
import axios from 'axios';
import X2JS from "x2js";

async function soapGetMaterialPriceCEP(pCodigoMaterial, pCodigoSAPCliente, pAlmacen, pSector, pOficinaVenta, pCanal, pOrganizacion) {

    let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <tem:getPrecioMaterial>\
          <!--Optional:-->\
          <tem:pCodigoMaterial>'+ pCodigoMaterial + '</tem:pCodigoMaterial>\
          <!--Optional:-->\
          <tem:pCodigoSAPCliente>'+ pCodigoSAPCliente + '</tem:pCodigoSAPCliente>\
          <!--Optional:-->\
          <tem:pAlmacen>'+ pAlmacen + '</tem:pAlmacen>\
          <!--Optional:-->\
          <tem:pSector>'+ pSector + '</tem:pSector>\
          <!--Optional:-->\
          <tem:pOficinaVenta>'+ pOficinaVenta + '</tem:pOficinaVenta>\
          <!--Optional:-->\
          <tem:pCanal>'+ pCanal + '</tem:pCanal>\
          <!--Optional:-->\
          <tem:pOrganizacion>'+ pOrganizacion + '</tem:pOrganizacion>\
       </tem:getPrecioMaterial>\
    </soapenv:Body>\
 </soapenv:Envelope>';

    const url = Constants.wsdl;
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/getPrecioMaterial',
    };
    let data = null;
    data = await axios({
        method: 'POST',
        url: Constants.wsdl,
        headers: headers,
        data: xmls,
        withCredentials: false
    }).then((response) => {
        var x2js = new X2JS();
        var json = x2js.xml2js(response.data);
        console.log("response -> %s", JSON.stringify(json));
        const data = JSON.stringify(json.Envelope.Body.getPrecioMaterialResponse.getPrecioMaterialResult);
        return data;
    }).catch((error) => {
        const data = ['4', '{"error":"error AXIOS"}', error];
        return data;
    })
    return data;
}

export default soapGetMaterialPriceCEP;