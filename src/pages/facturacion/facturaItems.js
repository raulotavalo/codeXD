import React, { useState, useLayoutEffect } from "react";
import { Row, Col, Card, Form, Button, Table, Modal, ToastContainer, Toast } from 'react-bootstrap';
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
import soapGetSellers from "../../soap/soapGetSellers";
import ModalCreateClient from "../../components/facturaItems/ModalCreateClient";
import { Alert } from "bootstrap";
import soapGetMaterial from "../../soap/soapGetMaterial";
import soapGetCombo from "../../soap/soapGetCombo";
import soapGetMaterialPriceCEP from "../../soap/soapGetMaterialPriceCEP";
import soapGetMaterialPrice from "../../soap/soapGetMaterialPrice";
import soapGetDiscountsTable from "../../soap/soapGetDiscountsTable";
import soapSetExtensionClient from "../../soap/soapSetExtensionClient";
import soapGetMaterialPriceRetail from "../../soap/soapGetMaterialPriceRetail";
import soapGetFeaturesMaterial from "../../soap/soapGetFeaturesMaterial";
import soapGetSerieLote from "../../soap/soapGetSerieLote";
import { set } from "date-fns";

const FacturaItems = () => {


    //VARIABLES LECTURA REDUX
    const userRedux = useSelector(selectUser);
    const modoFacturaRedux = useSelector(selectModoFactura);
    const cashRegisterRedux = useSelector(getCashRegister);

    //ARRAY ITEMS
    const [materialesLista, setMaterialesLista] = useState([]);
    const [employeePromotionOptions, setEmployeePromotionOptions] = useState([]);

    //ARRAY SERIES
    const [serieOptions, setSerieOptions] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState([]);

    //VARIABLE BANDERA PARA MOSTRAR EL MODAL
    const [showModalClientReg, setShowModalClientReg] = useState(false);
    const [showModalEditCant, setShowModalEditCant] = useState(false);
    const [showModalTypeCashSelector, setShowModalTypeCashSelector] = useState(false);
    const [showModalSerie, setShowModalSerie] = useState(false);
    const [showModalCombo, setShowModalCombo] = useState(false);

    //VARIABLES TOAST
    const [showToast, setShowToast] = useState(false);
    const [toastMesagge, setToastMessage] = useState('');


    const [cuantitySerie, setCuantitySerie] = useState("");
    const [serieModalCode, setSerieModalCode] = useState("");

    //VARIABLE BANDERA PARA HABILITAR COMPONENTES
    const [enableIdentificacion, setEnableIdentificacion] = useState(true);
    const [enabledCodigo, setEnabledCodigo] = useState(false);
    const [enabledVendedores, setEnabledVendedores] = useState(true);
    const [enabledCantidad, setEnabledCantidad] = useState(false);
    const [enabledAddItemButton, setEnabledAddItemButton] = useState(false);
    const [enabledDescuentoAplicado, setEnabledDescuentoAplicado] = useState(true);
    const [enabledCreditoCheckbox, setEnabledCreditoCheckbox] = useState(true);
    const [enablePaymentConditions, setEnablePaymentConditions] = useState(false);
    const [enableEntradaEditText, setEnableEntradaEditText] = useState(true);
    const [enableIsEntredaDif, setEnableIsEntredaDif] = useState(false);
    const [enableContinuar, setEnabledContinuar] = useState(false);
    const [enabledObservacion, setEnabledObservacion] = useState(true);


    //VARIABLES CHECKBOX
    const [isCheckedCredito, setIsCheckedCredito] = useState(true);
    const [isCheckedContadoPPOS, setIsCheckedContadoPPOS] = useState(true);
    const [isCheckedAutoAddGrid, setIsCheckedAutoAddGrid] = useState(false);
    const [isCheckedInfoCredito, setIsCheckedInfoCredito] = useState(true);
    const [isCheckedTypeId, setIsCheckedTypeId] = useState(false);
    const [isCheckedFinalCustomer, setIsCheckedFinalCustomer] = useState(true);
    const [isCheckedDNI, setIsCheckedDNI] = useState(true);
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
    const [queriedMaterial, setQueriedMaterial] = useState();
    const [codigoMaterial, setCodigoMaterial] = useState("");
    const [cantidadMaterial, setCantidadMaterial] = useState("");
    const [materialEsVehiculo, setMaterialEsVehiculo] = useState(false);
    const [descuentoMaterial, setDescuentoMaterial] = useState("");
    const [descuentoAplicado, setdescuentoAplicado] = useState("");

    //VARIABLES OBSERVACION FACTURA
    const [observacion, setObservacion] = useState("");

    //VARIABLES OPCIONES SELECCIONADAS DE LOS SELECTS
    const [selectedPromocionEmpleado, setSelectedPromocionEmpleado] = useState("");
    const [selectedPaymentCondition, setSelectedPaymentCondition] = useState("");
    const [selectedSeller, setSelectedSeller] = useState("");

    const [selectSellersOptions, setSelectSellersOptions] = useState([]);
    const [selectPaymentConditionOptions, setSelectPaymentConditionOptions] = useState([]);
    const [selectEmployeePromotionOptions, setSelectEmployeePromotionOptions] = useState([]);

    const onSubmitFormItemsFact = async (event) => {
        event.preventDefault();
        //await insertCode();
    };


    const onChangeIdenClient = (event) => {
        setIdentificacion(event.target.value);
    }

    const onChangeMaterialCode = (event) => {
        setCodigoMaterial(event.target.value);
    }

    const onChangeMaterialCuantity = (event) => {
        setCantidadMaterial(event.target.value);
        setQueriedMaterial({ ...queriedMaterial, ...{ cantidad: event.target.value } })
    }

    const onChangeAppliedDiscount = (event) => {
        setDescuentoMaterial(event.target.value);
        setQueriedMaterial({ ...queriedMaterial, ...{ descuentoAplicado: event.target.value } })
    }

    const handleKeyDownClient = async (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (identificacion.length >= 1) {
                const wasGotClient = await getClientData(identificacion);
                if (!wasGotClient) {
                    setShowModalClientReg(true);
                } else {
                    setEnabledCodigo(true);
                    setClienteIngresado(true);
                }
            }
        }
    }

    const handleKeyDownMaterial = async (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (codigoMaterial.length > 0) {

                if (!clienteIngresado) {
                    alert("Vuelva a seleccionar un cliente porfavor");
                    return true;
                }

                if (isCheckedCredito) {
                    if (selectedPaymentCondition !== "") {
                        alert("Seleccione una condición de pago");
                        return true;
                    }
                }

                if (codigoMaterial.length < 6) { //Codigo menor de 6 números
                    alert("Código inválido");
                    return false;
                } else { //Si el código ingresado tiene 6 o más números
                    var material = null;

                    const dataString = await soapGetMaterial(cashRegisterRedux.selectedCashRegister.idAlmacen_LGORT, codigoMaterial, cashRegisterRedux.selectedCashRegister.idCanal_VTWEG);
                    try {
                        material = JSON.parse(dataString);
                    } catch (e) { }

                    if (material === null) {
                        alert("No se encontró el material");
                    } else {
                        delete material['_diffgr:id'];
                        delete material['_msdata:rowOrder'];
                        delete material['_diffgr:hasChanges'];
                        var sector = "";
                        if (material.sector) {
                            sector = material.sector;
                        } else {
                            sector = cashRegisterRedux.selectedCashRegister.idSector_SPART;
                        }

                        await ampliarCliente(cliente, sector);

                        if (esMaterialDeServicio(material)) {
                            material.stockLibreUtilizacion = 1.00;
                        }


                        console.log("Stock es: " + material.stockLibreUtilizacion + " el parse double: ");
                        console.log("Sector: " + material.sector + "  -  " + material.grupoArticulo);

                        setEnabledCantidad(true);
                        setEnabledDescuentoAplicado(true);

                        var stockCombo = null;



                        if (material.tipoMaterialFlag === "C") {

                            //Primero consultar si es combo
                            const codigoTrim = parseInt(material.codigo).toString();
                            const dataString = await soapGetCombo(cashRegisterRedux.selectedCashRegister.idOficinaVenta_VKBUR, material.centro, codigoTrim);
                            var datosCombo = null
                            try {
                                datosCombo = JSON.parse(dataString);
                            } catch (e) { }

                            if (datosCombo !== null) {

                                if (datosCombo.respuesta.codigoRespuesta === '0') {

                                    var stockMinimoComponent = await datosCombo.combos.filter((component) => {
                                        return component.tipoCombo === "P";
                                    });

                                    const stockMinimoCombo = stockMinimoComponent ? parseInt(stockMinimoComponent[0].stock) : -1;

                                    if (stockMinimoCombo < 0) {
                                        alert("Error al recuperar información de combo.");
                                        return false;
                                    } else {
                                        stockCombo = "" + stockMinimoCombo;
                                        material = { ...material, ...{ combos: datosCombo.combos } };

                                    }

                                } else {
                                    alert("Error al recuperar información de combo." +
                                        "\nCódigo de error: " + datosCombo.respuesta.codigoRespuesta +
                                        "\nMensaje: " + datosCombo.respuesta.mensajeRespuesta);
                                    return false;
                                }

                            } else {

                                //Webservice no retornó respuesta, no se valida si es combo o no
                                //No puede continuar
                                alert("Error al validar si el material es combo o no. " +
                                    "Intentar Nuevamente");
                                return false;
                            }
                            material.stockLibreUtilizacion = stockCombo;
                            material = await actualizarPrecioYStockMaterial(material, identificacion);
                        } else {

                            material = await actualizarPrecioYStockMaterial(material, identificacion);

                        }

                        //La sociedad 2010 no utiliza tabla de descuentos
                        switch (cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS) {
                            case "1010": //AJE (Webservice consultarPrecios)
                                if (!cashRegisterRedux.selectedCashRegister.esquema === "AJE-TABERNAS")
                                    material = actualizarPrecioMaterial(material, cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS);
                                break;
                            case "3010": //MERCOINTELG  (Webservice actValoresFactura)
                                material = actualizarPrecioMaterial(material, cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS);
                                break;
                        }

                        if (parseFloat(material.stockLibreUtilizacion) <= 0.00) {
                            //Si el stock del material es cero, que no se pueda btnAgregarItem
                            //Se genera dialogo de aviso

                            alert("Sin STOCK del material: " + material.descripcion);

                            setEnabledCantidad(false);
                            setEnabledDescuentoAplicado(false);
                            setEnabledAddItemButton(false);

                            if (cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS === "2010")
                                material.precio = material.precioNeto;

                            var c = parseFloat(material.stockLibreUtilizacion);

                            if (c > 0) {
                                setCantidadMaterial("1"); //Setea por defecto para que se pueda seleccionar 1
                            } else {
                                setCantidadMaterial(material.stockLibreUtilizacion);
                            }

                        } else {

                            setEnabledCantidad(true);
                            setEnabledDescuentoAplicado(true);
                            setEnabledAddItemButton(true);

                            if (cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS === "2010") {
                                material.precio = material.precioNeto;
                            }

                            var c = parseFloat(material.stockLibreUtilizacion);

                            if (c > 0 || esMaterialDeServicio(material)) {
                                setCantidadMaterial("1");
                            } else {
                                setCantidadMaterial(material.stockLibreUtilizacion);
                            }

                            setQueriedMaterial(material);
                            if (material.precio) {
                                if (isCheckedAutoAddGrid && queriedMaterial.precio !== "" && parseFloat(queriedMaterial.precio) > 0.00) {
                                    agregarItemGrilla();
                                }
                            }
                            return true;
                        }
                    }

                }
            }
        }
    }

    const actualizarPrecioMaterial = (infoMaterial, sociedad) => {

        var materialUnico = [];

        const material = {
            almacen: infoMaterial.almacen,
            cantidad: "1",
            codigo: infoMaterial.codigo,
            centro: infoMaterial.centro
        };

        materialUnico = [...materialUnico, material];

        var tablaDescuento = null;

        switch (sociedad) {
            case "1010": //AJE
                const pPromoEmpleado = obtenerPromoEmpleado();
                const condicionPago = obtenerCondicionPago();
                const montoEntrada = entrada;
                //-----NO HAY METODOS EN SAP----//
                tablaDescuento = soapGetDiscountsTable(cliente.identificacion, material.sector, material.ofVent, material.canal, condicionPago, material.sociedad, materialUnico, false, true);
                break;
            case "3010": //MERCOINTELG
                tablaDescuento = actualizarValoresFactura(material, materialUnico, true, false);
                break;
        }


        if (sociedad !== "1010" && sociedad !== "2010") {
            try {

                const precioBruto = parseFloat(tablaDescuento.precioBruto);
                const precioNeto = parseFloat(tablaDescuento.precioNeto);
                const descuentoInicialPorcentaje = (precioNeto / precioBruto) * 100;
                descuentoInicialPorcentaje = 100 - Math.round(descuentoInicialPorcentaje * 100) / 100;
                descuentoInicialPorcentaje = Math.round(descuentoInicialPorcentaje * 100) / 100;

                material.precio = precioBruto.toString();
                material.descuentoInicial = descuentoInicialPorcentaje.toString();
            } catch (e) {
                console.log(JSON.stringify(e));
            }
        } else {
            material.descuentoInicial = "0.00";
        }
        return material;
    }

    const agregarItemGrilla = () => {
        var encontrar = false;
        var cantidadAnt = "0";

        //Itera a travez de la lista de materiales para ver si el material ya se ingresó
        var materialFinded = materialesLista.filter((materialAdded) => {
            return (materialAdded.codigo === queriedMaterial.codigo);
        });

        if (materialFinded === true) {
            cantidadAnt = materialFinded.cantidad;
            alert("El material " + queriedMaterial.codigo + " ya se encuentra en la lista")

            setCantidadMaterial(cantidadMaterial + cantidadAnt);

            eliminarItem(queriedMaterial.codigo);
            addItem();

        } else {
            setQueriedMaterial({ ...queriedMaterial, ...{ cantidad: cantidadMaterial } });
            addItem();
        }
    }


    const eliminarItem = (codigo) => {
        const materialesFilter = materialesLista.filter((material) => {
            return (material.codigo !== codigo);
        });
        setMaterialesLista(materialesFilter);
    }


    const addItem = () => {


        var stockDisponible = true;

        try {
            //Si es material de servicio, permite pasar la validación de stock
            if (esMaterialDeServicio(queriedMaterial)) {
                stockDisponible = true;
            } else {
                stockDisponible = cantidadMaterial <= parseFloat(queriedMaterial.stockLibreUtilizacion);
            }

            console.log("STOCK DE MATERIAL = " + queriedMaterial.stockLibreUtilizacion);

        } catch (e) {
            console.log("error:" + JSON.stringify(e));
        }

        var validarMaterialFlag = validarMaterial();

        if (validarMaterialFlag !== "") {
            alert(validarMaterialFlag);
            return;
        }

        if (!stockDisponible) {
            alert("El material: " + queriedMaterial.descripcion + " tiene " + queriedMaterial.stockLibreUtilizacion + " de stock disponible");
            return;
        }

        switch (queriedMaterial.tipoMaterialFlag) {

            //Sujeto a serie
            case Constants.tipoMaterial.serie:

                validateSerie(queriedMaterial, cantidadMaterial);
                break;
            //Sin estar sujeto ni a serie ni a lote
            case Constants.tipoMaterial.ni_lote_ni_serie:

                if (!setListaBajarProducto(Constants.tipoMaterial.ni_lote_ni_serie) === "") {
                    setToastMessage("No está sujeto a lote o serie");
                    setShowToast(true);
                }

                break;

            //Sujeto a lote
            case Constants.tipoMaterial.lote:

                validateLote(queriedMaterial, cantidadMaterial);
                break;

            case Constants.tipoMaterial.combo:

                if (!queriedMaterial.combos) {
                    alert("No se recuperaron items del combo. Intentar nuevamente.");
                    break;
                }

                queriedMaterial.combos.map(async (itemCombo) => {

                    if (itemCombo.getSujeto().equals("N")) {
                        itemCombo.validado = true;
                    }
                    try {
                        var cantidadTotalItem = parseInt(parseFloat(itemCombo.cantidad())) * cantidadMaterial;
                        itemCombo.cantidadTotal = cantidadTotalItem;
                        const dataString = await soapGetMaterial(cashRegisterRedux.selectedCashRegister.idAlmacen_LGORT, itemCombo.codigo, cashRegisterRedux.selectedCashRegister.idCanal_VTWEG);
                        var materialItemCombo = null;

                        try {
                            materialItemCombo = JSON.parse(dataString);
                        } catch (e) { }

                        if (materialItemCombo === null) {
                            alert("No se encontró material del combo " + itemCombo.codigo);

                        } else {

                            itemCombo = { ...itemCombo, ...{ materialItemCombo } };

                        }
                    } catch (e) { }
                }
                );

                setListaBajarProducto(Constants.tipoMaterial.combo);
                setEnabledContinuar(false);         //DESACTIVA BOTON ACEPTAR (EL VISTO) PARA CREAR LA FACTURA
                setShowModalCombo(true);

                break;

        }
    }






    const validateLote = async (materialLote, cantidadMaterialLote) => {

        const lotesSapJSON = await soapGetSerieLote(queriedMaterial.codigo, cashRegisterRedux.selectedCashRegister.idAlmacen_LGORT, cashRegisterRedux.selectedCashRegister.idCentro_WERKS);
        var lotesSap = null;
        try {
            lotesSap = JSON.parse(lotesSapJSON);
        } catch (e) { }

        if (lotesSap !== null) {
            alert("LOTES: " + JSON.stringify(lotesSap));
            var lotesXInsertar = lotesSap;
            var cantidadAux = cantidadMaterial;
            var cantidadxPedir = cantidadMaterial;
            var stockTotalLotes = 0.00;
            lotesSap.map((lote) => {
                delete lote['_diffgr:id'];
                delete lote['_msdata:rowOrder'];
                delete lote['_diffgr:hasChanges'];
                stockTotalLotes = stockTotalLotes + parseFloat(lote.Stock.replace(",", "."));
            });

            if (cantidadMaterial <= stockTotalLotes) {
                var lotesIngresar = [];
                lotesSap.map((lote) => {
                    if (cantidadxPedir > 0.00) {
                        var cantidadLote = parseFloat(lote.Stock.replace(",", "."));
                        if (cantidadLote > 0.00) {
                            if (cantidadxPedir > cantidadLote) {
                                cantidadAux = cantidadLote;
                            } else {
                                cantidadAux = cantidadxPedir;
                            }
                            var loteEscogido = { ...lote, ...{ cantidadEscogida: cantidadAux.toString() } };
                            alert(JSON.stringify(loteEscogido));
                            lotesIngresar = [...lotesIngresar, loteEscogido];
                            cantidadxPedir = cantidadxPedir - cantidadAux;
                        }
                    }
                });

                materialLote = { ...queriedMaterial, ...{ lote: lotesIngresar } };
                alert("Material Final: " + JSON.stringify(materialLote));
                setQueriedMaterial(materialLote);
                setLotesToSell(materialLote);

            } else {
                alert("Los lotes solo cuentan con: " + stockTotalLotes + " de stock");
            }
        } else {
            alert("Error al recuperar Lotes");
        }

    }


    const validateSerie = async (materialSerie, cantidadMaterialSerie) => {
        //COMPROBACIÓN DE PERFIL DE MATERIAL PARA SOLO PODER FACTURAR UN CARRO


        setMaterialEsVehiculo(false);
        if (materialSerie.perfilNumeroSerie === "Z002") {
            setMaterialEsVehiculo(true);
        }

        var carroYaEnLista = false;

        if (materialEsVehiculo) {
            if (cantidadMaterialSerie > 1) {
                alert("Solo puede facturar 1 vehículo");
            }
            carroYaEnLista = materialesLista.filter((materialSerie) => {
                return materialSerie.perfilNumeroSerie = "Z002";
            });
        }

        if (carroYaEnLista) {
            alert("Solo puede facturar 1 vehículo, ya existe un vehículo en la lista");
        } else {

            const dataSeries = await soapGetSerieLote(materialSerie.codigo, cashRegisterRedux.selectedCashRegister.idAlmacen_LGORT, cashRegisterRedux.selectedCashRegister.idCentro_WERKS);

            var seriesLotesArrays = null;
            try {
                seriesLotesArrays = JSON.parse(dataSeries);
            } catch (e) { }
            if (seriesLotesArrays !== null) {
                if (typeof (seriesLotesArrays) === "object" && seriesLotesArrays.length > 0) {
                    const series = seriesLotesArrays.map((serie) => { return ({ serie: serie.SerieLotes, stock: serie.Stock, isChecked: false }) });

                    setSerieOptions(series);
                    //Si recupero las series del webservice, por lo que el array es mayor que 0
                } else {
                    alert("ERROR NO SE RECUPERARON DATOS DE SERIE O LOTES");
                }

                //ALERT DIALOG PARA SERIES.

                //alert("Sujeto a Serie");
                setShowModalSerie(true);
                setSerieModalCode(queriedMaterial.codigo);
                setCuantitySerie(cantidadMaterial);
            } else {
                alert("No se pudo consultar las series/lotes del material");
            }
        }

    }


    const onChangeAutoAdd = (checkedSerie) => {

    }

    const onChangeCheckSerie = (checkedSerie) => {



        setSerieOptions(serieOptions.map((optionSerie) => {
            if (optionSerie.serie === checkedSerie.serie) {
                return { ...optionSerie, isChecked: !(optionSerie.isChecked) }
            } else {
                return optionSerie
            }
        }));


        if (!checkedSerie.isChecked) {

            var serie = {

                cantidad: "1",
                codigo: queriedMaterial.codigo,
                serie: checkedSerie.serie,
                tipo: Constants.tipoMaterial.serie

            };

            setSelectedSeries([...selectedSeries, serie]);

        } else {
            setSelectedSeries(selectedSeries.filter((serieSelected) => {
                return (!(serieSelected.codigo === queriedMaterial.codigo && serieSelected.serie === checkedSerie.serie))
            }));
        }
    }

    const validarMaterial = () => {
        var mensajeError = "";

        if (!queriedMaterial) {
            return "Vuelva a seleccionar el material";
        }

        if (cantidadMaterial === null || cantidadMaterial === "") {
            return "Cantidad del material no puede ser 0";
        }

        if (!selectedPaymentCondition) {
            mensajeError = "Porfavor seleccione una condición de pago de crédito";
        }

        const c = parseFloat(cantidadMaterial);
        if (c <= 0) {
            mensajeError = "Ingrese una cantidad correcta";
        }

        if (!queriedMaterial.precio) {
            mensajeError = "No se recuperó precio. Porfavor consultar nuevamente.";
        } else {
            try {
                const precio = parseFloat(queriedMaterial.precio);
                if (precio == 0.0) {
                    mensajeError = "El material no tiene precio. Porfavor consultar nuevamente.";
                }
            } catch (e) {
                mensajeError = "No se recuperó precio. Porfavor consultar nuevamente.";
                e.printStackTrace();
            }
        }

        return mensajeError;
    }

    const actualizarValoresFactura = (material, materiales, cantidadUnica, conFinanciamiento) => {

        var sCondicion;

        if (!isCheckedCredito) {
            if (isCheckedContadoPPOS)
                sCondicion = "PPOS";
            else
                sCondicion = "PTAP";
        } else {
            sCondicion = selectedPaymentCondition.split(";")[0];
        }

        return soapUpdateBillValues("cliente", material.sector, material.ofVent, material.canal, material.condicionPago, material.sSociedad, materiales);
    }

    const actualizarPrecioYStockMaterial = async (material, codigoSapCliente) => {

        if (material) {
            const mater = parseInt(material.codigo);

            //Retorna el precio del WS
            var prec = null;
            var precJSON;

            if (cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS === "2010") {
                precJSON = await soapGetMaterialPriceCEP(mater.toString(), codigoSapCliente, cashRegisterRedux.selectedCashRegister.idAlmacen_LGORT, material.sector, cashRegisterRedux.selectedCashRegister.idOficinaVenta_VKBUR, cashRegisterRedux.selectedCashRegister.idCanal_VTWEG, cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS);
            } else if (cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS === "3010" || cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS === "4010") {
                precJSON = await soapGetMaterialPrice(cashRegisterRedux.selectedCashRegister.idAlmacen_LGORT, material.sector, cashRegisterRedux.selectedCashRegister.idCanal_VTWEG);
            } else if (cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS === "1010") {
                precJSON = await soapGetMaterialPriceRetail(material.precio, "AJE_ELECTRO", cliente.ide, material.codigo, "",
                    material.grupoArticulo, cashRegisterRedux.selectedCashRegister.idAlmacen_LGORT, material.centro, material.sector, "PPOS", "VIG1",
                    material.estado, "S", material.costo, material.tipoMaterialFlag, material.costo, "S", "1", "N");
            }
            try {
                prec = JSON.parse(precJSON).split(";");
            } catch (e) { }

            //Si el precio no es nulo actualiza la tabla
            if (prec !== null) {

                if (prec[0] === "0") {

                    material.precio = prec[1];

                }

                //Caso contrario recupera el valor que tenia almacenado en la tabla
            } else {

                material.precio = "0.0";
                material.precioNeto = "0.0";
                alert("No se Recupero Precio del Servidor");

            }

        }

        return (material);
    }

    const ampliarCliente = async (infoCliente, sectorMaterial) => {

        if ((infoCliente === "" || sectorMaterial === "") || (infoCliente === null || sectorMaterial === null)) {
            console.log("Error ampliar cliente metod");
            return false;
        }

        var sectoresArray = [];
        sectoresArray = [...sectoresArray, sectorMaterial];
        sectoresArray = [...sectoresArray, cashRegisterRedux.selectedCashRegister.idSector_SPART];

        const resp = await soapSetExtensionClient(cashRegisterRedux.selectedCashRegister.idCanal_VTWEG, cliente.SAPcod, cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS, sectoresArray);

        if (resp === null) {
            return false;
        } else {
            console.log("RESPUESTA AMPLIACION: " + resp);
            return true;
        }

    }

    const esMaterialDeServicio = (material) => {

        var esMaterialDeServicio = false;
        switch (material.tipoMaterial) {
            //POR SOCIEDADES
            case "MSER": //Tipo de material de servicio para 3010
                esMaterialDeServicio = true;
                break;
            case "DIEN": //Tipo de material de servicio para ??
            case "SERV": //Tipo de material de servicio para ??
            case "ESER":
                esMaterialDeServicio = true;
                break;
        }

        return esMaterialDeServicio;
    }

    const handleEditMaterial = (event) => {
        setShowModalEditCant(true);
    }

    const handleCloseToast = (event) => {
        setShowToast(false);
    }

    useLayoutEffect(() => {
        if (cashRegisterRedux) {
            if (cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS === "2010") {
                setEnabledVendedores(false);
            }
            getPaymentConditions();
            getSellers();
        }

    }, [cashRegisterRedux]);

    const getPaymentConditions = async () => {

        var dataString = await soapGetPaymentConditions(cashRegisterRedux.selectedCashRegister.idOficinaVenta_VKBUR);
        var dataJSON = null;
        try {
            dataJSON = JSON.parse(dataString);
        } catch (e) { }

        if (dataJSON !== null) {
            if (dataJSON == 'undefined') {
                alert('No se recuperaron las condiciones de pago');
            }
            else {
                if (dataJSON[0] == "4") {
                    alert("Error: " + JSON.stringify(dataJSON[1]));
                } else {
                    var menuOptionsArray = [];
                    if (typeof (dataJSON) === 'object' && !dataJSON.length) {
                        menuOptionsArray = [...menuOptionsArray, { dataJSON }];
                    } else {
                        dataJSON.map((optionJSON, index) => {
                            menuOptionsArray = [...menuOptionsArray, optionJSON];
                        });
                    }
                    setSelectPaymentConditionOptions(menuOptionsArray);
                    if (menuOptionsArray.length > 0) {
                        setSelectedPaymentCondition(menuOptionsArray[0]);
                    }
                }
            }
        } else {
            alert('No se recuperaron condiciones de pago');
        }
    }

    const getSellers = async () => {

        var dataString = await soapGetSellers(cashRegisterRedux.selectedCashRegister.idOficinaVenta_VKBUR);

        var dataJSON = null;
        try {
            dataJSON = JSON.parse(dataString);
        } catch (e) { }

        if (dataJSON !== null) {
            if (dataJSON == 'undefined') {
                alert('No se recuperaron los vendedores');
            }
            else {
                if (dataJSON[0] == "4") {
                    alert("Error: " + JSON.stringify(dataJSON[1]));
                } else {
                    var menuOptionsArray = [];
                    if (typeof (dataJSON) === 'object' && !dataJSON.length) {
                        menuOptionsArray = [...menuOptionsArray, dataJSON];
                    } else {
                        dataJSON.map((optionJSON, index) => {
                            menuOptionsArray = [...menuOptionsArray, optionJSON];
                        });
                    }
                    setSelectSellersOptions(menuOptionsArray);
                    if (menuOptionsArray.length > 0) {
                        setSelectedSeller(menuOptionsArray[0]);
                    }
                }
            }
        } else {
            alert('No se recuperaron los vendedores');
        }
    }


    //VERIFICA QUE SOLO UN CHECKBOX ESTE ACTIVO
    function onChangeSwitchContado(id) {

        setSwitchesContado(switchesContado.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }));
        if (id === '2') {
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
    function onChangeClientCoorp(id) {

    }

    //VERIFICA QUE SOLO UN CHECKBOX ESTE ACTIVO
    function onChangeSwitchId(id) {
        setSwitchId(switchId.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }));
        if (id === 'cbCedula') {
            setIsCheckedDNI(true);
            setIsCheckedFinalCustomer(false);

            setIdentificacion("");
            setClienteIngresado(false);
            setEnabledCodigo(false);
            setEnabledCantidad(false);
            setEnabledDescuentoAplicado(false);
            setCodigoMaterial("");
            setSwitchesPago(switchesPago.map(x => {
                return { ...x, enable: true };
            }));

            setEnabledCreditoCheckbox(true);
            if (!isCheckedCredito) {
                setEnableIdentificacion(true);
            }
            setCliente(null);
        } else if (id === 'cbFinalConsumer') {
            setIsCheckedDNI(false);
            setIsCheckedFinalCustomer(true);
            setIsCheckedCredito(false);
            setSwitchesPago(switchesPago.map(x => {
                if (x.id === 'cbCredito') {
                    return { ...x, enable: false, isChecked: false };
                } else {
                    return { ...x, enable: true, isChecked: true }
                }
            }));
            setIdentificacion("9999999999");
            setEnabledCreditoCheckbox(false);
            setEnabledCodigo(true);
            setClienteIngresado(true);
            setEnableIdentificacion(false);      //Deshabilitar para consumidor final
            getClientData("9999999999");
        }
    }

    const getClientData = async (ident) => {
        var dataString = await soapGetCustomerData(ident);
        var dataJSON = null;
        try {
            dataJSON = JSON.parse(dataString);
        } catch (e) {
        }
        if (dataJSON) {
            if (dataJSON == 'undefined') {
                alert('No se recuperaro datos del cliente');
            }
            else {
                if (dataJSON[0] == "4") {
                    alert("Error: " + JSON.stringify(dataJSON[1]));
                } else {
                    if (typeof (dataJSON) === 'object' && !dataJSON.length) {
                        setCliente(dataJSON);
                        return true;
                    }
                }
            }
        } else {
            alert('No se recuperaron datos del cliente');
        }
        return false;
    }

    function onChangeSwitchPago(id) {
        setSwitchesPago(switchesPago.map(x => {
            if (x.id === id) {
                return { ...x, isChecked: true };
            }
            else {
                return { ...x, isChecked: false }
            };
        }))
        setSwitchesContado(switchesContado.map(x => {
            if (x.id === id) return { ...x, isChecked: true };
            else return { ...x, isChecked: false };
        }))
        if (id === 'cbContado') {
            setIsCheckedCredito(false);
            const society = cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS;
            if (society === "3010") {
                setShowModalTypeCashSelector(true);
            } else {
                if (total === "")
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

        if (cashRegisterRedux.selectedCashRegister.idSociedad_BUKRS === "1010") {
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

    const updateMaterialList = async (materialListToUpdate) => {
        alert("materialesLista ENTRADA : " + JSON.stringify(materialListToUpdate));
        let BanderaMillas = true;
        var materialesListaActualizada = [];
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

        if (sSociedad === "2010") {
            utilizaTablaDescuento = false;  //No utiliza tablas de descuento
        }

        var tablaDescuento = null;
        var tablaDescuentoJSON = "";

        let cantidadUnica = false;
        //Si es a crédito trae material de financiamiento. Es decir a crédito, o a crédito con entrada o entrada diferida
        let conFinanciamiento = !getTipoFactura() === "Contado";


        if (utilizaTablaDescuento) {

            //Validar sociedad, si es 1010 (AJE) utilizar webservice consultarPrecios
            if (sSociedad === "1010") { //Revisar con Chui
                const promoEmpleado = obtenerPromoEmpleado();
                const condicionPago = obtenerCondicionPago();
                const montoEntrada = entrada;
                tablaDescuentoJSON = await soapUpdatePrices("cliente", sector, ofVent, canal, condicionPago, sSociedad, materialListToUpdate, promoEmpleado, entrada);
            } else { //Caso contrario es MERCOINTELG, sociedad 3010
                const condicionPago = obtenerCondicionPago();
                tablaDescuentoJSON = await soapUpdateBillValues("cliente", sector, ofVent, canal, condicionPago, sSociedad, materialListToUpdate);
            }
            try {
                tablaDescuento = JSON.parse(tablaDescuentoJSON);
            } catch (e) { }
            if (tablaDescuento !== null) {
                if (tablaDescuento != "") {

                    recuperoTablaDescuento = tablaDescuento.respuesta.trim() === "0";

                    if (tablaDescuento.respuesta !== "0") {
                        alert(tablaDescuento.respuesta);
                    }
                } else {
                    recuperoTablaDescuento = false;
                }
            } else {
                recuperoTablaDescuento = false;
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
            materialesListaActualizada = materialListToUpdate.map((matActualizado) => {
                {
                    for (var m = j; m < tablaDescuento.intereses.length; m++) {
                        var codlength = matActualizado.codigo.length;
                        var codlengthaux = tablaDescuento.materialCod[m].length();
                        var codTableDesc = tablaDescuento.materialCod[m].trim().substring(codlengthaux - codlength);
                        if (matActualizado.codigo === codTableDesc) {
                            matActualizado.precio = tablaDescuento.precioNeto[m];
                            matActualizado.impuesto = tablaDescuento.impuesto[m];
                            matActualizado.precioBruto = tablaDescuento.getPrecioBruto(m);
                            matActualizado.descuentoInicialPorcentaje = tablaDescuento.getDescuentoInicialPorcentaje(m);
                            matActualizado.precioNeto = tablaDescuento.getPrecioNeto(m);
                            matActualizado.descuentoSapMonto = tablaDescuento.getDescuentoInicialMonto(m);
                            matActualizado.descuentoAplicadoMonto = tablaDescuento.getDescuentoAplicadoMonto(m);
                            matActualizado.precioTotal = tablaDescuento.getPrecioTotal(m);
                            matActualizado.iva = tablaDescuento.getImpuesto(m);
                            matActualizado.materialValidado = true;
                        }
                    }
                    /*if(!matActualizado.tieneDescuento()){
                        matActualizado.setDescuentoAplicado(tablaDescuento.getDescuentoInicialPorcentaje(j));
                    }*/
                }
            });

            setMaterialesLista(materialesListaActualizada);


        } else {  //Si no recupera tabla de descuento y la sociedad actual utiliza tabla de descuento (1010, 3010)
            //cambia el status del material a inválido
            //Si la sociedad actual NO utiliza tabla de descuento (2010) cambia el status del material a válido

            materialesListaActualizada = materialListToUpdate.map((mat) => {
                if (utilizaTablaDescuento) {
                    mat.materialValidado = false;
                } else {
                    mat.materialValidado = true;
                }
                return (mat);
            })
        }

        const materialesUpdate = materialListToUpdate.map((mat) => {
            alert("Material To Update: " + JSON.stringify(materialListToUpdate) +
                " utilizaTableDescuento: " + utilizaTablaDescuento + " recuperoTablaDescuento: " + recuperoTablaDescuento);
            mat.imagen = (getImagenMaterial(mat.codigo));

            if (utilizaTablaDescuento && recuperoTablaDescuento) {

                var precioUnitario = 0.00;
                var precioBruto = parseFloat(mat.precioNeto);

                var montoDescuentoSap;
                var porcentajeDescuentoInicial;
                var cantidad = parseInt(mat.cantidad);


                if (!cantidadUnica) { //Si es Mercointelg, trae valores multiplicados por cantidad

                    try {

                        precioUnitario = precioBruto / cantidad;
                        precioUnitario = Math.round(precioUnitario * 100) / 100;

                    } catch (e) {
                        e.printStackTrace();
                    }

                    //Descuento inicial
                    //montoDescuentoSap =   parseFloat(mat.getDescuentoSapMonto()) / cantidad;
                    montoDescuentoSap = parseFloat(mat.descuentoSapMonto);
                    montoDescuentoSap = Math.round((montoDescuentoSap) * 100) / 100;
                    //Descuento inicial en porcentaje
                    //porcentajeDescuentoInicial = (montoDescuentoSap / precioUnitario)*100;
                    //porcentajeDescuentoInicial = (montoDescuentoSap / precioBruto)*100;

                    var descuentoInicialPorcentaje = mat.descuentoInicialPorcentaje;

                    if (descuentoInicialPorcentaje != null) {
                        porcentajeDescuentoInicial = parseFloat(descuentoInicialPorcentaje);
                    } else {
                        porcentajeDescuentoInicial = 0.00;
                    }

                    porcentajeDescuentoInicial = Math.round((porcentajeDescuentoInicial) * 100) / 100;

                } else { //Si es 1010, trae valores únicos

                    try {
                        precioUnitario = precioBruto;
                        precioUnitario = Math.round(precioUnitario * 100) / 100;

                    } catch (e) {
                        e.printStackTrace();
                    }

                    //Descuento inicial
                    montoDescuentoSap = parseFloat(mat.descuentoSapMonto);
                    montoDescuentoSap = Math.round((montoDescuentoSap) * 100) / 100;
                    //Descuento inicial en porcentaje

                    var descuentoInicialPorcentaje = mat.descuentoInicialPorcentaje;

                    if (descuentoInicialPorcentaje != null) {
                        porcentajeDescuentoInicial = parseFloat(descuentoInicialPorcentaje);
                    } else {
                        porcentajeDescuentoInicial = (montoDescuentoSap / precioUnitario) * 100;
                        porcentajeDescuentoInicial = Math.round((porcentajeDescuentoInicial) * 100) / 100;
                    }

                }


                var precioNeto = parseFloat(mat.precioNeto);
                var subtotal = precioNeto;
                subtotal = Math.round(subtotal * 100) / 100;

                //Descuento aplicado
                var montoDescuentoAplicado = parseFloat(mat.descuentoAplicadoMonto);
                montoDescuentoAplicado = Math.round((montoDescuentoAplicado) * 100) / 100;

                //Descuento aplicado en porcentaje
                //Double porcentajeDescuentoAplicado = (montoDescuentoAplicado / subtotal)*100;
                //porcentajeDescuentoAplicado = Math.round((porcentajeDescuentoAplicado)*100)/100;

                //Total
                var total = parseFloat(mat.precioTotal);
                total = Math.round(total * 100) / 100;

                if (total == 0) {
                    total = subtotal;
                }

                //Descuento total = descuento inicial + descuento aplicado
                var montoDescuentoTotal = montoDescuentoSap + montoDescuentoAplicado;


                //Texto de la lista
                var materialP = {
                    precioUnitario: precioUnitario.toString(),
                    descuentoInicialMonto: montoDescuentoSap.toString(),
                    descuentoInicialPorcentaje: porcentajeDescuentoInicial.toString(),
                    descuentoAplicadoMonto: montoDescuentoAplicado.toString(),
                    descuentoAplicadoPorcentaje: mat.descuentoAplicado,
                    precioTotal: total.toString(),
                    subtotal: subtotal.toString(),
                    //mat.setPrecioTotal();
                    //Fin parámetros a la lista


                    precioASap: precioUnitario.toString(), //Parámetros a SAP

                    //Si se genera pedido se utiliza otro webservice para crear pedido
                    //Este webservice requiere el monto de descuento total
                    descuentoASap: modoFacturaRedux === "Pedido" ? montoDescuentoTotal.toString() : mat.descuentoAplicado,

                }

                console.log("<<<<<<<<<<<<-------------------------------------------->>>>>>>>>>>>");
                alert("MATERIAL P: " + JSON.stringify(materialP));

                mat = { ...mat, ...materialP }
                alert("MAT: " + JSON.stringify(mat));
                console.log("<<<<<<<<<<<<-------------------------------------------->>>>>>>>>>>>");

                setSubTotal(sumatotal + precioBruto);
                setDescuentoTotal(descuentoTotal + montoDescuentoTotal);
                this.subtotal += total;
                setIvaTotal(ivaTotal + parseFloat(mat.iva));
                setIceTotal(iceTotal + (parseFloat(mat.ice) * parseInt(mat.cantidad)));
                setCantItems(cantItems + parseInt(mat.cantidad));


            } else if (!utilizaTablaDescuento) { //Para sociedad 2010, perfumería CEP

                var cantidad = parseFloat(mat.cantidad);
                //Double precioUnitario =   parseFloat(mat.getPrecio().replace(",","."));
                var precioNeto = parseFloat(mat.precioNeto.replace(",", "."));
                var precioUnitario = parseFloat(mat.precio.replace(",", "."));
                precioUnitario = Math.round(precioUnitario * 100) / 100;

                var precioInicial = parseFloat(mat.cantidad) * precioUnitario;

                var precioBruto = parseFloat(mat.cantidad) * precioNeto;
                precioBruto = Math.round(precioBruto * 100) / 100;

                var porcDescuentoAplicado = parseFloat(mat.descuentoAplicado);

                var montoDescuentoAplic = precioBruto * porcDescuentoAplicado / 100;
                montoDescuentoAplic = Math.round((montoDescuentoAplic) * 100) / 100;

                var montoDescuentoInicial = parseFloat(mat.descuentoInicialMonto) * cantidad;

                var montoDescuentoAplicUnit = precioNeto * porcDescuentoAplicado / 100;
                montoDescuentoAplicUnit = Math.round((montoDescuentoAplicUnit) * 100) / 100;

                var subtotal = precioNeto - precioNeto * porcDescuentoAplicado / 100;
                //Millas

                if (BanderaMillas) {
                    subtotal = subtotal - descuentoMillas;
                }


                subtotal = Math.round(subtotal * 100) / 100;

                var total = precioBruto - montoDescuentoAplic;


                //millas
                if (BanderaMillas) {
                    total = total - descuentoMillas;
                    BanderaMillas = false;
                }


                total = Math.round((total) * 100) / 100;

                var materialP = {
                    precioUnitario: precioUnitario.toString(),
                    descuentoInicialMonto: mat.descuentoInicialMonto,
                    descuentoInicialPorcentaje: '0.00',
                    descuentoAplicadoMonto: precioNeto * mat.descuentoAplicado / 100,
                    descuentoAplicadoPorcentaje: mat.descuentoAplicado,
                    setPorcentajeDescuento: porcDescuentoAplicado.toString(),
                    precioTotal: total.toString(),
                    subtotal: subtotal.toString(),
                    //mat.setPrecioTotal();
                    //Fin parámetros a la lista


                    precioASap: precioNeto.toString(), //Parámetros a SAP

                    //Si se genera pedido se utiliza otro webservice para crear pedido
                    //Este webservice requiere el monto de descuento total
                    descuentoASap: mat.descuentoAplicado

                }

                console.log("<<<<<<<<<<<<-------------------------------------------->>>>>>>>>>>>");
                alert("MATERIAL P: " + JSON.stringify(materialP));

                mat = { ...mat, ...materialP }
                alert("MAT: " + JSON.stringify(mat));
                console.log("<<<<<<<<<<<<-------------------------------------------->>>>>>>>>>>>");


                setSumaTotal(sumatotal + precioInicial);
                setDescuentoTotal(descuentoTotal + montoDescuentoAplic + montoDescuentoInicial);
                setSubTotal(subTotal + total);

                // Realizado para tomar en cuenta las fundas en la base imponible

                if (Constants.codigoFundas.filter((funda) => {
                    alert("Funda" + funda);
                    return funda === "0000000000" + mat.codigo
                })) {
                    setIvaTotal(ivaTotal + (Constants.iceFundas * cantidad * (parseFloat(mat.iva) / 100)));
                } else {
                    setIvaTotal(ivaTotal + (total * (parseFloat(mat.iva) / 100)));
                }


                setIceTotal(iceTotal + (parseFloat(mat.ice) * parseInt(mat.cantidad)));
                setCantItems(cantItems + parseInt(mat.cantidad));

            }
            return (mat);
        });

        setMaterialesLista(materialesUpdate);
    }

    const setListaBajarProducto = (tipoMaterial) => {

        if (!cantidadMaterial) {
            alert("Ingrese Cantidad");
            return cantidadMaterial;
        }

        var encontrar = false;

        //Itera a travez de la lista de materiales para ver si el material ya se ingresó

        encontrar = materialesLista.filter((addedMaterial) => {
            return (queriedMaterial.codigo === addedMaterial.codigo);
        });

        alert("Encontrar: " + encontrar);
        if (encontrar.length <= 0) {

            if (!descuentoMaterial === "") {
                if (descuentoAplicado > 0) {
                    queriedMaterial.descuentoAplicado = descuentoAplicado;
                    queriedMaterial.tieneDescuento = true;
                }
            } else {
                queriedMaterial.descuentoAplicado = "0.00";
                queriedMaterial.tieneDescuento = false;
            }

            if (queriedMaterial.codigo === "60009225" || queriedMaterial.codigo === "60009226" || queriedMaterial.codigo === "60009227") {
                queriedMaterial.descuentoAplicado = "100.00";
                queriedMaterial.tieneDescuento = true;
            }


            //DESCUENTOS POR PRODUCTO ESPEFICIFICO PARA PERFUMERIA MES DE MAYO
            if ((cashRegisterRedux.idAlmacen_LGORT === "R108" || cashRegisterRedux.idAlmacen_LGORT === "R110") && (queriedMaterial.grupoArticulo === "Z2000186" || queriedMaterial.grupoArticulo === "Z2000012")) {
                /*
                var date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
                String[] dateAux = date.split("-");
                Log.d("DATE", "DATE YEAR: " + dateAux[0] + " DATE MONTH: " + dateAux[1]);
                if (dateAux[0].equals("2022") && dateAux[1].equals("05")) {
                    material.setDescuentoAplicado("15.00");
                    material.setTieneDescuento(true);
                }
                */
            }
            console.log("MATERIAL: " + JSON.stringify(queriedMaterial));
            const newMaterialList = [...materialesLista, queriedMaterial];
            setMaterialesLista(newMaterialList);

            updateMaterialList(newMaterialList);
            setSelectedSeries([]);
            setQueriedMaterial({
                codigo: "",
                unidad: "",
                descripcion: "",
                numeroEuropeo: "",
                numeroFabricante: "",
                grupoArticulo: "",
                denominacionGrupoArticulo: "",
                sector: "",
                sujeto_a_Lote: "",
                perfilNumeroSerie: "",
                tipoMaterial: "",
                tipoMaterialFlag: "",
                precioNeto: "",
                precio: "",
                descuentoInicial: "",
                clasificacionFiscal: "",
                denominacionClasificacionFiscal: "",
                stockLibreUtilizacion: "",
                costo: "",
                centro: "",
                serie: "",
                lote: "",
                tipoPosicion: "",
                estado: "",
                descuentoAplicado: "",
                tieneDescuento: false
            });
            setCodigoMaterial("");
            setCantidadMaterial("0");
            setEnabledCantidad(false);
            setEnabledDescuentoAplicado(false);
        } else {
            alert("Material ya ingresado");
        }

        return cantidadMaterial;

    }

    const setLotesToSell = (materialLote) => {
        var seriales = 0.0;
        var cant = 0.00;
        materialLote.lote.map((lote) => {
            cant = cant + parseFloat(lote.cantidadEscogida)
        });
        alert("CANTIDAD MATERIAL: " + cantidadMaterial + " CANTIDAD LOTES: " + cant);
        //Si escogió igual número de series que las que pidió
        if (cant === parseFloat(cantidadMaterial)) {
            alert("CANTIDAD CORRECTA: " + JSON.stringify(materialLote));
            setListaBajarProducto(Constants.tipoMaterial.serie);

            if (materialEsVehiculo) {
                try {

                    var serieCarro = serieOptions[0].serie;
                    const respuestaCaractJSON = soapGetFeaturesMaterial(queriedMaterial.codigo, seriales[0].serieModal);
                    const respuestaCaract = JSON.stringify(respuestaCaractJSON);
                    if (respuestaCaract) {
                        const caracteristica = respuestaCaract[1].replace(";", " - ");
                        setObservacion(caracteristica);
                        setEnabledObservacion(false);
                        setToastMessage("SE OBTUVO LAS CARACTERÍSTICAS DEL VEHÍCULO");
                        setShowToast(true);
                    } else {
                        setToastMessage("NO SE OBTUVO LAS CARACTERÍSTICAS");
                        setShowToast(true);
                    }

                } catch (e) {
                    console.log("EXCEPTION OBTENIENDO CARACTERISTICA: " + e);
                }
            }
            setShowModalSerie(false);
        } else if (selectedSeries.length > cant) {

            alert("Series Escogidas Mayor Que La Cantidad");

        } else {

            alert("Series escogidas menor que la cantidad");

        }

    }

    const setSeriesToSell = () => {
        var seriales = 0.0;
        var cant = parseInt(cuantitySerie);

        //Si escogió igual número de series que las que pidió
        if (selectedSeries.length == cant) {

            setListaBajarProducto(Constants.tipoMaterial.serie);

            if (materialEsVehiculo) {
                try {

                    var serieCarro = serieOptions[0].serie;
                    const respuestaCaractJSON = soapGetFeaturesMaterial(queriedMaterial.codigo, seriales[0].serieModal);
                    const respuestaCaract = JSON.stringify(respuestaCaractJSON);
                    if (respuestaCaract) {
                        const caracteristica = respuestaCaract[1].replace(";", " - ");
                        setObservacion(caracteristica);
                        setEnabledObservacion(false);
                        setToastMessage("SE OBTUVO LAS CARACTERÍSTICAS DEL VEHÍCULO");
                        setShowToast(true);
                    } else {
                        setToastMessage("NO SE OBTUVO LAS CARACTERÍSTICAS");
                        setShowToast(true);
                    }

                } catch (e) {
                    console.log("EXCEPTION OBTENIENDO CARACTERISTICA: " + e);
                }
            }
            setShowModalSerie(false);
        } else if (selectedSeries.length > cant) {

            alert("Series Escogidas Mayor Que La Cantidad");

        } else {

            alert("Series escogidas menor que la cantidad");

        }

    }



    // CIERRA EL MODAL
    const handleCloseModalClientReg = () => setShowModalClientReg(false);
    const handleCloseModalEditCant = () => setShowModalEditCant(false);
    const handleCloseModalTypeCashSelector = () => setShowModalTypeCashSelector(false);
    const handleCloseModalSerie = () => setShowModalSerie(false);
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
                                                <Form.Check type="checkbox" label={item.nombre.toString()} checked={item.isChecked} disabled={!item.enable} onChange={() => onChangeSwitchPago(item.id)} />
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
                                <Form.Check type="checkbox" label="Cliente Coorporativo" onChange={() => onChangeClientCoorp()} />
                            </Col>
                        </Row>
                        <br />
                        <Row className="square border-bottom">
                            {isCheckedCredito ? (
                                <Col xs={2}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Opciones de crédito:</Form.Label>
                                        <Form.Select disabled={isCheckedFinalCustomer}>
                                            {selectPaymentConditionOptions.map((data) => {
                                                return (
                                                    <option key={data.CondiPagoDescripcion + data.CondiPagoCodigo} >{data.CondiPagoCodigo + ': ' + data.CondiPagoDescripcion}</option>
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
                                    <Form.Control type="text" placeholder="Ingrese identificación" id="identClient" name="identClient" onKeyDown={handleKeyDownClient} onChange={onChangeIdenClient} value={identificacion} disabled={!enableIdentificacion} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre del cliente" id="nameClient" name="nameClient" value={cliente ? cliente.nombre : ""} disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seleccionar vendedor:</Form.Label>
                                    <Form.Select disabled={!enabledVendedores}>
                                        {selectSellersOptions.map((data) => {
                                            return (
                                                <option key={data.nombre + data.codigo}>{data.nombre}</option>
                                            );
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row >
                            <Col xs={2}>
                                <Form.Group className="mb-3" id='formGroupNumbers'>
                                    <Form.Label>Código material:</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese código" id="codeMat" name="codeMat" value={codigoMaterial} onKeyDown={handleKeyDownMaterial} onChange={onChangeMaterialCode} disabled={!enabledCodigo} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción del material:</Form.Label>
                                    <Form.Control type="text" placeholder="Descripción" id="descriptionMat" name="descriptionMat" value={queriedMaterial ? queriedMaterial.descripcion : ""} disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Precio:</Form.Label>
                                    <Form.Control type="text" placeholder="0.00" id="priceMat" value={queriedMaterial ? queriedMaterial.precio : "0.00"} name="priceMat" disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dcto ini:</Form.Label>
                                    <Form.Control type="text" placeholder="0.00" id="discountMatIni" name="discountMatIni" value={queriedMaterial ? queriedMaterial.descuentoInicial : "0.00"} disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descuento:</Form.Label>
                                    <Form.Control type="text" placeholder="0.00" id="discountMat" name="discountMat" onChange={onChangeAppliedDiscount} disabled={!enabledDescuentoAplicado} />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cantidad:</Form.Label>
                                    <Form.Control type="text" placeholder="0" id="amountMat" name="amountMat" value={cantidadMaterial} onChange={onChangeMaterialCuantity} disabled={!enabledCantidad} />
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <ButtonIcon text={'Agregar'} type='button' onClick={agregarItemGrilla} variant='dark' style={{ marginTop: '20%' }} disabled={!enabledAddItemButton}>
                                    <BsFillCartPlusFill />
                                </ButtonIcon>
                            </Col>
                        </Row>
                        <Row className="square border-bottom" style={{ justifyContent: "end" }}>
                            <Col xs="auto">
                                <Form.Check type="checkbox" label="Automatizar agregado de items" onChange={() => onChangeAutoAdd()} />
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
                                        {materialesLista.map((materialList) => {

                                            return (materialList ?
                                                <tr key={materialList.codigo + 'tr'}>
                                                    <td key={materialList.codigo + 'cant'}>{materialList.cantidad}</td>
                                                    <td key={materialList.codigo + 'code'}>{materialList.codigo}</td>
                                                    <td key={materialList.codigo + 'des'}>{materialList.descripcion}</td>
                                                    <td key={materialList.codigo + 'punit'}>{materialList.precioUnitario}</td>
                                                    <td key={materialList.codigo + 'descIni'}>{materialList.descuentoInicial}</td>
                                                    <td key={materialList.codigo + 'subTotal'}>{materialList.precioNeto}</td>
                                                    <td key={materialList.codigo + 'descApplied'}>{materialList.descuentoAplicadoMonto}</td>
                                                    <td key={materialList.codigo + 'price'}>{materialList.precio}</td>
                                                    <td key={materialList.codigo + 'buttModi'}><Button onClick={handleEditMaterial}>Modificar</Button></td>
                                                </tr> : <></>)
                                        })}
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
            <ModalCreateClient show={showModalClientReg} ident={identificacion} onHide={handleCloseModalClientReg} onClose={handleCloseModalClientReg} />
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
            <Modal show={showModalSerie} onHide={handleCloseModalSerie}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Escoger Series a Vender código ' + serieModalCode}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>{'Seleccionar ' + cuantitySerie + ' items'}</Form.Label>
                    <Form.Group className="mb-3">
                        {serieOptions.map((serie) => {
                            return (

                                <Form.Check
                                    label={"Serie " + serie.serie + " Stock: " + serie.stock}
                                    name={serie.serie}
                                    type='radio'
                                    id={serie.serie + serie.stock}
                                    key={serie.serie + serie.stock}
                                    onClick={() => onChangeCheckSerie(serie)}
                                    onChange={() => { }}
                                    checked={serie.isChecked}
                                />

                            )
                        })}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalSerie}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={setSeriesToSell}>
                        Aceptar
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
            <ToastContainer className="p-3" position={'top-start'}>
                <Toast show={showToast} onClose={handleCloseToast} delay={3000} autohide>
                    <Toast.Header closeButton={false}>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Alerta</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body>{toastMesagge}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>);
}

export default FacturaItems;