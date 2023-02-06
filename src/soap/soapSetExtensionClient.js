import React, { useState, useEffect } from "react";
import Constants from "../Constants.js";
import axios from 'axios';
import X2JS from "x2js";

async function soapSetExtensionClient(pCanal, pCodigoSAPCliente, pSociedad, jsonSectores) {
    
    let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <tem:setAmpliacion>\
          <!--Optional:-->\
          <tem:pCanal>'+pCanal+'</tem:pCanal>\
          <!--Optional:-->\
          <tem:pCodigoSAPCliente>'+pCodigoSAPCliente+'</tem:pCodigoSAPCliente>\
          <!--Optional:-->\
          <tem:pSociedad>'+pSociedad+'</tem:pSociedad>\
          <!--Optional:-->\
          <tem:jsonSectores>'+JSON.stringify(jsonSectores)+'</tem:jsonSectores>\
       </tem:setAmpliacion>\
    </soapenv:Body>\
 </soapenv:Envelope>';

    const url = Constants.wsdl;
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/setAmpliacion',
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
        const data = JSON.stringify(json.Envelope.Body.setAmpliacionResponse.setAmpliacionResult);
        return data;
    }).catch((error) => {
        const data = ['4', '{"error":"error AXIOS"}', error];
        return data;
    })
    return data;
}

export default soapSetExtensionClient;