import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import tipoIdentRegisterClient from '../../data/facturacion/TipoIdentRegClient.js';
import soapSetClient from "../../soap/soapSetClient.js";
import { useSelector } from "react-redux";
import { cashRegister, getCashRegister } from '../../redux/reducer/cashRegisterSlice';
import { useEffect } from "react";

const ModalCreateClient = (props) => {

    const cashRegisterRedux = useSelector(getCashRegister);


    const [typeOfId, setTypeOfId] = useState("");
    const [identification, setIdentification] = useState(props.ident);
    const [nameClient, setNameClient] = useState("");
    const [addressClient, setAddressClient] = useState("");
    const [phoneClient, setPhoneClient] = useState("");
    const [emailClient, setEmailClient] = useState("");
    const [district, setDistrict] = useState("");
    const [civilState, setCivilState] = useState("");
    const [clientGroup, setClientGroup] = useState("01");
    const [acountGroup, setAcountGroup] = useState("DRET");
    const [gender, setGender] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [town, setTown] = useState("");
    const [secondName, setSecondName] = useState("");
    const [region, setRegion] = useState("");
    const [secondStreet, setSecondStreet] = useState("");
    const [secondPhone, setSecondPhone] = useState("");
    const [treatment, setTreatment] = useState("");
    const [employGroup, setEmployGroup] = useState("");

    const registerClient = () => {

        var taxpayer="PN";
      
        if (typeOfId.codigo === "01" && identification.length === 13) {
            taxpayer="PJ";
        } 
        soapSetClient(
            district, emailClient, civilState, taxpayer, clientGroup,
            acountGroup, gender, contactPerson, town, secondName,
            nameClient, region, identification, typeOfId.codigo, addressClient,
            secondStreet, phoneClient, secondPhone, treatment, employGroup,
            cashRegisterRedux.selectedCashRegister.idOficinaVenta_VKBUR, cashRegisterRedux.selectedCashRegister.idCaja);
    }
    
    const onChangeIdentification = (event) => {
        setIdentification(event.target.value);
    }

    const onChangeTypeOfId = (event)=>{
        setTypeOfId(JSON.parse(event.target.value));
        
    }

    const onChangeClientName = (event)=>{
        setNameClient(event.target.value);
    }

    
    const onChangeClientAddress = (event)=>{
        setAddressClient(event.target.value);
    }

    
    const onChangeClientPhone = (event)=>{
        setPhoneClient(event.target.value);
    }

    
    const onChangeclientEmail = (event)=>{
        setEmailClient(event.target.value);
    }


    return (<Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Registrar cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3">
                <Form.Label>Identificación:</Form.Label>
                <Form.Select onChange={onChangeTypeOfId}>
                    {tipoIdentRegisterClient.map((data) => {
                        return (
                            <option key={data.id} value={JSON.stringify(data)} >{data.nombre}</option>
                        );
                    })}
                </Form.Select>
                <br />
                <Form.Control type="text" placeholder="Ingrese la identificación" id="identification" name="identification" onChange={onChangeIdentification} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el nombre completo" id="clientName" name="clientName" onChange={onChangeClientName} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Dirección:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la dirección" id="clientAddress" name="clientAddress" onChange={onChangeClientAddress} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Teléfono:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el teléfono" id="clientPhone" name="clientPhone" onChange = {onChangeClientPhone}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el email" id="clientEmail" name="clientEmail" onChange={onChangeclientEmail}/>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onClose}>
                Cancelar
            </Button>
            <Button variant="primary" onClick={registerClient}>
                Registrar
            </Button>
        </Modal.Footer>
    </Modal>
    );
}

export default ModalCreateClient;