import React from 'react';
import Container from "react-bootstrap/Container";
import {Card, Col, Row, Table} from "react-bootstrap";
import {BusFront} from "react-bootstrap-icons";

function Services() {
    return (
        <>
        <Container>
            <Row className="text-center my-3"><h1 className="title-border">OUR SERVICES</h1></Row>
            <Row className='bg-light rounded my-3 py-3'>
                <Col xs={1} className="px-1 py-2 text-center"><BusFront size={32} /></Col>
                <Col xs={11}>
                    <h3>BUS SERVICE DEDICATED FOR SCHOOL CHILDREN</h3>
                    <p>Launched in 2005, Sisu Sariya is a centralized, reliable and concessionary bus service combining the services of SLTB depots and registered private bus service providers. There are at present 778 buses in service.</p>
                    <p>Commencing as a joint effort among the Ministry of Education, Ministry of Transport, Sri Lanka Police, Sri Lanka Transport Board and the National Transport Commission, the aim of this project is to provide special school buses exclusively for uniformed school children and teachers to enable them to attend schools safely, economically and without physical or mental harassment on travel to and from school.
                    </p>
                    <h3>THE SERVICE</h3>
                    <p>Strict safety measures are followed in maintenance and operation of the buses. With punctuality in mind, the service provides timely travel to school and back. The bus will arrive at the school 15 minutes before start of school and arrive at school before closing of school to pickup students. Education is a child’s right. By making available low-cost transport, the Sisu Sariya Bus Service offers concessionary charges, encouraging parents to send their children to school, by providing families with economic relief.</p>
                    <p>The Charges for the service will be as following:</p>
                    <Table borderless>
                        <thead>
                        <tr>
                            <th className="bg-light">Age</th>
                            <th className="bg-light">Rate</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="bg-light">Over 12 years</td>
                            <td className="bg-light">50% of adult bus fare</td>
                        </tr>
                        <tr>
                            <td className="bg-light">Under 12 years</td>
                            <td className="bg-light">25% of adult bus fare</td>
                        </tr>
                        </tbody>
                    </Table>
                    <h3>SERVICE MONITORING</h3>
                    <p>The National Transport Commission considers safety and reliability to be important. Hence strict monitoring of the service is carried out on a continuous basis to check that high standards in quality of service is maintained. For this purpose, for each bus, a free ticket will be issued for a named teacher/senior student, who will monitor services provided. A seven member committee from each school, comprising of the school Principle/Deputy Principle, Teacher, Supervising teachers, Two (2) senior teachers and Two (2) parents of school development committee, will monitor the service and attend to the needs arising for the specific service buses allocated to the school. Payments are made only if busses pass a reliability of at least 90%. The Government has allocated a sum of Rs.240 mn for this project as of January 2011.</p>
                </Col>
            </Row>
            <Row className='bg-light rounded my-3 py-3'>
                <Col xs={1} className="px-1 py-2 text-center"><BusFront size={32} /></Col>
                <Col xs={11}>
                    <h3>GEMI SERIYA</h3>
                    <p>Gami Seriya rural bus service project implemented in 2005 with a view to improve accessibility of people who living in rural areas in order to fulfill their day today needs. This project provides reliable and economical passenger transport service to the public who are affected by lack of transport facilities.</p>
                    <p>This project identifies the actual uneconomical routes through a formal procedure, and disburses funds among the service providers of such routes who really provide socially necessary services during uneconomic times of the day, considering their actual operating losses on uneconomic routes.</p>
                    <p>Did you know that 80 percent of Sri Lankan’s live in villages? And that it is a national responsibility to provide opportunity to those in these communities to travel to towns conveniently more often, and be able to contribute to the country’s economy, constructively? Having recognized the importance of National Transport in providing such opportunities, and its duty to all such communities, Gami Sariya, an initiative of the NTC together with the services of SLTB was started in 2008.Gami Sariya hopes to link all those from these communities, with towns by providing concessionary, comfortable and efficient transport services along the routes considered economically unattractive.</p>
                    <h3>BENEFITS OF THIS PROGRAMME</h3>
                    <ul>
                        <li>Reduction of time and costs of travelling</li>
                        <li>Ability to transport produce and goods</li>
                        <li>Comfortable travel for education, health and social needs</li>
                        <li>Development of roads</li>
                    </ul>
                    <h3>SERVICE MONITORING</h3>
                    <p>For the purpose of monitoring service quality the following is carried out:</p>
                    <ul>
                        <li>Timely collection of travel logs of SLTB depots and related statistics</li>
                        <li>Collaboration with committees composed of passengers of the service</li>
                        <li>Examination of services by the staff of National Transport Commission</li>
                    </ul>
                    <p>Village Transport Committee will be composed of 5-7 members composed of the following</p>
                    <ul>
                        <li>Representation of a Religious location by a Religious Leader</li>
                        <li>Family health service personnel/ Samurdi Development Officers/ Grama Niladari</li>
                        <li>Village leader (eg: a retired Government personnel)</li>
                        <li>Representative of a social organization such as Village Youth Society /Sports Society/ Welfare Society</li>
                        <li>Elderly Individual who uses Bus service on a continuous basis</li>
                    </ul>
                </Col>
            </Row>
            <Row className='bg-light rounded my-3 py-3'>
                <Col xs={1} className="px-1 py-2 text-center"><BusFront size={32} /></Col>
                <Col xs={11}>
                    <h3>NISI SARIYA</h3>
                    <p>Encouraging provision of reliable and regular public bus service during late night is envisaged under the “Nisi Sariya”. The National Transport Commission has been assisting 56 identified late night services leaving city centers by reimbursing 50% of the fuel cost of the journey. Under this programme, the operator has to operate at least 90% of the journey of particular month for this entitlement. Under the 2nd phase of the project, sixteen (16) services have been identified and assigned to the SLTB. Presently 58 SLTB Services (Western , Southern and Uva)</p>
                    <h3>TARGET</h3>
                    <p>100 “Nisi Sariya” night services are being planned together with SLTB and private operators in Colombo and its suburbs.</p>
                    <h3>SERVICE MONITORING</h3>
                    <p>In ensuring that a service of high standards is provided to you, our valued passengers, especially during night time, NTC mobile inspectors periodically monitor the bus routes to ensure that time tables and standards are met.</p>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Services;
