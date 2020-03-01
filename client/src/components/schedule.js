import React from "react";
import {Jumbotron, ListGroup, Row, Col} from 'react-bootstrap'
const Schedule = () => {

    return (
        <Jumbotron fluid>
            <h2>My Schedule</h2><br />
            <hr />

            <ListGroup as={Row}>
               <Col sm={{span:4, offset:4}}>
                    <ListGroup.Item action onClick={()=>alert("You clicked 10/24 @ 1:30pm")}>
                        <div>
                            <p>Tuesday, 10/24</p>
                        </div>
                        <div>
                            <p>1:30-2:15pm</p>
                        </div>
                        <div>
                            <p>Michael Mains</p>
                        </div>
                    </ListGroup.Item>
                </Col>
                <Col sm={{span:4, offset:4}}>
                    <ListGroup.Item action onClick={()=>alert("You clicked 10/27 @ 2:30pm")}>
                        <div>
                            <p>Date: Friday, 10/27</p>
                        </div>
                        <div>
                            <p>Time: 2:30-3:30pm</p>
                        </div>
                        <div>
                            <p>Justin Wade</p>
                        </div>
                    </ListGroup.Item>
                </Col>
            </ListGroup>

            
        </Jumbotron>
    );
};

export default Schedule;