import {Col, Row, Image, Container, Card, Button, Carousel} from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import {SliderImages} from "../components/SliderImages.jsx";
import "react-image-gallery/styles/css/image-gallery.css";
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <ImageGallery showPlayButton={false} showFullscreenButton={false} items={SliderImages} />
        <Container className="my-4">
            <Row lg={3} md={2} xs={1}>
                <Col>
                    <h3 className="title-border-left">OUR MISSION</h3>
                    <p>To provide the public a safe, dependable and comfortable road
                        passenger transport at a reasonable fare system through a staff
                        dedicated to service and obtain the optimum utilization of all
                        resources functioning as a financially viable organization.</p>
                </Col>
                <Col>
                    <h3 className="title-border-left">OUR VISION</h3>
                    <p>To be the excellent provider of passenger transport.</p>
                </Col>
                <Col md={12}>
                    <Link to="/booking">
                    <Image src="src/assets/bookNow.jpg" fluid />
                    </Link>
                </Col>
            </Row>
        </Container>
            {/*Blog section*/}
            <Container className="my-5">
                <h2 className="text-center title-border">Latest News</h2>
                <Row md={3} xs={1} className="p-2 mb-md-0 mb-3">
                    <Col className="mb-md-0 mb-3">
                        <Card>
                        <Card.Img variant="top" src="src/assets/bus_openning.jpeg" />
                        <Card.Body>
                            <Card.Title>INDIAN LOAN SCHEME DISTRIBUTES 500 NEW BUSES</Card.Title>
                            <Card.Text>
                                The Indian Loan Scheme, in conjunction with the 75th Independence Day, has organized an event
                                to distribute 500 new buses to all the depots on the island.
                            </Card.Text>
                            <Button variant="primary">Read More</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col className="mb-md-0 mb-3">
                        <Card>
                            <Card.Img variant="top" src="src/assets/shed.jpeg" />
                            <Card.Body>
                                <Card.Title>INAUGURATION OF NEWLY CONSTRUCTED FUEL STATION</Card.Title>
                                <Card.Text>
                                    Newly constructed petrol station is a significant addition to the Mullaitivu Depot,
                                    which has been serving the transportation needs of the region for many years.
                                </Card.Text>
                                <Button variant="primary">Read More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="src/assets/appoinment4.jpg" />
                            <Card.Body>
                                <Card.Title>CEREMONY FOR AWARDING APPOINTMENT LETTERS</Card.Title>
                                <Card.Text>
                                    The Cabinet Minister of Transport Mr.Bandula Gunawardena,
                                    submitted a cabinet paper proposing the filling of more than a thousand vacancies.
                                </Card.Text>
                                <Button variant="primary">Read More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className="text-center">
                    <Carousel data-bs-theme="dark">
                        <Carousel.Item>
                            <Image src="src/assets/01.jpg" width={240} roundedCircle />
                                <h3>Hon.(Mr.)Lasantha Alagiyawanna</h3>
                                <p>State Minister of Transport</p>
                            <br/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image src="src/assets/3.jpg" width={200} roundedCircle />
                                <h3>Mr.S.M.D.L.K.D. Alwis</h3>
                                <p>Chairman</p>
                            <br/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image src="src/assets/1.jpg" roundedCircle />
                                <h3>Bandula Gunawardhena</h3>
                                <p>Ministry of Transport</p>
                            <br/>
                        </Carousel.Item>
                    </Carousel>
                </Row>
            </Container>
    </>
    );
}

export default Home;
