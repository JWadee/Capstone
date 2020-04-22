import React from 'react'
import {Row, Col} from 'react-bootstrap'


const About = () => {

    return (
        <div as={Row}>
            <Col md={{span: 6, offset:3}} >
                <h2>About</h2>
                <p>
                    Trace is an application designed to assist Physical Trainers in meeting and succeeding Client needs. 
                    Scheduling, Fitness Logging, and Analysis all in one place. 
                </p>
            </Col>
        </div>
    )

}

export default About