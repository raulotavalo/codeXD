import { Button, Row } from 'react-bootstrap';

const ButtonIcon = (props) => {
    const styles={width: '80px', fontSize: '12px'};
    return (
        <Button style={{...props.style, ...styles}} variant={props.variant} type="submit">
            <Row style={{ fontSize: '20px' }} >{props.children}</Row>
            {props.text}
        </Button>
    );
}

export default ButtonIcon;