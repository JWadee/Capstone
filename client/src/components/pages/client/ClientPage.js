import React, {useState, useEffect} from "react";
import {ListGroup, Col} from 'react-bootstrap'
import { Route, useRouteMatch } from "react-router-dom";


const ClientPage = (props) => {
    const [client, setClient] = useState(null);
    const [disp, setDisp] = useState(null);

    const match = useRouteMatch();

    console.log(match.params.ID)
    
    return (
        <div>
            <h2>Client Page: ID {match.params.ID}</h2>
        </div>
    );
};

export default ClientPage;