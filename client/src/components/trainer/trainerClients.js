import React, {useState, useEffect} from "react";
import {ListGroup, Jumbotron, Nav, Row, Col} from 'react-bootstrap'
const TrainerClients = () => {
    const [view, setView] = useState("existing");
    const [display, setDisplay] = useState()
    
    //Run when view is set, display existing or pending clients
    useEffect(()=>{
        if(view==="existing"){
            setDisplay(
                    <ListGroup as={Row}>
                        <Col sm={{span:4, offset:4}}>
                            <ListGroup.Item action onClick={()=>alert("You clicked Justin")}>Justin Wade</ListGroup.Item>
                        </Col>
                        <Col sm={{span:4, offset:4}}>
                            <ListGroup.Item action onClick={()=>alert("You clicked Jesse")}>Jesse Covey</ListGroup.Item>
                        </Col>
                        <Col sm={{span:4, offset:4}}>
                            <ListGroup.Item action onClick={()=>alert("You clicked Mayra")}>Mayra Aguirre</ListGroup.Item>
                        </Col>
                        <Col sm={{span:4, offset:4}}>
                            <ListGroup.Item action onClick={()=>alert("You clicked Micharl")}>Michael Mains</ListGroup.Item>
                        </Col>
                    </ListGroup>
            
            )
        }else{
            setDisplay(
                <ListGroup as={Row}>
                    <Col sm={{span:4, offset:4}}>
                        <ListGroup.Item action onClick={()=>alert("You clicked Bob")}>Bob Nields</ListGroup.Item>
                    </Col>
                </ListGroup>
            )
        }
    }, [view])   
    
    
    return (
        <Jumbotron>
                <h2>My Clients</h2><br />
                <hr />
                <Nav variant="pills" defaultActiveKey="My Clients" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey="My Clients" onClick={()=>setView("existing")}>Existing</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="Pending" onClick={()=>setView("pending")}>Pending</Nav.Link>
                    </Nav.Item>
                </Nav>
                <br/>
            {display}
        </Jumbotron>
    );
};

export default TrainerClients;