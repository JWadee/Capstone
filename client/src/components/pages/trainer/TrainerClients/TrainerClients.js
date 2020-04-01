import React, {useState, useEffect} from "react";
import {ListGroup, Jumbotron, Nav, Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux';
import { Route, useRouteMatch } from "react-router-dom";

//Components 
import TrainerClient from './TrainerClient';

const TrainerClients = (props) => {
    const [clients, setClients] = useState([]);
    const match = useRouteMatch();

    useEffect(()=>{
        const get_clients = async() => {
            const response = await fetch('/trainerClients/byTrainer?ID='+props.ID)   
                .catch(err => console.log(err))
            const data = await response.json();
            setClients(data);
        }

        get_clients();
    },[])   
    
    
    return (
        <div>
        <Jumbotron>
            <h2>My Clients</h2><br />
            <hr />
            <ListGroup as={Row}>
                {clients.map(client =>{
                    return(
                        <TrainerClient ID={client.intClientID} key={client.intClientID}/>
                    ) 
                })}

            </ListGroup>
        </Jumbotron>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}


export default  connect(mapStateToProps)(TrainerClients);