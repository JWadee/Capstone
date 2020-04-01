import React, {useState, useEffect} from "react";
import {ListGroup, Col} from 'react-bootstrap'
import { useRouteMatch } from "react-router-dom";

const TrainerClient = (props) => {
    const [client, setClient] = useState(null);
    const [disp, setDisp] = useState(null);
    const match = useRouteMatch();

    useEffect(()=>{
        const get_account = async() => {
            const response = await fetch('/accounts/byID?ID='+props.ID)   
                .catch(err => console.log(err))
            const data = await response.json();
            setClient(data);
        }

        get_account();
    },[])  
    
    useEffect(()=>{
        if(client != null){
            setDisp(
                    <ListGroup.Item action href={match.url+"/client/ID="+client[0].intAccountID}>{client[0].strFirstName +" "+client[0].strLastName}</ListGroup.Item>
            )
        }
    }, [client])
    
    
    return (
        <div>
            <Col sm={{span:4, offset:4}}>
                {disp}            
            </Col>
        </div>
    );
};

export default TrainerClient;