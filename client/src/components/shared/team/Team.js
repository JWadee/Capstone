import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import { Row, Col, Button, Table } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
import history from '../../../utils/history';

const Team = () => {
    const [team, setTeam] = useState(null);
    const [members, setMembers] = useState([]);
    const [trainers, setTrainers] = useState([]);

    const match = useRouteMatch();

    //Run on initial render, fetch workout exercises
    useEffect(()=>{
        const fetch_team = async () => {
            const response = await fetch('/teams/byID?ID='+match.params.ID);
            const data = await response.json();
            setTeam(data)
        }

        const fetch_trainers = async () => {
            const response = await fetch('/teamTrainers/byTeam?teamid='+match.params.ID);
            const data = await response.json();
            setTrainers(data);
        }

        const fetch_members = async () => {
            const response = await fetch('/teamMembers/byTeam?teamid='+match.params.ID);
            const data = await response.json();
            setMembers(data);
        }

        fetch_team();
        fetch_trainers();
        fetch_members();

    },[])


    const addTrainer = () => {
        history.push('/trainer/my-teams/team/1/add-trainer')
    }

    const addMember = () => {
        history.push('/trainer/my-teams/team/1/add-member')
    }

    return (
        <div>
            {
                team != null ? <h2>{team[0].strTeamName}</h2> : <></>
            }
            <br />
            <Row>
                <Col md={{span: 3, offset:1}}>
                    <Table bordered hover >
                        <thead>
                            <tr>
                                <th>
                                    <h3>Trainers </h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainers.map((trainer)=>{ return (
                                <tr key={trainer.intTeamTrainerID}>
                                    <td>
                                        {trainer.strFirstName + " " + trainer.strLastName}
                                    </td>
                                </tr>         
                            )})}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <Button onClick={()=>addTrainer()} as={Col} sm={{span:3}}>add <IoIosAddCircleOutline /></Button>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>   
                    
                </Col>
                <Col md={{span: 3}}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <h3>Members</h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member)=>{ return (
                                <tr key={member.intTeamMemberID}>
                                    <td>
                                        {member.strFirstName + " " + member.strLastName}
                                    </td>
                                </tr>         
                            )})}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <Button onClick={()=>addMember()} as={Col} sm={{span:3}}>add <IoIosAddCircleOutline /></Button>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>   
                </Col>
            </Row> 
            <Row>
                <Col >
                </Col>
            </Row>        
        </div>
    )

}

export default Team