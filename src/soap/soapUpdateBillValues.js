import React, { useState, useEffect } from "react";
import Constants from "../Constants.js";
import axios from 'axios';
import X2JS from "x2js";

async function soapUpdateBillValues(cliente, sector, ofVent, canal, condicionPago, sociedad, listaMateriales,conFinanciamiento, cantidadUnica) {
    var listaItems = [];
    var jsonItem;
    if (conFinanciamiento) {
        var materialFinanciamiento;

        if (sociedad.equals("2010")) {
            materialFinanciamiento = ";90000000;1;;0";
        } else if (sociedad.equals("3010")) {
            if (Constants.isProduction)
                materialFinanciamiento = ";200000002;1;;0"; //COD MAT FINANCIAMIENTO PRD
            else
                materialFinanciamiento = ";200000004;1;;0"; //COD MAT FINANCIAMIENTO QAS

        } else if (sociedad.equals("4010")) {
            if (Constants.isProduction)
                materialFinanciamiento = ";2001000001;1;;0";
            else
                materialFinanciamiento = ";2001000008;1;;0";
        } else {
            materialFinanciamiento = ";20000000;1;;0";
        }

        listaItems = [...listaItems, materialFinanciamiento];

    }

    listaMateriales.map((mat)=>{
        const dCantidad = parseFloat(mat.cantidad);
        if (cantidadUnica) dCantidad = 1.00;
        var cantidad = dCantidad.intValue();
        const materialActual = mat.almacen + ";"
            + mat.codigo + ";"
            + cantidad + ";"
            + mat.centro + ";"
            + mat.descuentoAplicado;

        listaItems.add(materialActual);
    });

    

    jsonItem = JSON.stringify(listaItems);


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
       <tem:actValoresFactura>\
          <!--Optional:-->\
          <tem:cliente>'+cliente+'</tem:cliente>\
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
          <tem:items>'+jsonItem+'</tem:items>\
          <!--Optional:-->\
          <tem:docuVentas>'+docuVentas+'</tem:docuVentas>\
       </tem:actValoresFactura>\
    </soap:Body>\
 </soap:Envelope>';

    const url = Constants.wsdl;
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/actValoresFactura',
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
        const data = JSON.stringify(json.Envelope.Body.actValoresFacturaResponse.actValoresFacturaResult.diffgram).split(',"_diffgr:id"')[0] + "}";
        return data;
    }).catch((error) => {
        const data = ['4', '{"error":"error AXIOS"}', error];
        return data;
    })
    return data;
}

export default soapUpdateBillValues;