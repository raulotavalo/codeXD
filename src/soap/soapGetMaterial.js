import React, { useState, useEffect } from "react";
import Constants from "../Constants.js";
import axios from 'axios';
import X2JS from "x2js";

async function soapGetMaterial(pAlmacen, pCodigoMat, pCanal) {
    
    let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <tem:getMaterial>\
          <!--Optional:-->\
          <tem:pAlmacen>'+pAlmacen+'</tem:pAlmacen>\
          <!--Optional:-->\
          <tem:pCodigoMat>'+pCodigoMat+'</tem:pCodigoMat>\
          <!--Optional:-->\
          <tem:pCanal>'+pCanal+'</tem:pCanal>\
       </tem:getMaterial>\
    </soapenv:Body>\
 </soapenv:Envelope>';

    const url = Constants.wsdl;
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/getMaterial',
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
        const data = JSON.stringify(json.Envelope.Body.getMaterialResponse.getMaterialResult.diffgram.DocumentElement.material);
        return data;
    }).catch((error) => {
        const data = ['4', '{"error":"error AXIOS"}', error];
        return data;
    })
    return data;
}

export default soapGetMaterial;