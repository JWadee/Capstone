import React, {useState, useEffect} from "react";
import {Table, Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux';
import history from '../../../utils/history';

const TrainerClients = (props) => {
    const [clients, setClients] = useState([]);
    // const match = useRouteMatch();
    const match = props.match;

    useEffect(()=>{
        const get_clients = async() => {
            const response = await fetch('/trainerClients/byTrainer?ID='+props.ID)   
                .catch(err => console.log(err))
            const data = await response.json();
            setClients(data);
        }

        get_clients();
    },[])
    
    const goToClient = (clientid) => {
        //Push to workout component
        history.push('/trainer/my-clients/client/'+clientid);
    }

    return (
        <div className="component">
            <Row>
                <Col sm={{span: 6, offset: 3}}>
                    <div className="tableWrapper">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th><h3>My Clients</h3></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client)=>{ return (
                                    <tr onClick={()=>goToClient(client.intAccountID)} key={client.intAccountID}>
                                        <td>
                                            {client.strFirstName +" "+client.strLastName}
                                        </td>
                                    </tr>         
                                )})}
                            </tbody>
                        </Table>
                    </div>
                </Col> 
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}


export default  connect(mapStateToProps)(TrainerClients);