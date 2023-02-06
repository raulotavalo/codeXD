import React, { useState, useEffect } from "react";
import Constants from "../Constants.js";
import axios from 'axios';
import X2JS from "x2js";

async function soapGetMaterialPriceRetail(precio, esquema, cliente, codigo, area, grArticulo, almacen,
    centro,sector,tipoNegociacion,tipoCliente,estadoMaterial,pagoConTarjeta,costo,esCombo,costoCombo,
    dctoTodosLocales,cantidadVender,esWeb) {
        
    let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <tem:Get_Price_Retail>\
          <!--Optional:-->\
          <tem:precio>'+precio+'</tem:precio>\
          <!--Optional:-->\
          <tem:esquema>'+esquema+'</tem:esquema>\
          <!--Optional:-->\
          <tem:cliente>'+cliente+'</tem:cliente>\
          <!--Optional:-->\
          <tem:codigo>'+codigo+'</tem:codigo>\
          <!--Optional:-->\
          <tem:area>'+area+'</tem:area>\
          <!--Optional:-->\
          <tem:grArticulo>'+grArticulo+'</tem:grArticulo>\
          <!--Optional:-->\
          <tem:alma>'+almacen+'</tem:alma>\
          <!--Optional:-->\
          <tem:centro>'+centro+'</tem:centro>\
          <!--Optional:-->\
          <tem:sector>'+sector+'</tem:sector>\
          <!--Optional:-->\
          <tem:tipoNegociacion>'+tipoNegociacion+'</tem:tipoNegociacion>\
          <!--Optional:-->\
          <tem:tipoCliente>'+tipoCliente+'</tem:tipoCliente>\
          <!--Optional:-->\
          <tem:estadoMaterial>'+estadoMaterial+'</tem:estadoMaterial>\
          <!--Optional:-->\
          <tem:pagoConTarjeta>'+pagoConTarjeta+'</tem:pagoConTarjeta>\
          <!--Optional:-->\
          <tem:costo>'+costo+'</tem:costo>\
          <!--Optional:-->\
          <tem:esCombo>'+esCombo+'</tem:esCombo>\
          <!--Optional:-->\
          <tem:costoCombo>'+costoCombo+'</tem:costoCombo>\
          <!--Optional:-->\
          <tem:dctoTodosLocales>'+dctoTodosLocales+'</tem:dctoTodosLocales>\
          <!--Optional:-->\
          <tem:cantidadVender>'+cantidadVender+'</tem:cantidadVender>\
          <!--Optional:-->\
          <tem:esWeb>'+esWeb+'</tem:esWeb>\
       </tem:Get_Price_Retail>\
    </soapenv:Body>\
 </soapenv:Envelope>';

    const url = Constants.wsdl;
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/Get_Price_Retail',
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
        const data = JSON.stringify(json.Envelope.Body.Get_Price_RetailResponse.Get_Price_RetailResult);
        return data;
    }).catch((error) => {
        const data = ['4', '{"error":"error AXIOS"}', error];
        return data;
    })
    return data;
}

export default soapGetMaterialPriceRetail;