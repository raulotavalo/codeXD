const production = false;
const wsdlDBUG = 'http://172.20.0.58/WS_POS_web/wsPOSweb.asmx?WSDL';
const wsdlPRD='http://www.eljuric.com/Ws_Table_FactPRD/v3/Ws_Table_Fac.asmx?wsdl'


export default {
    wsdl: production ? wsdlPRD : wsdlDBUG
    //wsdl: 'http://localhost/WS_Restaurant/wsTurquesa.asmx?WSDL'
};

