import {Col, Container, Row} from "react-bootstrap";
import {EnvelopeFill, Facebook, GeoAltFill, Instagram, TelephoneFill, Twitter, Youtube} from "react-bootstrap-icons";
import { FaFax } from "react-icons/fa";
import { FacebookEmbed } from 'react-social-media-embed';

function Footer() {
    return (
        <Container fluid className="bg-dark text-light footer">
            <Row md={3} xs={1} className="p-1 p-md-5">
                <Col>
                    <h3>Contact</h3>
                    <p><TelephoneFill /> | +94 (0) 11 7706000 / +94 (0) 11 2581120 - 4</p>
                    <p><FaFax /> | +94 (0) 11 2589683</p>
                    <p><EnvelopeFill /> | info@sltb.lk</p>
                    <p><GeoAltFill /> | Sri Lanka Transport Board<br/>
                        Head Office,<br/>
                        No.200,<br/>
                        Kirula Road,<br/>
                        Colombo 5.
                    </p>
                </Col>
                <Col>
                    <h3>Like Us On Facebook</h3>
                    <FacebookEmbed url="https://www.facebook.com/officialSLTB/posts/pfbid029y3ka5XTjAcD3wtf7vchTUDJnGg27Vuva8fi9QAmNgdonCdfmKF4Q1xjyc54RHkNl?__cft__[0]=AZX0bjX8EpztSGr_j3OLt-Aa05lK63Iv0-VDmCiN2kYbX3c62cRYxhUAIzJyfjWsezRFPZ3m3OluMspmsS4rPjEJ4V6g7aTP2wYfG9EzkPlKx9nPhBB4BAqi0C3LPg59bcxU4LJvUPoDkTNpSHD_CdyAAK5EClP4J5-P0cOOoRwE3BOdjaTyZSX8OgCO4c8KZf-recyBA0ALeZH3nQKAiEop&__tn__=%2CO%2CP-R" width={300} height={300}/>
                </Col>
                <Col>
                    <h3>View Google Map</h3>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63375.7465866213!2d79.80903233125!3d6.892497399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a2cb615a5ed%3A0x9d90a07be0b1c86e!2sSri%20Lanka%20Transport%20Board%20Head%20Office!5e0!3m2!1sen!2sus!4v1709835495993!5m2!1sen!2sus"
                            width="300"
                            height="300"
                            style={{border:0}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </Col>
            </Row>
            <div className="copyright-border"></div>
            <Row md={2} xs={1} className="py-3">
                <Col lg={10} className="text-center">
                    <p className="">Copyright © 2024 SLTB ICT Division. All Rights Reserved.</p>
                </Col>
                <Col lg={2} className="text-center">
                    <Facebook size={20} className="mx-2"/>
                    <Twitter size={20} className="mx-2"/>
                    <Instagram size={20} className="mx-2"/>
                    <Youtube size={20} className="mx-2" />
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;
