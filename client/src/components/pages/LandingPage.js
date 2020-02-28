import React, {useState, useEffect} from "react";
import {Row, Col, Button} from "react-bootstrap"
//Component

const LandingPage = () => {
    return (
        <Row>
            <Col xs md={{span:2, offset:5}}>
                <h1>Fitness Tracker</h1>
                <Button href="/SignUp" variant="secondary" block>SIGN UP</Button>
                <Button href="/LogIn" variant="primary" block>LOG IN</Button>
            </Col>
        </Row>
    );
};

export default LandingPage;