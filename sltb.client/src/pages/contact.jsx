import React from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row, Table} from "react-bootstrap";

function Contact(props) {
    return (
        <Container>
            <Row className="my-3">
                <h1 className="title-border text-center">CONTACT DETAILS</h1>
            </Row>
            <Row md={3} xs={1}>
                <Col className="my-3 text-center">
                    <h4>ADDRESS</h4>
                    <p>Sri Lanka Transport Board <br/>
                        Head Office, No.200 <br/>
                        Kirula Road, Colombo 5 <br/>
                        Sri Lanka.</p>
                </Col>
                <Col className="my-3">
                    <h4 className="text-center">CONTACTS</h4>
                    <Table borderless>
                        <tbody>
                        <tr>
                            <td>Office :</td>
                            <td> +94 112 581 120</td>
                        </tr>
                        <tr>
                            <td>Chairman :</td>
                            <td>+94 112 368 111</td>
                        </tr>
                        <tr>
                            <td>Chief Executive Officer :	</td>
                            <td>+94 112 582 926</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col className="my-3">
                    <h4 className="text-center">VIEW GOOGLE MAP</h4>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63375.7465866213!2d79.80903233125!3d6.892497399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a2cb615a5ed%3A0x9d90a07be0b1c86e!2sSri%20Lanka%20Transport%20Board%20Head%20Office!5e0!3m2!1sen!2sus!4v1709835495993!5m2!1sen!2sus"
                            width="350"
                            height="300"
                            style={{border:0}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;
