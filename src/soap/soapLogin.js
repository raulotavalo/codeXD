import React, { useState, useEffect } from "react";
import Constants from "../Constants.js";
import axios from 'axios';
import X2JS from "x2js";

async function soapLogin(user, password) {
    let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <tem:Login>\
          <!--Optional:-->\
          <tem:Usuario>'+ user + '</tem:Usuario>\
          <!--Optional:-->\
          <tem:Pass>'+ password + '</tem:Pass>\
       </tem:Login>\
    </soapenv:Body>\
 </soapenv:Envelope>';

    const url = Constants.wsdl;
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/Login',
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
        const data = JSON.stringify( json.Envelope.Body.LoginResponse.LoginResult.diffgram.usuarios.usuario).split(',"_diffgr:id"')[0]+"}";
        return data;
    }).catch((error) => {
        const data = ['4', '{"error":"error AXIOS"}',error];
        return data;
    })
    return data;
}

export default soapLogin;