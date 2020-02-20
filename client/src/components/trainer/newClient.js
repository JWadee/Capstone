import React, {useState, useEffect} from "react";
import {Jumbotron, Form, Row, Col, Button} from 'react-bootstrap'

const NewClient = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState();
    const [exists, setExists] = useState(false);
    const [display, setDisplay] = useState();

    //change display when client exists changes
    useEffect(()=>{
        if(exists == false){
            setDisplay(
                <div>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}} >First Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setFirstName(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}}>Last Name</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setLastName(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={{span:3, offset:2}} >Email Address</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="email" onChange={e=> setEmail(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Phone Number</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setPhoneNumber(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <span className="Gender">
                            <label>
                                <input type="radio" value="1" checked={true} />Male
                            </label>
                        </span>
                        <span className="Gender">
                            <label>
                                <input type="radio" value="2" />Female
                            </label>
                        </span>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button onClick={()=> alert("Adding Client")} type="submit">Add Client</Button>
                    </Col>
                </Form.Group>
                </div>
            )
        }else{
            setDisplay(
                <div>
                <Form.Group as={Row}>
                    <Form.Label column sm={{span:3, offset:2}}>Username</Form.Label>
                    <Col sm={10} md={4} lg={3}>
                        <Form.Control type="text" onChange={e=> setUsername(e.target.value)}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button type="submit" onClick={() => alert("Searching for Client")} >Search</Button>
                    </Col>
                </Form.Group>
                </div>
            );
        }
    },[exists])
    return (
        <Jumbotron>
            <h2>Add a Client</h2><br />
            <hr></hr>
            <Form title="Add a Client"> 
                <Form.Check onClick={(e)=>setExists(e.target.checked)}
                    type="switch"
                    id="exists"
                    label="existing client"
                /><br/>
                {display}
            </Form>
            
        </Jumbotron>
    );
};

export default NewClient;