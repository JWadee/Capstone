import React from "react";
import {Row, Col, Button, Image} from "react-bootstrap"
import logo from "../../images/Logo.png"
//Component

const LandingPage = () => {
    return (
        <Row>
            <Col xs md={{span:6, offset:3}}>
                <Image src={logo} rounded />
                <Button href="/SignUp" variant="secondary" block>SIGN UP</Button>
                <Button href="/LogIn" variant="primary" block>LOG IN</Button>
            </Col>
        </Row>
    );
};

export default LandingPage;