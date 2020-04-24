import React, {useEffect, useState} from 'react'
import {Form, Row, Col, Button, Alert} from 'react-bootstrap'
import { connect } from 'react-redux';
import { useRouteMatch } from "react-router-dom";
import history from '../../../utils/history';

const AddClientNote = () => {
    const [note, setNote] = useState('');
    const [errorMessage, setErrorMessage] = useState();
    const match = useRouteMatch();

    const submit = (e) => {
        e.preventDefault();

        if(note.length < 1){
            setErrorMessage(<Alert variant="danger">Note cannot be empty</Alert>)
        }else{
            setErrorMessage();

            const body = {
                trainerclientID : match.params.TCID,
                note: note
            }
            const url = '/trainerClients/notes/add'
            const options = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }

            fetch(url, options)
                .then(()=>{
                    //Push back to Routine component
                    history.push("/trainer/my-clients/client/"+match.params.ID);
                })
                .catch((err)=> console.log(err));
        }

    }

    return (
        <div class="component">
            <h3>Add a Note</h3>
            <Form>
                <Form.Group as={Col} md={{span:6, offset:3}}>
                    <Form.Control as="textarea" rows="3" value={note} onChange={(e)=> setNote(e.target.value)}/> 
                    {errorMessage}
                </Form.Group>
                <Form.Group>
                    <Col sm={{ span: 6, offset: 3  }}>
                        <Button type="submit" onClick={(e) => submit(e)}>Submit</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        ID: state.account.ID
    }
}

export default  connect(mapStateToProps)(AddClientNote);
