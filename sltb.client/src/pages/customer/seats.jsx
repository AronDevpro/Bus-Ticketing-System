import { Fragment, useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import {Accordion, Button, Col, FloatingLabel, Form, Row, Table} from "react-bootstrap";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {busschedule} from "@/components/api.jsx";
import CardComponent from "@/components/Card.jsx";


const BusTicketSystem = ({ id, usersData}) => {
    const passengerSeatImage = "https://cdn.icon-icons.com/icons2/2783/PNG/512/car_seat_icon_177219.png";
    const driverSeatImage = "https://i.imgur.com/o2oQTCB.png";

    const [clickedSeats, setClickedSeats] = useState([]);
    const [rowsArray, setRowsArray] = useState(10);
    const [totalColumns, setColumn] = useState(4);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [show, setShow] = useState(false);
    const [data, setdata] = useState([]);
    const [price, setPrice] = useState(0);
    const [test, setTest] = useState(true);
    const [pay, setPay] = useState(false);
    const [orderData, setOrderData] = useState();
    const [ticketData, setTicketData] = useState()


    useEffect(() => {
        async function getSchedule() {
            try {
                const response = await axios.get(`${busschedule}/${id}`);
                setdata(response.data);
                if (response.data.bookedSeats !== null) {
                    setBookedSeats(response.data.bookedSeats);
                }
                setPrice(parseFloat(response.data.busRoute.ticketPrice));
            } catch (error) {
                // handle error
                console.error('Error fetching schedule:', error);
                // You can also set an error state here and display it to the user
            }
        }
        // Fetch data when component mounts
        getSchedule();
    }, []);

    const schema = z.object({
        passengerName: z.string().min(1, { message: 'Name Required' }),
        PassengerPhone: z.string().min(10, { message: 'Enter a valid mobile number' }),
        nic: z.string().min(10, { message: 'Enter a valid NIC/Passport number' })
    });

    const {register, handleSubmit, formState: { errors },} = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        const order  = {...data, seatNumber: clickedSeats, userId: usersData.id, BusScheduleId: id};
        const ticketData = {totalAmount:calculateFare().totalFare, convenientFee:calculateFare().convenienceFee}
        setOrderData(order);
        setTicketData(ticketData);
        setPay(true)
        setTest(false);
    };

    const handleColumnClick = (row, column) => {
        const clickedArray = `${row}-${column}`;

        if (row === 9 && (column === 0 || column === 1)) {
            return;
        }

        if (bookedSeats.includes(clickedArray)) {
                return;
        }

        if (clickedSeats.length >= 5 && !clickedSeats.includes(clickedArray)) {
            // Maximum seat selection limit reached
            toast.warn('A maximum of 5 tickets can be booked per NIC', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        setClickedSeats(prevSeats => {
            if (prevSeats.includes(clickedArray)) {
                return prevSeats.filter(seat => seat !== clickedArray);
            } else {
                return [...prevSeats, clickedArray];
            }
        });
    };
    const calculateFare = () => {
        const busFare = clickedSeats.length * price;
        const convenienceFee = busFare * 0.03;
        const totalFare = busFare + convenienceFee;
        return {
            busFare,
            convenienceFee: convenienceFee.toFixed(2),
            totalFare: totalFare.toFixed(2)
        };
    };

    return (
        <Container className="my-4">
            <Row>
                {test && (
                <Col md={3} xs={12} className='mt-2 p-3 bg-light rounded'>
                    <ToastContainer/>
                    <Row className="row pb-2 pt-1" style={{ borderTopLeftRadius:'30px', borderTopRightRadius:'30px'}}>
                        {[...Array(totalColumns)].map((_, columnIndex) => (
                            <Fragment key={columnIndex.index}>
                                <div className={`column-empty`}>
                                    {columnIndex === totalColumns - 1 ? (
                                        <img src={driverSeatImage} style={{width:'52px'}} alt="Driver Seat" />
                                    ) : (<></>)}
                                </div>
                                {columnIndex === 1 && <div className="space" />}
                            </Fragment>
                        ))}
                    </Row>
                    {[...Array(rowsArray)].map((row, rowIndex) => (
                        <Row key={rowIndex.index}>
                            {[...Array(5)].map((_, columnIndex) => (
                                <>
                                    <div
                                        className={`${
                                            rowIndex === 9 && (columnIndex === 0 || columnIndex === 1)
                                                ? "column-empty"
                                                : "column"
                                        } ${
                                            bookedSeats.includes(`${rowIndex}-${columnIndex}`)
                                                ? "seat-booked"
                                                : ""
                                        } ${clickedSeats.includes(`${rowIndex}-${columnIndex}`) ? 'clicked' : ''}`}
                                        key={`${rowIndex}-${columnIndex}`}
                                        onClick={() => handleColumnClick(rowIndex, columnIndex)}
                                    >
                                        {rowIndex === 9 && (columnIndex === 0 || columnIndex === 1) ? (
                                            <></>
                                        ) : (
                                            <img src={passengerSeatImage} style={{ width: '71%'}} alt="Passenger Seats" />
                                        )}
                                    </div>
                                    {columnIndex === 1 && (
                                        <div className="space" key={`space-${rowIndex}-${columnIndex}`} />
                                    )}
                                </>
                            ))}
                        </Row>
                    ))}

                    <Row>
                        {[...Array(6)].map((_, lastColumnIndex) => (
                            <div
                                className={`column ${
                                    bookedSeats.includes(`11-${lastColumnIndex}`)
                                        ? "seat-booked"
                                        : ""
                                } ${clickedSeats.includes(`11-${lastColumnIndex}`) ? 'clicked' : ''}`}

                                key={lastColumnIndex.index}
                                onClick={() => handleColumnClick(11, lastColumnIndex)}
                            >
                                <img src={passengerSeatImage} style={{ width: '75%' }} alt="Passenger Seats" />
                            </div>
                        ))}
                    </Row>
                </Col>
                )}
                {test && (
                <Col md={6} xs={12} className='mt-2 p-3 order-3 order-md-2'>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FloatingLabel controlId="passengerName" label="Name" className="mb-3">
                            <Form.Control placeholder="eg: Saman Perera" {...register("passengerName", {value: usersData?.name})} />
                            {errors.passengerName && <span className="text-danger">{errors.passengerName.message}</span>}
                        </FloatingLabel>

                        <FloatingLabel controlId="PassengerPhone" label="Mobile No" className="mb-3">
                            <Form.Control placeholder="Eg: 0701234567" {...register("PassengerPhone", {value: usersData?.phoneNumber})} />
                            {errors.PassengerPhone && <span className="text-danger">{errors.PassengerPhone.message}</span>}
                        </FloatingLabel>

                        <FloatingLabel controlId="nic" label="NIC/Passport No." className="mb-3">
                            <Form.Control placeholder="Eg: 9190765224V" {...register("nic", {value: usersData?.nic})} />
                            {errors.nic && <span className="text-danger">{errors.nic.message}</span>}
                        </FloatingLabel>

                        <Button disabled={clickedSeats.length === 0} type="submit">Proceed to Pay</Button>
                    </Form>
                </Col>
                )}
                {pay &&
                <Col xs={12} md={8} className='mt-2 p-3'>
                <CardComponent orderDetails={orderData} ticketDetails={ticketData}/>
                </Col>
                }
                <Col md={3} xs={12} className='mt-2 p-3 order-2 order-md-3'>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Journey Summery</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col>
                                        <dl className="departure-info">
                                            <dt>Departure</dt>
                                            {data && data.busRoute && (
                                                <dd>{data.busRoute.startLocation}</dd>
                                            )}
                                            <dt>Date</dt>
                                            <dd>{data && data.startDate}</dd>
                                            <dt>Time</dt>
                                            <dd>{data && data.startTime}</dd>
                                        </dl>
                                    </Col>
                                    <Col>
                                        <dl className="arrival-info">
                                            <dt>Arrival</dt>
                                            {data && data.busRoute && (
                                                <dd>{data.busRoute.endLocation}</dd>
                                            )}
                                            <dt>Date</dt>
                                            <dd>{data && data.endDate}</dd>
                                            <dt>Time</dt>
                                            <dd>{data && data.endTime}</dd>
                                        </dl>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Fare Breakdown</Accordion.Header>
                            <Accordion.Body>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>Bus Fare</td>
                                        <td>{calculateFare().busFare}</td>
                                    </tr>
                                    <tr>
                                        <td>Convenient fee</td>
                                        <td>{calculateFare().convenienceFee}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Fare</td>
                                        <td>{calculateFare().totalFare}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
}

export default BusTicketSystem;
