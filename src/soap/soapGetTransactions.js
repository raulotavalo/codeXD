import React, { useState, useEffect } from "react";
import Constants from "../Constants.js";
import axios from 'axios';
import X2JS from "x2js";

async function soapGetTransactions(idUser, idModule) {
    
    let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <tem:getTransactions>\
          <!--Optional:-->\
          <tem:idUsuario>'+ idUser + '</tem:idUsuario>\
          <!--Optional:-->\
          <tem:idModule>'+ idModule + '</tem:idModule>\
       </tem:getTransactions>\
    </soapenv:Body>\
 </soapenv:Envelope>';

    const url = Constants.wsdl;
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/getTransactions',
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
        const data = JSON.stringify(json.Envelope.Body.getTransactionsResponse.getTransactionsResult.diffgram.NewDataSet.Table);
        return data;
    }).catch((error) => {
        const data = ['4', '{"error":"error AXIOS"}', error];
        return data;
    })
    return data;
}

export default soapGetTransactions;