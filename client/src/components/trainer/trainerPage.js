import React, {useState, useEffect} from "react";
import TrainerClients from './trainerClients'
import NewClient from "./newClient";
import Schedule from "../schedule";

const TrainerPage = () => {
    const [display, setDisplay] = useState(null);
    

    return (
        <div>
            <h1>Trainer Home Page</h1>

            <h2>Clients</h2>
            <button onClick={() =>setDisplay(<TrainerClients />)}>View Clients</button>
            <button onClick={() =>setDisplay(<NewClient />)}>Add a Client</button>

            <h2>Training</h2>
            <button>My Programs</button>
            <button>Create a Program</button>

            <h2>Schedule</h2>
            <button onClick={() =>setDisplay(<Schedule />)}>My Schedule</button>
            
            {display}
        </div>
    );
};

export default TrainerPage;