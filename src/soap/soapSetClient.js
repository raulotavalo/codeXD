import React, { useState, useEffect } from "react";
import Constants from "../Constants.js";
import axios from 'axios';
import X2JS from "x2js";

async function soapSetClient(district, email, civilState, taxpayer, clientGroup, acountGroup, gender, contactPerson, town, secondName, name, region, identification, 
    typeIdentification, street, secondStreet, phone, secondPhone, treatment, employGroup, salesOffice, cashRegister ) {
    
    let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <tem:setClientesap>\
          <!--Optional:-->\
          <tem:Distrito>'+district+'</tem:Distrito>\
          <!--Optional:-->\
          <tem:PaEmail>'+email+'</tem:PaEmail>\
          <!--Optional:-->\
          <tem:estadocivil>'+civilState+'</tem:estadocivil>\
          <!--Optional:-->\
          <tem:contribuyente>'+taxpayer+'</tem:contribuyente>\
          <!--Optional:-->\
          <tem:grpcliente>'+clientGroup+'</tem:grpcliente>\
          <!--Optional:-->\
          <tem:grpcuentas>'+acountGroup+'</tem:grpcuentas>\
          <!--Optional:-->\
          <tem:genero>'+gender+'</tem:genero>\
          <!--Optional:-->\
          <tem:percontacto>'+contactPerson+'</tem:percontacto>\
          <!--Optional:-->\
          <tem:poblacion>'+town+'</tem:poblacion>\
          <!--Optional:-->\
          <tem:nombre2>'+secondName+'</tem:nombre2>\
          <!--Optional:-->\
          <tem:nombre>'+name+'</tem:nombre>\
          <!--Optional:-->\
          <tem:region>'+region+'</tem:region>\
          <!--Optional:-->\
          <tem:cedula>'+identification+'</tem:cedula>\
          <!--Optional:-->\
          <tem:tipcedula>'+typeIdentification+'</tem:tipcedula>\
          <!--Optional:-->\
          <tem:calle1>'+street+'</tem:calle1>\
          <!--Optional:-->\
          <tem:calle2>'+secondStreet+'</tem:calle2>\
          <!--Optional:-->\
          <tem:telefono1>'+phone+'</tem:telefono1>\
          <!--Optional:-->\
          <tem:telefono2>'+secondPhone+'</tem:telefono2>\
          <!--Optional:-->\
          <tem:tratamiento>'+treatment+'</tem:tratamiento>\
          <!--Optional:-->\
          <tem:empleadoGrupo>'+employGroup+'</tem:empleadoGrupo>\
          <!--Optional:-->\
          <tem:ofvent>'+salesOffice+'</tem:ofvent>\
          <!--Optional:-->\
          <tem:cajero>'+cashRegister+'</tem:cajero>\
       </tem:setClientesap>\
    </soapenv:Body>\
 </soapenv:Envelope>';

    const url = Constants.wsdl;
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/setClientesap',
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
        const data = JSON.stringify(json.Envelope.Body.setClientesapResponse.setClientesapResult.diffgram);
        return data;
    }).catch((error) => {
        const data = ['4', '{"error":"error AXIOS"}', error];
        return data;
    })
    return data;
}

export default soapSetClient;