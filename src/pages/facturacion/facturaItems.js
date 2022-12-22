import React, { useState, useLayoutEffect } from "react";
import { Row, Col, Card, Form, Button, Table, Modal } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducer/loginSlice";
import { cashRegister, getCashRegister } from '../../redux/reducer/cashRegisterSlice';
import Constants from "../../Constants.js";
import "../../styles/Container.css";
import "../../styles/facturacion/TableScroll.css";
import local from "../../data/locales.json";
import tipoPago from '../../data/facturacion/tipoPago.js';
import tipoContado from '../../data/facturacion/tipoContado.js';
import infoCredMilla from '../../data/facturacion/infoCredMilla.js';
import tipoIdentificacion from '../../data/facturacion/TipoIdentificacion.js';
import tipoIdentRegisterClient from '../../data/facturacion/TipoIdentRegClient.js';
import { BsFillCartPlusFill, BsFillPersonLinesFill, BsFillPrinterFill, BsGiftFill, BsFillCheckCircleFill } from "react-icons/bs";
import { RiPlaneFill, RiTruckFill } from "react-icons/ri";
import { TbArrowsRightLeft } from "react-icons/tb";
import { MdAttachMoney, MdCancel } from "react-icons/md";
import ButtonIcon from "../../components/ButtonIcon";
import soapUpdatePrices from "../../soap/soapUpdatePrices";
import soapUpdateBillValues from "../../soap/soapUpdateBillValues";
import { selectModoFactura } from "../../redux/reducer/modoFacturaSlice";
import soapGetCustomerData from "../../soap/soapGetCustomerData";
import soapGetPaymentConditions from "../../soap/soapGetPaymentConditions";

const FacturaItems = () => {


    //VARIABLES LECTURA REDUX
    const userRedux = useSelector(selectUser);
    const modoFacturaRedux = useSelector(selectModoFactura);
    const cashRegisterRedux = useSelector(getCashRegister);

    //ARRAY ITEMS
    const [materialesLista, setMaterialesLista] = useState([]);
    const [employeePromotionOptions, setEmployeePromotionOptions] = useState([]);

    //VARIABLE BANDERA PARA MOSTRAR EL MODAL
    const [showModalClientReg, setShowModalClientReg] = useState(false);
    const [showModalEditCant, setShowModalEditCant] = useState(false);
    const [showModalTypeCashSelector, setShowModalTypeCashSelector] = useState(false);

    //VARIABLE BANDERA PARA HABILITAR COMPONENTES
    const [enableIdentificacion, setEnableIdentificacion] = useState(true);
    const [enabledCodigo, setEnabledCodigo] = useState(false);
    const [enabledCantidad, setEnabledCantidad] = useState(false);
    const [enabledDescuentoAplicado, setEnabledDescuentoAplicado] = useState(true);
    const [enabledCreditoCheckbox, setEnabledCreditoCheckbox] = useState(true);
    const [enablePaymentConditions, setEnablePaymentConditions] = useState(false);
    const [enableEntradaEditText, setEnableEntradaEditText] = useState(true);
    const [enableIsEntredaDif, setEnableIsEntredaDif] = useState(false);

    //VARIABLES CHECKBOX
    const [isCheckedCredito, setIsCheckedCredito] = useState(true);
    const [isCheckedContadoPPOS, setIsCheckedContadoPPOS] = useState(true);
    const [isCheckedInfoCredito, setIsCheckedInfoCredito] = useState(true);
    const [isCheckedTypeId, setIsCheckedTypeId] = useState(false);
    const [isCheckedFinalCustomer, setIsCheckedFinalCustomer] = useState(true);
    const [isCheckedDNI, setIsCheckedDNI] = useState(true);
    const [isCheckedPassport, setIsCheckedPassport] = useState(true);
    const [isEntradaDif, setIsEntradaDif] = useState(true);
    //LISTA DE CHECKBOX TIPO IDENTIFICACION
    const [switchId, setSwitchId] = useState(tipoIdentificacion);

    //LISTA DE CHECKBOX TIPO PAGO
    const [switchesPago, setSwitchesPago] = useState(tipoPago);
    const [switchesContado, setSwitchesContado] = useState(tipoContado);
    const [switchesInfo, setSwitchesInfo] = useState(infoCredMilla);

    //VARIABLES RESUMEN TOTALES

    const [cantItems, setCantItems] = useState(0.0);
    const [sumatotal, setSumaTotal] = useState(0.0);
    const [descuentoTotal, setDescuentoTotal] = useState(0.0);
    const [descuentoMillas, setDescuentoMillas] = useState(0.0);
    const [subTotal, setSubTotal] = useState(0.0);
    const [iceTotal, setIceTotal] = useState(0.0);
    const [ivaTotal, setIvaTotal] = useState(0.0);
    const [total, setTotal] = useState(0.0);
    const [insteres, setInteres] = useState(0.0);

    //VARIABLES CLIENTE
    const [identificacion, setIdentificacion] = useState("");
    const [cliente, setCliente] = useState();
    const [clienteIngresado, setClienteIngresado] = useState(false);
    //VARIABLES ENTRADAS
    const [entrada, setEntrada] = useState("");

    //VARIABLES MATERIALES
    const [codigoMaterial, setCodigoMaterial] = useState("");


    //VARIABLES OPCIONES SELECCIONADAS DE LOS SELECTS
    const [selectedPromocionEmpleado, setSelectedPromocionEmpleado] = useState("");
    const [selectedPaymentCondition, setSelectedPaymentCondition] = useState("");
    const [selectedSeller, setSelectedSeller] = useState("");

    const [selectPaymentConditionOptions, setSelectPaymentConditionOptions] = useState([]);
    const [selectEmployeePromotionOptions, setSelectEmployeePromotionOptions] = useState([]);

    const onSubmitFormItemsFact = async (event) => {
        event.preventDefault();
        //await insertCode();
    };

    const handleKeyDownClient = (event) => {
        if (event.keyCode === 13) {
            setShowModalClientReg(true);
            event.preventDefault();
        }
    }
    const handleKeyDownMaterial = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    const handleEditMaterial = (event) => {
        setShowModalEditCant(true);
    }

    useLayoutEffect(() => {
        if (cashRegisterRedux) {
            getPaymentConditions();
        }

    },[cashRegisterRedux]);

    const getPaymentConditions = async () => {

        var dataString = await soapGetPaymentConditions(cashRegisterRedux.selectedCashRegister.idOficinaVenta_VKBUR);
        var dataJSON = JSON.parse(dataString);
        if (dataJSON) {
            if (dataJSON == 'undefined') {
                alert('No se recuperaron las condiciones de pago');
            }
            else {
                if (dataJSON[0] == "4") {
                    alert("Error: " + JSON.stringify(dataJSON[1]));
                } else {
                    var menuOptionsArray = [];
                    dataJSON.map((optionJSON, index) => {
                        menuOptionsArray = [...menuOptionsArray, optionJSON];
                    });
                    setSelectPaymentConditionOptions(menuOptionsArray);
                    if (menuOptionsArray.length > 0) {
                        setSelectedPaymentCondition(menuOptionsArray[0]);
                    }
                }
            }
        } else {
            alert('No se recuperaron los menus');
        }
    }


    //VERIFICA QUE SOLO UN CHECKBOX ESTE ACTIVO
    function onChangeSwitchContado(id) {

        setSwitchesContado(switchesContado.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }));
        if (id == '2') {
            setIsCheckedContadoPPOS(false);
        } else {
            setIsCheckedContadoPPOS(true);
        }
    }

    function onChangeSwitchInfo(id) {
        setSwitchesInfo(switchesInfo.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }))
        if (id == '2') {
            setIsCheckedInfoCredito(false);
        } else {
            setIsCheckedInfoCredito(true);
        }

    }

    //VERIFICA QUE SOLO UN CHECKBOX ESTE ACTIVO
    function onChangeSwitchId(id) {
        setSwitchId(switchId.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }));
        if (id == '1') {
            setIsCheckedDNI(true);
            setIsCheckedFinalCustomer(false);

            setIdentificacion("");
            setClienteIngresado(false);
            setEnabledCodigo(false);
            setEnabledCantidad(false);
            setEnabledDescuentoAplicado(false);
            setCodigoMaterial("");

            setEnabledCreditoCheckbox(true);
            if (!isCheckedCredito) {
                setEnableIdentificacion(true);
            }
            setCliente();
        } else if (id == '2') {
            setIsCheckedDNI(false);
            setIsCheckedFinalCustomer(true);
            setIsCheckedPassport(true);

            isCheckedCredito(false);
            setIdentificacion("9999999999");
            setEnabledCreditoCheckbox(false);
            setEnabledCodigo(true);
            setClienteIngresado(true);
            setEnableIdentificacion(false);      //Deshabilitar para consumidor final
            const clientData = soapGetCustomerData("9999999999");
            setCliente(clientData);

        } else {
            setIsCheckedDNI(false);
            setIsCheckedFinalCustomer(false);
            setIsCheckedPassport(true);
            setIdentificacion("");
            setCliente();
            setClienteIngresado(false);
            setEnabledCodigo(false);
            setEnabledCantidad(false);
            setEnabledDescuentoAplicado(false);
            setCodigoMaterial("");

            setEnabledCreditoCheckbox(true);

            if (!isCheckedCredito) {
                setEnableIdentificacion(true);
            }

        }
    }

    function onChangeSwitchPago(id) {
        setSwitchesPago(switchesPago.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }))
        setSwitchesContado(switchesContado.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }))
        if (id == '2') {
            setIsCheckedCredito(false);

            if (cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS.equals("3010")) {
                setShowModalTypeCashSelector(true);
            } else {
                if (total.equals(""))
                    updateMaterialList(materialesLista);
            }


            //spCondicionesPago.setSelection(0);


        } else {
            setIsCheckedCredito(true);
        }
    }

    const getTipoFactura = () => {
        var tipoFactura = "Error";

        if (!isCheckedCredito) {
            tipoFactura = "Contado";
        } else if (isCheckedCredito) {

            if (isEntradaDif) {
                tipoFactura = "Entrada diferida";
            } else {
                if (entrada > 0.0) {
                    tipoFactura = "Crédito con entrada";
                } else {
                    tipoFactura = "Crédito";
                }
            }
        }

        return tipoFactura;
    }

    const obtenerPromoEmpleado = () => {

        var promoEmpleado = "";

        if (cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS.equals("1010")) {
            promoEmpleado = "001";
        }

        try {
            promoEmpleado = selectedPromocionEmpleado.split(";")[0];
        } catch (e) {

        }

        return promoEmpleado;
    }

    const obtenerCondicionPago = () => {

        var condicionPago = "";

        if (!isCheckedCredito) {
            if (isCheckedContadoPPOS)
                condicionPago = "PPOS";
            else
                condicionPago = "PTAP";
        } else {
            condicionPago = selectedPaymentCondition.split(";")[0];
        }
        return condicionPago;
    }

    const getImagenMaterial = (codigoMaterial) => {
        const url = "http://190.57.169.118/Imagenes/material/";
        const nop = "http://190.57.169.118/Imagenes/material/lista.png";
        codigoMaterial = url + codigoMaterial + ".png";

        const loadedImage = null;

        /*try {
            URL imageUrl = new URL(Codi);
            HttpURLConnection conn = (HttpURLConnection) imageUrl.openConnection();
            conn.connect();
            loadedImage = BitmapFactory.decodeStream(conn.getInputStream());
        } catch (IOException e) {
            try {
                URL imageUrl1 = new URL(nop);
                HttpURLConnection conn1 = (HttpURLConnection) imageUrl1.openConnection();
                conn1.connect();
                loadedImage = BitmapFactory.decodeStream(conn1.getInputStream());

            } catch (IOException e1) {
                e1.printStackTrace();
            }

            e.printStackTrace();
        }*/

        if (loadedImage == null) {
            //    const prefDrawable = getResources().getDrawable(R.drawable.preferences);
            //    loadedImage = ((BitmapDrawable) prefDrawable).getBitmap();
        }

        return loadedImage;
    }

    const updateMaterialList = (materialList) => {

        let BanderaMillas = true;

        let recuperoTablaDescuento = false;
        let utilizaTablaDescuento = true;

        //TODO: CODIGO QUEMADO PARA QUE PERFUMERÍA NO UTILIZE LAS TABLAS DE DESCUENTO QUE POR AHORA
        //TODO: SOLO UTILIZA MERCOINTELG. SI SE UTILIZA PARA SOCIEDAD 2010 O 1010 REGRESA LA TABLA
        //TODO: CON VALORES EN CERO DEBIDO A QUE AUN NO SE GENERA LA CONFIGURACION PARA PROPONER LA CLASE
        //TODO: DE DOCUMENTO DE CADA SOCIEDAD PARA LA GENERACIÓN DE DOCUMENTOS DE VENTA.

        const sSociedad = cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS;
        const sector = cashRegisterRedux.selectedCashRegister.idSector_SPART;
        const ofVent = cashRegisterRedux.selectedCashRegister.idOficinaVenta_VKBUR;
        const canal = cashRegisterRedux.selectedCashRegister.idCanal_VTWEG;

        if (sSociedad.equals("2010") || sSociedad.equals("1010")) {
            utilizaTablaDescuento = false;  //No utiliza tablas de descuento
        }

        var tablaDescuento = null;

        let cantidadUnica = false;
        //Si es a crédito trae material de financiamiento. Es decir a crédito, o a crédito con entrada o entrada diferida
        let conFinanciamiento = !getTipoFactura().equals("Contado");


        if (utilizaTablaDescuento) {

            //Validar sociedad, si es 1010 (AJE) utilizar webservice consultarPrecios
            if (sSociedad.equals("1010")) {
                const promoEmpleado = obtenerPromoEmpleado();
                const condicionPago = obtenerCondicionPago();
                const montoEntrada = entrada;
                tablaDescuento = soapUpdatePrices("cliente", sector, ofVent, canal, condicionPago, sSociedad, materialList, promoEmpleado, entrada);
            } else { //Caso contrario es MERCOINTELG, sociedad 3010
                const condicionPago = obtenerCondicionPago();
                tablaDescuento = soapUpdateBillValues("cliente", sector, ofVent, canal, condicionPago, sSociedad, materialList);
            }

            recuperoTablaDescuento = tablaDescuento.respuesta.trim().equals("0");

            if (!tablaDescuento.respuesta.equals("0")) {
                alert(tablaDescuento.respuesta);
            }
        }
        var interes;
        //Asignar valores de la tabla de descuento a los materiales
        if (recuperoTablaDescuento) {
            var j;
            if (conFinanciamiento) {
                interes = parseFloat(tablaDescuento.intereses);
                j = 1;
            } else {
                j = 0;
            }

            //ACTUALIZANDO MATERIALES CON DESCUENTO
            materialesLista.map((matActualizado) => {
                {
                    alert(JSON.stringify(matActualizado));
                    for (var m = j; m < tablaDescuento.intereses.length; m++) {
                        var codlength = matActualizado.codigo.length;
                        var codlengthaux = tablaDescuento.materialCod[m].length();
                        var codTableDesc = tablaDescuento.materialCod[m].trim().substring(codlengthaux - codlength);
                        if (matActualizado.codigo.equals(codTableDesc)) {
                            matActualizado.precio(tablaDescuento.precioNeto[m]);
                            matActualizado.setImpuesto(tablaDescuento.impuesto[m]);
                            matActualizado.setPrecioBruto(tablaDescuento.getPrecioBruto(m));
                            matActualizado.setDescuentoInicialPorcentaje(tablaDescuento.getDescuentoInicialPorcentaje(m));
                            matActualizado.setPrecioNeto(tablaDescuento.getPrecioNeto(m));
                            matActualizado.setDescuentoSapMonto(tablaDescuento.getDescuentoInicialMonto(m));
                            matActualizado.setDescuentoAplicadoMonto(tablaDescuento.getDescuentoAplicadoMonto(m));
                            matActualizado.setPrecioTotal(tablaDescuento.getPrecioTotal(m));
                            matActualizado.setIva(tablaDescuento.getImpuesto(m));
                            matActualizado.setMaterialValidado(true);
                        }
                    }
                    /*if(!matActualizado.tieneDescuento()){
                        matActualizado.setDescuentoAplicado(tablaDescuento.getDescuentoInicialPorcentaje(j));
                    }*/
                }
            })


        } else {  //Si no recupera tabla de descuento y la sociedad actual utiliza tabla de descuento (1010, 3010)
            //cambia el status del material a inválido
            //Si la sociedad actual NO utiliza tabla de descuento (2010) cambia el status del material a válido

            materialesLista.map(mat => {
                if (utilizaTablaDescuento) {
                    mat.materialValidado(false);
                } else {
                    mat.materialValidado(true);
                }
            })
        }

        materialesLista.map((mat) => {

            mat.imagen = (getImagenMaterial(mat.codigo));

            if (utilizaTablaDescuento && recuperoTablaDescuento) {

                var precioUnitario = 0.00;
                var precioBruto = parseFloat(mat.getPrecioBruto());

                var montoDescuentoSap;
                var porcentajeDescuentoInicial;
                var cantidad = parseInt(mat.getCantidad());


                if (!cantidadUnica) { //Si es Mercointelg, trae valores multiplicados por cantidad

                    try {
                        precioUnitario = precioBruto / cantidad;
                        precioUnitario = Math.rint(precioUnitario * 100) / 100;

                    } catch (e) {
                        e.printStackTrace();
                    }

                    //Descuento inicial
                    //montoDescuentoSap =   parseFloat(mat.getDescuentoSapMonto()) / cantidad;
                    montoDescuentoSap = parseFloat(mat.getDescuentoSapMonto());
                    montoDescuentoSap = Math.rint((montoDescuentoSap) * 100) / 100;
                    //Descuento inicial en porcentaje
                    //porcentajeDescuentoInicial = (montoDescuentoSap / precioUnitario)*100;
                    //porcentajeDescuentoInicial = (montoDescuentoSap / precioBruto)*100;

                    var descuentoInicialPorcentaje = mat.getDescuentoInicialPorcentaje();

                    if (descuentoInicialPorcentaje != null) {
                        porcentajeDescuentoInicial = parseFloat(descuentoInicialPorcentaje);
                    } else {
                        porcentajeDescuentoInicial = 0.00;
                    }

                    porcentajeDescuentoInicial = Math.rint((porcentajeDescuentoInicial) * 100) / 100;

                } else { //Si es 1010, trae valores únicos

                    try {
                        precioUnitario = precioBruto;
                        precioUnitario = Math.rint(precioUnitario * 100) / 100;

                    } catch (e) {
                        e.printStackTrace();
                    }

                    //Descuento inicial
                    montoDescuentoSap = parseFloat(mat.getDescuentoSapMonto());
                    montoDescuentoSap = Math.rint((montoDescuentoSap) * 100) / 100;
                    //Descuento inicial en porcentaje

                    var descuentoInicialPorcentaje = mat.getDescuentoInicialPorcentaje();

                    if (descuentoInicialPorcentaje != null) {
                        porcentajeDescuentoInicial = parseFloat(descuentoInicialPorcentaje);
                    } else {
                        porcentajeDescuentoInicial = (montoDescuentoSap / precioUnitario) * 100;
                        porcentajeDescuentoInicial = Math.rint((porcentajeDescuentoInicial) * 100) / 100;
                    }

                }


                var precioNeto = parseFloat(mat.getPrecioNeto());
                var subtotal = precioNeto;
                subtotal = Math.rint(subtotal * 100) / 100;

                //Descuento aplicado
                var montoDescuentoAplicado = parseFloat(mat.getDescuentoAplicadoMonto());
                montoDescuentoAplicado = Math.rint((montoDescuentoAplicado) * 100) / 100;

                //Descuento aplicado en porcentaje
                //Double porcentajeDescuentoAplicado = (montoDescuentoAplicado / subtotal)*100;
                //porcentajeDescuentoAplicado = Math.rint((porcentajeDescuentoAplicado)*100)/100;

                //Total
                var total = parseFloat(mat.getPrecioTotal());
                total = Math.rint(total * 100) / 100;

                if (total == 0) {
                    total = subtotal;
                }

                //Descuento total = descuento inicial + descuento aplicado
                var montoDescuentoTotal = montoDescuentoSap + montoDescuentoAplicado;


                //Texto de la lista
                mat.setPrecioUnitario(precioUnitario.toString());
                mat.setDescuentoInicialMonto(montoDescuentoSap.toString());
                mat.setDescuentoInicialPorcentaje(porcentajeDescuentoInicial.toString());
                mat.setDescuentoAplicadoMonto(montoDescuentoAplicado.toString());
                mat.setDescuentoAplicadoPorcentaje(mat.getDescuentoAplicado());
                mat.setPrecioTotal(total.toString());

                mat.setPrecioSubtotal(subtotal.toString());
                //mat.setPrecioTotal();
                //Fin parámetros a la lista


                mat.setPrecioASap(precioUnitario.toString()); //Parámetros a SAP

                //Si se genera pedido se utiliza otro webservice para crear pedido
                //Este webservice requiere el monto de descuento total
                if (modoFacturaRedux.equals("Pedido")) {
                    mat.setDescuentoASap(montoDescuentoTotal.toString()); //Parámetros a SAP

                } else { //Si se crea una factura con el webservice de t0do el proceso conjunto:
                    //PEDIDO - ENTREGA - FACTURA, el webservice requiere el porcentaje de descuento manual.
                    // Ej: 14, que sería 14%
                    mat.setDescuentoASap(mat.getDescuentoAplicado()); //Parámetros a SAP
                }

                setSubTotal(sumatotal + precioBruto);
                setDescuentoTotal(descuentoTotal + montoDescuentoTotal);
                this.subtotal += total;
                setIvaTotal(ivaTotal + parseFloat(mat.getIva()));
                setIceTotal(iceTotal + (parseFloat(mat.getIce()) * parseInt(mat.getCantidad())));
                setCantItems(cantItems + parseInt(mat.getCantidad()));


            } else if (!utilizaTablaDescuento) { //Para sociedad 2010, perfumería CEP

                var cantidad = parseFloat(mat.getCantidad());
                //Double precioUnitario =   parseFloat(mat.getPrecio().replace(",","."));
                var precioNeto = parseFloat(mat.getPrecioNeto().replace(",", "."));
                var precioUnitario = parseFloat(mat.getPrecio().replace(",", "."));
                precioUnitario = Math.rint(precioUnitario * 100) / 100;

                var precioInicial = parseFloat(mat.getCantidad()) * precioUnitario;

                var precioBruto = parseFloat(mat.getCantidad()) * precioNeto;
                precioBruto = Math.rint(precioBruto * 100) / 100;

                var porcDescuentoAplicado = parseFloat(mat.getDescuentoAplicado());

                var montoDescuentoAplic = precioBruto * porcDescuentoAplicado / 100;
                montoDescuentoAplic = Math.rint((montoDescuentoAplic) * 100) / 100;

                var montoDescuentoInicial = parseFloat(mat.getDescuentoInicialMonto()) * cantidad;

                var montoDescuentoAplicUnit = precioNeto * porcDescuentoAplicado / 100;
                montoDescuentoAplicUnit = Math.rint((montoDescuentoAplicUnit) * 100) / 100;

                var subtotal = precioNeto - precioNeto * porcDescuentoAplicado / 100;
                //Millas

                if (BanderaMillas) {
                    subtotal = subtotal - descuentoMillas;
                }


                subtotal = Math.rint(subtotal * 100) / 100;

                var total = precioBruto - montoDescuentoAplic;


                //millas
                if (BanderaMillas) {
                    total = total - descuentoMillas;
                    BanderaMillas = false;
                }


                total = Math.rint((total) * 100) / 100;

                mat.setPrecioUnitario(precioUnitario.toString());
                mat.setPorcentajeDescuento(porcDescuentoAplicado.toString());
                mat.setDescuentoAplicadoMonto(montoDescuentoAplicUnit.toString());
                mat.setPrecioTotal(total.toString());

                //Parámetros para mostrar en lista
                mat.setDescuentoInicialMonto(mat.getDescuentoInicialMonto());
                mat.setDescuentoInicialPorcentaje("0.00");

                var descuentoAplicadoPorcentaje = parseFloat(mat.getDescuentoAplicado());
                var montoDescuentoAplicado = precioNeto * descuentoAplicadoPorcentaje / 100;

                mat.setDescuentoAplicadoMonto(montoDescuentoAplicado.toString());
                mat.setDescuentoAplicadoPorcentaje(descuentoAplicadoPorcentaje.toString());

                mat.setPrecioTotal(total.toString());

                mat.setPrecioSubtotal(subtotal.toString());
                //Fin de parámetros

                mat.setPrecioASap(precioNeto.toString()); //Parámetros a sap
                mat.setDescuentoASap(mat.getDescuentoAplicado()); //Parámetros a sap

                setSumaTotal(sumatotal + precioInicial);
                setDescuentoTotal(descuentoTotal + montoDescuentoAplic + montoDescuentoInicial);
                this.subtotal += total;

                // Realizado para tomar en cuenta las fundas en la base imponible

                if (Constants.codigoFundas.contains("0000000000" + mat.getCodigo())) {
                    setIvaTotal(ivaTotal + (Constants.iceFundas * cantidad * (parseFloat(mat.getIva()) / 100)));
                } else {
                    setIvaTotal(ivaTotal + (total * (parseFloat(mat.getIva()) / 100)));
                }


                setIceTotal(iceTotal + (parseFloat(mat.getIce()) * parseInt(mat.getCantidad())));
                setCantItems(cantItems + parseInt(mat.getCantidad()));

            }
        });
    }

    // CIERRA EL MODAL
    const handleCloseModalClientReg = () => setShowModalClientReg(false);
    const handleCloseModalEditCant = () => setShowModalEditCant(false);
    const handleCloseModalTypeCashSelector = () => setShowModalTypeCashSelector(false);
    return (
        <>
            <br />
            <Card>
                <Card.Header>
                    Ingresar de materiales
                </Card.Header>
                <Card.Body>
                    <Form id="facturaItemsForm" onSubmit={onSubmitFormItemsFact}>
                        <Row className="square rounded border">
                            <Col xs={3} className="square border-end">
                                <Row>
                                    {switchesPago.map((item) => {
                                        return (
                                            <Col key={item.id} >
                                                <Form.Check type="checkbox" label={item.nombre.toString()} checked={item.isChecked} onChange={() => onChangeSwitchPago(item.id)} />
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Col>
                            <Col className="square border-end">
                                <Row>
                                    {switchId.map((item) => {
                                        return (
                                            <Col key={item.id} >
                                                <Form.Check type="checkbox" label={item.nombre.toString()} checked={item.isChecked} onChange={() => onChangeSwitchId(item.id)} />
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Col>
                            <Col xs={3}>
                                <Form.Check type="checkbox" label="Cliente Coorporativo" />
                            </Col>
                        </Row>
                        <br />
                        <Row className="square border-bottom">
                            {isCheckedCredito ? (
                                <Col xs={2}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Opciones de crédito:</Form.Label>
                                        <Form.Select>
                                            {selectPaymentConditionOptions.map((data) => {
                                                return (
                                                    <option key={data.CondiPagoDescripcion+data.CondiPagoCodigo} >{data.CondiPagoCodigo+': '+data.CondiPagoDescripcion}</option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            ) : (<div></div>)}
                            <Col xs={2} hidden>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seleccione la promoción de empleado:</Form.Label>
                                    <Form.Select>
                                        {employeePromotionOptions.map((data) => {
                                            return (
                                                <option key={data.id}>{data.nombre}</option>
                                            );
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>identificación del cliente:</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese identificación" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre del cliente" id="nameClient" name="nameClient" disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seleccionar vendedor:</Form.Label>
                                    <Form.Select>
                                        {local.map((data) => {
                                            return (
                                                <option key={data.id}>{data.nombre}</option>
                                            );
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row className="square border-bottom">
                            <Col xs={2}>
                                <Form.Group className="mb-3" id='formGroupNumbers'>
                                    <Form.Label>Código material:</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese código" id="codeMat" name="codeMat" onKeyDown={handleKeyDownMaterial} disabled />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción del material:</Form.Label>
                                    <Form.Control type="text" placeholder="Descripción" id="descriptionMat" name="descriptionMat" disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Precio:</Form.Label>
                                    <Form.Control type="text" placeholder="0.00" id="priceMat" name="priceMat" disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dcto ini:</Form.Label>
                                    <Form.Control type="text" placeholder="0.00" id="discountMatIni" name="discountMatIni" disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descuento:</Form.Label>
                                    <Form.Control type="text" placeholder="0.00" id="discountMat" name="discountMat" />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cantidad:</Form.Label>
                                    <Form.Control type="text" placeholder="0" id="amountMat" name="amountMat" />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <ButtonIcon text={'Agregar'} type='button' variant='dark' style={{ marginTop: '20%' }}>
                                    <BsFillCartPlusFill />
                                </ButtonIcon>
                            </Col>
                        </Row>
                        <br />
                        <Row className="square border-bottom">
                            <div className="tableContainer">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Cant.</th>
                                            <th>Material</th>
                                            <th>Descripción</th>
                                            <th>Precio Unit.</th>
                                            <th>Dcto. Ini.</th>
                                            <th>Subtotal</th>
                                            <th>Dcto.</th>
                                            <th>Total</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button onClick={handleEditMaterial}>Modificar</Button></td>
                                        </tr>
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button>Modificar</Button></td>
                                        </tr>
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button>Modificar</Button></td>
                                        </tr>
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button>Modificar</Button></td>
                                        </tr>
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button>Modificar</Button></td>
                                        </tr>
                                        <tr>
                                            <td >3</td>
                                            <td >10103963</td>
                                            <td >LG_TELEVISOR 65QNED80SQA 65" 4K QNED_Televisores / Monitores</td>
                                            <td >1399.00</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td >0.00</td>
                                            <td >1566.88</td>
                                            <td ><Button>Modificar</Button></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Row>
                                    <Col className="square border-end">
                                        <Row>
                                            <Col>
                                                <ButtonIcon variant='secondary' text={'Millas'}>
                                                    <RiPlaneFill />
                                                </ButtonIcon>
                                            </Col>
                                            <Col>
                                                <ButtonIcon variant='secondary' text='Precios'>
                                                    <MdAttachMoney />
                                                </ButtonIcon>
                                            </Col>
                                            <Col>
                                                <ButtonIcon variant='secondary' text={'Clientes'}>
                                                    <BsFillPersonLinesFill />
                                                </ButtonIcon>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col>
                                                <ButtonIcon variant='secondary' text={'Traslado'}>
                                                    <TbArrowsRightLeft />
                                                </ButtonIcon>
                                            </Col>
                                            <Col>
                                                <ButtonIcon variant='secondary' text={'Imprimir'}>
                                                    <BsFillPrinterFill />
                                                </ButtonIcon>
                                            </Col>
                                            <Col>
                                                <ButtonIcon variant='secondary' text={'Guía'}>
                                                    <RiTruckFill />
                                                </ButtonIcon>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="square border-end">
                                        <Row>
                                            <Col>
                                                <Form.Check type="checkbox" id="cbEntradaDiferida" label="Entrada diferida" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Entrada:</Form.Label>
                                                <Form.Control type="text" placeholder="0.00" id="deferredEntry" name="deferredEntry" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Financiamiento:</Form.Label>
                                                <Form.Control type="text" placeholder="0.00" id="financy" name="financy" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            {switchesInfo.map((item) => {
                                                return (
                                                    <Col key={item.id} >
                                                        <Form.Check type="checkbox" label={item.nombre.toString()} checked={item.isChecked} onChange={() => onChangeSwitchInfo(item.id)} />
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Observaciones:</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese observaciones" id="observation" name="observation" />
                                    </Form.Group>
                                </Row>
                            </Col>
                            <Col xs={4}>
                                <Row>
                                    <h6>Cantidad de Items:</h6>
                                    <h6>Suma:</h6>
                                    <h6>Descuento:</h6>
                                    <h6>Millas:</h6>
                                    <h6>SubTotal:</h6>
                                    <h6>ICE:</h6>
                                    <h6>IVA:</h6>
                                    <h6>TOTAL:</h6>
                                </Row>
                                <Row style={{ justifyContent: 'end' }}>
                                    <Col xs='auto'>
                                        <ButtonIcon variant='danger' text={'Cancelar'} type='button'>
                                            <MdCancel />
                                        </ButtonIcon>
                                    </Col>
                                    <Col xs='auto'>
                                        <ButtonIcon variant='dark' text={'Regalo'} type='button'>
                                            <BsGiftFill />
                                        </ButtonIcon>
                                    </Col>
                                    <Col xs='auto'>
                                        <ButtonIcon variant='primary' text={'Continuar'} type='submit'>
                                            <BsFillCheckCircleFill />
                                        </ButtonIcon>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card >
            <Modal show={showModalClientReg} onHide={handleCloseModalClientReg}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Identificación:</Form.Label>
                        <Form.Select>
                            {tipoIdentRegisterClient.map((data) => {
                                return (
                                    <option key={data.id}>{data.nombre}</option>
                                );
                            })}
                        </Form.Select>
                        <br />
                        <Form.Control type="text" placeholder="Ingrese la identificación" id="observation" name="observation" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el nombre completo" id="observation" name="observation" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dirección:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese la dirección" id="observation" name="observation" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el teléfono" id="observation" name="observation" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese el email" id="observation" name="observation" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalClientReg}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleCloseModalClientReg}>
                        Registrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalEditCant} onHide={handleCloseModalEditCant}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cantidad del Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nueva Cantidad:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese nueva cantidad" id="newAmount" name="newAmount" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalEditCant}>
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={handleCloseModalEditCant}>
                        Eliminar
                    </Button>
                    <Button variant="primary" onClick={handleCloseModalEditCant}>
                        Modificar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalTypeCashSelector} onHide={handleCloseModalTypeCashSelector}>
                <Modal.Header closeButton>
                    <Modal.Title>SELECCIONE TIPO DE CONTADO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {switchesContado.map((item) => {
                            return (
                                <Col key={item.id} >
                                    <Form.Check type="checkbox" label={item.nombre.toString()} checked={item.isChecked} onChange={() => onChangeSwitchContado(item.id)} />
                                </Col>
                            );
                        })}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalTypeCashSelector}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleCloseModalEditCant}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>);
}

export default FacturaItems;