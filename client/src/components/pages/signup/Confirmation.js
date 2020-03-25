import React, {useState, useEffect} from "react";
import {ListGroup, Jumbotron, Button, Col, Row} from "react-bootstrap";

const Confirmation = (props) => {
    const [mainDisp, setMainDisp] = useState()
    const [raceDisp, setRaceDisp] = useState();
    const [genderDisp, setGenderDisp] = useState();
    const [bodyDisp, setBodyDisp] = useState();
    const [typeDisp, setTypeDisp] = useState();

    const values = props.values;

    const submit = (e) => {
        e.preventDefault();

        const data =  {
            firstname: values.firstName,
            lastname: values.lastName,
            email: values.email,
            weight: values.weight,
            height: values.height,
            raceID: values.raceID, 
            genderID: values.genderID,
            bodyTypeID: values.bodyTypeID,
            accountTypeID: values.accountTypeID
        }

        //api parameters to create game
        const url ='/accounts/create'
        const options = {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json;charset=UTF-8'
                    }, 
                    body: JSON.stringify(data)
        }

        //call api
        fetch(url, options)
            .then(response=> {
                setMainDisp(
                    <div>
                        <h4>Account created successfully</h4>
                    </div>
                )
                return response.json();
            }).catch(error=>{
                console.log(error)
                setMainDisp(
                    <div>
                        <h4>There was an error on our end. Please try again.</h4>
                    </div>
                )
            })
    }

    const back  = (e) => {
        e.preventDefault();
        props.prevStep();
    }

    //Run on initial render
    useEffect(()=>{
        values.accountTypes.find(function(item, i){
            if(item.intAccountTypeID == values.accountTypeID){
                setTypeDisp(<ListGroup.Item>Account Type: {item.strAccountType}</ListGroup.Item>)
                return ;
            }
        });
        values.bodyTypes.find(function(item, i){
            if(item.intBodyTypeID == values.bodyTypeID){
                setBodyDisp(<ListGroup.Item>Body Type: {item.strBodyType}</ListGroup.Item>)
                return;
            }
        });
        values.races.find(function(item, i){
            if(item.intRaceID == values.raceID){
                setRaceDisp(<ListGroup.Item>Race: {item.strRace}</ListGroup.Item>)
                return;
            }
        });
        values.genders.find(function(item, i){
            if(item.intGenderID == values.genderID){
                setGenderDisp(<ListGroup.Item>Gender: {item.strGender}</ListGroup.Item>)
                return;
            }
        });


    },[props])
    
    useEffect(()=>{
        setMainDisp(
            <Jumbotron>
                <h2>Confirmation</h2><br />
                <hr></hr>
                <ListGroup>
                    {typeDisp}
                    <ListGroup.Item>First Name: {values.firstName}</ListGroup.Item>
                    <ListGroup.Item>Last Name: {values.lastName}</ListGroup.Item>
                    <ListGroup.Item>Email: {values.email}</ListGroup.Item>
                    <ListGroup.Item>Height: {values.feet}ft {values.inches}in</ListGroup.Item>
                    <ListGroup.Item>Weight: {values.weight}lbs</ListGroup.Item>
                    {bodyDisp}
                    {raceDisp}
                    {genderDisp}
                </ListGroup>
                <Row>
                    <Col sm={{ span: 3, offset: 3  }}>
                        <Button onClick={(e)=> back(e)}>Back</Button>
                    </Col>
                    <Col sm={{ span: 3 }}>
                        <Button onClick={(e)=> submit(e)}>Confirm</Button>
                    </Col>
                </Row>
            </Jumbotron>)
        }, [typeDisp, bodyDisp, raceDisp, genderDisp])

    return (
        <div>
            {mainDisp}
        </div>
    );
};

export default Confirmation