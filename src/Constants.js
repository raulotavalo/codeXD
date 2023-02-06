import { 
        FaHammer, FaTimes, FaJoomla, FaConfluence, FaStripeS, 
        FaFileAlt, FaReceipt, FaRedoAlt, FaMoneyBillWave, FaBook, 
        FaArrowRight, FaClipboardList, FaBars, FaHome, FaLock, FaMoneyBill, 
        FaUser, FaRegClipboard, FaSuitcase, FaPoll, FaFunnelDollar, FaDonate } from "react-icons/fa";
import { BiAnalyse, BiSearch, BiPrinter, BiLabel } from "react-icons/bi";
import { TbFingerprintOff} from "react-icons/tb";
import { SiYamahamotorcorporation} from "react-icons/si";
import { MdMessage } from "react-icons/md";
import { ImLocation} from "react-icons/im";

const production = false;
const wsdlDBUG = 'http://172.20.0.58/WS_POS_web/wsPOSweb.asmx?WSDL';
const wsdlPRD = 'http://www.eljuric.com/Ws_Table_FactPRD/v3/Ws_Table_Fac.asmx?wsdl'

const tipoMaterial =
{
    combo: 'C',
    lote: 'L',
    serie: 'S',
    ni_lote_ni_serie: 'N',

}
const iconesDictionary =
{
    BiLabel: <BiLabel />,
    BiPrinter: <BiPrinter />,
    BiSearch: <BiSearch />,
    FaArrowRight: <FaArrowRight />,
    FaBook: <FaBook />,
    FaRedoAlt: <FaRedoAlt/>,
    FaClipboardList: <FaClipboardList />,
    FaConfluence: <FaConfluence />,
    FaDonate: <FaDonate />,
    FaFileAlt: <FaFileAlt />,
    FaFunnelDollar: <FaFunnelDollar />,
    FaHammer: <FaHammer />,
    Fahome: <FaHome />,
    FaJoomla: <FaJoomla />,
    FaMoneyBillWave: <FaMoneyBillWave />,
    FaPoll: <FaPoll />,
    FaReceipt: <FaReceipt />,
    FaRegClipboard: <FaRegClipboard />,
    FaStripeS: <FaStripeS />,
    FaSuitcase: <FaSuitcase />,
    FaTimes: <FaTimes />,
    FaUser: <FaUser />,
    ImLocation: <ImLocation />,
    SiYamahamotorcorporation: <SiYamahamotorcorporation />,
    TbFingerprintOff: <TbFingerprintOff />,
}

export default {
    wsdl: production ? wsdlPRD : wsdlDBUG,
    icones: iconesDictionary,
    isProduction: production,
    iceFundas:0.08,
    codigoFundas: ["000000000060009225","000000000060009226","000000000060009227"],
    tipoMaterial: tipoMaterial
    //wsdl: 'http://localhost/WS_Restaurant/wsTurquesa.asmx?WSDL'
};
