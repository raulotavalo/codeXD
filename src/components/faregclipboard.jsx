import { Button, Row } from 'react-bootstrap';
import { FaRegClipboard } from 'react-icons/fa';

const faregclipboard = (props) => {
    const styles={width: '80px', fontSize: '12px'};
    return (
        <div style={{...props.style, ...styles}} variant={props.variant} type={props.type}>
            <FaRegClipboard/>
        </div>
    );
}

export default faregclipboard;