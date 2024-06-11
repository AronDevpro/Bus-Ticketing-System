import React from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row, Table, Image} from "react-bootstrap";

function About(props) {
    return (
        <>
            <Container>
                <Col className="d-flex justify-content-center align-content-center my-3">
                <h2 className="title-border">OVERVIEW</h2>
                </Col>
                <p className="mb-3">
                    The SLTB is an Institution that makes a great contribution to the State sector through the provision of passenger transport services in Sri Lanka and plays a leading role among the State Institutions serving the public on all days of the year.
                </p>
                <Table responsive bordered striped>
                    <thead>
                    <tr>
                        <th>Name & Designation</th>
                        <th>Tel. No.</th>
                        <th>Fax No.</th>
                        <th>E-mail</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Mr.S.M.D.L.K.D. Alwis (Chairman)</td>
                        <td>+94 117 706 010</td>
                        <td>+94 112 589 683</td>
                        <td>chairman@sltb.lk</td>
                    </tr>
                    <tr>
                        <td>Mr.Mahesh Kulathilaka (Chief Executive Officer)</td>
                        <td>+94 117 706 022</td>
                        <td>+94 112 586 491</td>
                        <td>ceo@sltb.lk</td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
            <Container>
                <Col className="d-flex justify-content-center align-content-center mb-3">
                    <h2 className="title-border">HISTORY</h2>
                </Col>
                <Row md={2} xs={1} className="mb-3">
                <Col>
                    <Image src="src/assets/history-1.jpg" rounded width="100%"></Image>
                </Col>
                <Col>
                    <p>Sri Lanka's passenger bus service started in 1907 by running a private bus from Chilaw to ColomboFrom that time until 1958, passenger traffic took place in private bus companies.By the passing of the Transport Board Ordinance No 48 of 1957, the first Prime Minister of Sri Lanka, Hon. Minister of Transport Maithripala Senanayake presided over the launch of the Sri Lanka Transport Board (SLTB) bus.

                        The first Chairman of the Sri Lanka Transport Board was Mr. V.A.H.de Mel.

                        Private monopoly was broken ever since the government began serving passenger transit state acquiring the position.Remote rural areas to provide transport services, school students closer to the public through its service to receive information, such as opportunities to travel at concessionary rates.When reaching the milestone of 19 inch that was in 1977, the CTB golden era.Then the Chairman did Anil Munasinghe.Appalled CTB its national mission was extended in various sectors.
                    </p>
                </Col>
            </Row>
                <Row md={2} xs={1} className="mb-3">
                    <Col>
                        <p>
                            That Werahera Central Site Construction Ginthota, Udubaddawa Keppetipola, Kurunegala, Galle, Kandy, solo Regional Site Construction Moratuwa bus maintenance center started, bungalows construction of new depots start driving training school starting, postal service implementation, respected ticketing system by coupons for monks, the new ticket machinesDea starting center, training center management and the entire staff of the Medical Center starting start, etc. can be seen as the most significant factors.

                            In 1978, the Ceylon Transport Board was decentralized into a Central Transport Board and the nine Regional Transport Boards.In the same year, the private sector was allowed to take on passenger transport, dismantling the existing monopoly.According to Act No. 23 of 1987, the company has been decentralized to control separate bus depot on December 18, 1990 janatāsantaka Bus Company was born Ratmalana Negombo and Kandy South Depot founder janatāsantaka company And by the National Transport Commission Act Amendment Act No. 30 of 1996 to amend the company stole a bus became cluster bus companies.
                        </p>
                    </Col>
                    <Col>
                        <Image src="src/assets/history-2.jpg" rounded width="100%"></Image>
                    </Col>
                </Row>
                <Row md={2} xs={1}>
                    <Col className="order-last order-md-first">
                        <Image src="src/assets/history-4.jpg" rounded width="100%"></Image>
                    </Col>
                    <Col>
                        <p>After the birth of Sri Lanka Transport Board Act by Act No. 27 of 2005.Through centralized control adapted.Then again began to control the CTB president with the Board of Directors.

                            The new life of the Sri Lanka Transport Board buses, 2,000 new cars were expanded through the spearhead of a drive together to run out of the buses, new engines installed dhavanayaṭa 270 plus purchase.Office flights started with new destinations covering government offices to railway stations for staff convenience, "bicycles for students," the one operated continuously and school service bus project, the CTB selected depots and made a depot of the most efficient model depots in new projects work schedules to meet the need through the recent start of the importanceMRI is a step.110 graduates from the written and oral tests through the proper steps to make transparent consists of new hiring at irregular and has to recruit on 16 November 2008.In addition to retread tires in Ampara area factory modified to increase production capacity significantly.New information on the need for information technology, IT unit set up in the Sri Lanka Transport Board, Colombo Pettah Central Bus office renovation work starting, the new security force set up by in the CTB and private buses and CTB bus activities required to run the joint timetable system the specific steps add up.

                            Sri Lanka Transport Board by these new approaches in ELT will walk proudly goal of providing quality service to the people than to the Lankan passenger.
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Col className="d-flex justify-content-center align-content-center my-3"><h2 className="title-border">RIGHT TO INFORMATION</h2></Col>
                <h3 className="my-3 title-border-left">CHAIRMAN & COMMISSIONERS</h3>
                <Table responsive bordered className="mb-3">
                    <thead>
                    <tr>
                        <th className="bg-light">Name & Designation</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Justice Upaly Abeyrathne Rtd. (Chairman)</td>
                    </tr>
                    <tr>
                        <td>Rustice P. Rohini Walgama Rtd.(Commissioner)</td>
                    </tr>
                    <tr>
                        <td>Attorney-at-Law Kishali Pinto-Jayawardena (Commissioner)</td>
                    </tr>
                    <tr>
                        <td>Attorney-at-Law Jagath Liyanarachchi (Commissioner)</td>
                    </tr>
                    </tbody>
                </Table>
                <h3 className="my-3 title-border-left">CONTACT PERSON - RTI</h3>
                <Table responsive bordered className="mb-3">
                    <thead>
                    <tr>
                        <th className="bg-light">Contact Person</th>
                        <th className="bg-light">Address</th>
                        <th className="bg-light">Tel No.</th>
                        <th className="bg-light">E-mail</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Director General</td>
                        <td rowSpan={3}>Right to Information Commission of Sri Lanka, Rooms No 203-204, Block 2, BMICH, Bauddhaloka Mawatha, Colombo 07</td>
                        <td>+94 112 691 007</td>
                        <td rowSpan={3}>rti.commission16@gmail.com</td>
                    </tr>
                    <tr>
                        <td>Administration Division</td>
                        <td>+94 112 691 625</td>
                    </tr>
                    <tr>
                        <td>Legal Division</td>
                        <td>+94 112 691 628</td>
                    </tr>
                    </tbody>
                </Table>
                <h3 className="my-3 title-border-left">CONTACT PERSON - SLTB</h3>
                <Table responsive bordered className="mb-3">
                    <thead>
                    <tr>
                        <th className="bg-light">Name & Designation</th>
                        <th className="bg-light">Address</th>
                        <th className="bg-light">Tel No.</th>
                        <th className="bg-light">E-mail</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Mr.Sudath Prasanna Hewagama (DGM - Admin)</td>
                        <td rowSpan={2}>Sri Lanka Transport Board Head Office, No.200, Kirula Road, Colombo 5.</td>
                        <td>+94 771 056 062</td>
                        <td>dgmadmin@sltb.lk</td>
                    </tr>
                    <tr>
                        <td>Mr. J. T. Dhanushka Jayasinghe (Manager - Planing)</td>
                        <td>+94 771 056 182</td>
                        <td>planingmgr@sltb.lk / dpsltb@gmail.com</td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default About;
