import React, { useState, useEffect } from "react";
import Constants from "../Constants.js";
import axios from 'axios';
import X2JS from "x2js";

async function soapUpdatePrices(codigo_cliente, sector, ofVent,canal,condicionPago,sociedad,items,promoEmpleado,entrada) {
    
    var docuVentas = "ZCEP";

    switch (sociedad.trim()) {
        case "1010":
            if (ofVent.equals("1110")) {
                docuVentas = "ZTA";
            } else {
                docuVentas = "ZRET";
            }

            break;
        case "2010":
            docuVentas = "ZCEP";

            break;
        case "3010":
            docuVentas = "ZMFA";
            break;

        case "4010":
            docuVentas = "ZEPF";

            break;
    }

    let xmls = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">\
    <soap:Header/>\
    <soap:Body>\
       <tem:actualizarPrecios>\
          <!--Optional:-->\
          <tem:cliente>'+codigo_cliente+'</tem:cliente>\
          <!--Optional:-->\
          <tem:sector>'+sector+'</tem:sector>\
          <!--Optional:-->\
          <tem:ofVent>'+ofVent+'</tem:ofVent>\
          <!--Optional:-->\
          <tem:canal>'+canal+'</tem:canal>\
          <!--Optional:-->\
          <tem:condicionPago>'+condicionPago+'</tem:condicionPago>\
          <!--Optional:-->\
          <tem:sociedad>'+sociedad+'</tem:sociedad>\
          <!--Optional:-->\
          <tem:items>'+items+'</tem:items>\
          <!--Optional:-->\
          <tem:docuVentas>'+docuVentas+'</tem:docuVentas>\
          <!--Optional:-->\
          <tem:promoEmpleado>'+promoEmpleado+'</tem:promoEmpleado>\
          <!--Optional:-->\
          <tem:entrada>'+entrada+'</tem:entrada>\
       </tem:actualizarPrecios>\
    </soap:Body>\
 </soap:Envelope>';

    const url = Constants.wsdl;
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/actualizarPrecios',
    };

    let data = null;
    data = await axios({
        method: 'POST',
        url: Constants.wsdl,
        headers: headers,
        data: xmls,
        withCredentials: false
    }).then((response) => {
        console.log("response -> %s", response.data);
        var x2js = new X2JS();
        var json = x2js.xml2js(response.data);
        const data = JSON.stringify( json.Envelope.Body.actualizarPreciosResponse.actualizarPreciosResult.diffgram).split(',"_diffgr:id"')[0]+"}";
        return data;
    }).catch((error) => {
        const data = ['4', '{"error":"error AXIOS"}',error];
        return data;
    })
    return data;
}

export default soapUpdatePrices;