import React, {useState, useEffect} from "react";
import {Button, Row, Col, Card, Jumbotron} from 'react-bootstrap'
import { Route, useRouteMatch } from "react-router-dom";


const ClientPage = (props) => {
    const [client, setClient] = useState(null);
    const [clientDisp, setClientDisp] = useState();

    const [disp, setDisp] = useState(null);

    const match = useRouteMatch();

    useEffect(()=>{
        const fetch_client = async () =>{
            const response = await fetch('/accounts/byID?ID='+match.params.ID);
            const data = await response.json();
            setClient(data);
        }

        fetch_client();
    },[])

    useEffect(()=>{
        if(client != null){
            setClientDisp(
                <Jumbotron>
                    <Row>
                        <Card sm={{span:4}} as={Col}>
                            <Card.Header>
                                <Card.Title>CLIENT INFORMATION</Card.Title>
                            </Card.Header>
                            <Card.Body> 
                                <Card.Text>
                                    Name: {client[0].strFirstName+" "+client[0].strLastName}
                                </Card.Text>
                                <Card.Text>
                                    Height: {client[0].decHeight} inches
                                </Card.Text>
                                <Card.Text>
                                    Weight: {client[0].decWeight} lbs
                                </Card.Text>
                                <Card.Text>
                                    Gender: {client[0].decWeight} 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card sm={{span:4}} as={Col}>
                            <Card.Header>
                                <Card.Title>Notes</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Name: {client[0].strFirstName+" "+client[0].strLastName}
                                </Card.Text>
                                <Card.Text>
                                    Height: {client[0].decHeight} inches
                                </Card.Text>
                                <Card.Text>
                                    Weight: {client[0].decWeight} lbs
                                </Card.Text>
                                <Card.Text>
                                    Gender: {client[0].decWeight} 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Col sm={{span:4}}>
                            <Button href={'/trainer/my-clients/client/'+match.params.ID+'/exercise-history'}>Exercise History</Button>
                        </Col>
                    </Row>
                </Jumbotron>
            )
        }
    },[client])
    
    return (
        <Jumbotron>
            {clientDisp}
        </Jumbotron>
    );
};

export default ClientPage;