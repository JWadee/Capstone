import React, {useState, useEffect} from "react";
import {ListGroup, div, Button, Col, Row} from "react-bootstrap";

const Confirmation = (props) => {
    const [mainDisp, setMainDisp] = useState()
    const [raceDisp, setRaceDisp] = useState();
    const [genderDisp, setGenderDisp] = useState();
    const [bodyDisp, setBodyDisp] = useState();
    const [typeDisp, setTypeDisp] = useState();

    const values = props.values;

    const submit = () => {
        const data =  {
            firstname: values.firstName,
            lastname: values.lastName,
            email: values.email,
            weight: values.weight,
            height: values.height,
            raceID: values.raceID, 
            genderID: values.genderID,
            bodyTypeID: values.bodyTypeID,
            accountTypeID: values.accountTypeID,
            pass: values.pass
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
            .catch(error=>{
                console.log(error)
                setMainDisp(
                    <div>
                        <h4>There was an error on our end. Please try again.</h4>
                    </div>
                )
                return;
            }).then(()=> {
                    setMainDisp(
                    <div>
                        <h4>Account created successfully</h4>
                            <Row>  
                                <Col xs md={{span:2, offset:5}}>
                                    <Button href="/LogIn" variant="primary" block>LOG IN</Button>
                                </Col>
                        </Row>
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
            <div>
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
                        <Button onClick={()=> submit()}>Confirm</Button>
                    </Col>
                </Row>
            </div>)
        }, [typeDisp, bodyDisp, raceDisp, genderDisp])

    return (
        <div>
            {mainDisp}
        </div>
    );
};

export default Confirmation