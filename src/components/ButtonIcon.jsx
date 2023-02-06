import { Button, Row } from 'react-bootstrap';

const ButtonIcon = (props) => {
    const styles={width: '80px', fontSize: '12px'};
    return (
        <Button className={props.className} style={{...styles,...props.style}} onClick={props.onClick} variant={props.variant} type={props.type} disabled={props.disabled}>
            <Row style={{ fontSize: '20px' }} >{props.children}</Row>
            {props.text}
        </Button>
    );
}

export default ButtonIcon;