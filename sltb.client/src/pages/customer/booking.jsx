import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import {Button, Col, FloatingLabel, Form, Row, Image, Badge} from "react-bootstrap";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, differenceInCalendarDays } from "date-fns";
import Seats from "./seats.jsx";
import axios from 'axios';
import {busschedule, users} from "@/components/api.jsx";
import {useSession} from "@/context/auth.jsx";

function Booking() {
    const [selectedDay, setSelectedDay] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [openTicketComponent, setOpenTicketComponent] = useState(false);
    const [openBusSearchContainer, setOpenBusSearchContainer] = useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [data, setdata] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const {user, token} = useSession();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${users}/${user.accountId}`, { // Use the users constant as the URL
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const usersData = response.data;
            setUsersData(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Format the selected date
    const handleDayClick = (day) => {
        const formattedDate = format(day, 'yyyy-MM-dd');
        setInputValue(formattedDate);
        setSelectedDay(formattedDate);
        setShowDatePicker(false);
    };

    async function getSchedule() {
        try {
            const response = await axios.get(`${busschedule}/search`, {
                params: {
                    startLocation: from,
                    endLocation: to,
                    date: selectedDay
                }
            });
            // handle success
            setdata(response.data);
            setOpenBusSearchContainer(true);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    }

    function schedule() {
        setOpenTicketComponent(false)
        getSchedule();
        fetchUsers();
    }

    function handleBooking(id) {
        setOpenTicketComponent(!openTicketComponent);
        setOpenBusSearchContainer(false);
        // Find the selected item based on its id
        const selectedItem = data.find(item => item.id === id);
        setSelectedItem(selectedItem);
    }

    function calculateSeats(totalSeats, bookedSeats) {
        if (bookedSeats == null || "") return totalSeats
        else {
        const bookedSeatsArray = bookedSeats.split(',');
        return totalSeats - bookedSeatsArray.length;
        }
    }

    function isPastDate(date) {
        return differenceInCalendarDays(date, new Date()) < 0;
    }

    return (
        <>
            <Container className="my-4">
                <Row lg={4} md={2} xs={2} className="bg-dark p-3 rounded">
                    <Col className="mb-md-2 mb-sm-3">
                        <FloatingLabel controlId="floatingFrom" label="from">
                            <Form.Control type="text" placeholder="From" onChange={e => setFrom(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                    <Col className="mb-md-2 mb-sm-3">
                        <FloatingLabel controlId="floatingTo" label="to">
                            <Form.Control type="text" placeholder="To" onChange={e => setTo(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                    <Col className="mb-md-2 mb-sm-3">
                        <FloatingLabel controlId="floatingInput" label="Click to select a date">
                            <Form.Control
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onClick={() => setShowDatePicker(!showDatePicker)} />
                            <div className="datepicker-container">
                                {showDatePicker && (
                                    <div className="datepicker-wrapper">
                                        <DayPicker
                                            mode="single"
                                            required
                                            disabled={isPastDate}
                                            selected={selectedDay}
                                            onSelect={handleDayClick}
                                        />
                                    </div>
                                )}
                            </div>
                        </FloatingLabel>
                    </Col>
                    <Col className="d-flex align-items-center">
                        {/*<Button onClick={()=> {setOpenBusSearchContainer(true);*/}
                        {/*setOpenTicketComponent(false)}} className="col-12">Search</Button>*/}
                        <Button onClick={schedule} className="col-12">Search</Button>
                    </Col>
                </Row>
            </Container>
            {openBusSearchContainer && data.length === 0 ? (
                <Container className="py-3 my-2 text-center">
                    <Row>
                        <Col>
                        No Schedule Available
                        </Col>
                    </Row>
                </Container>
            ) : (
                openBusSearchContainer && data.map(item => (
                    <Container className="bg-dark py-4 rounded my-3" key={item.id}>
                        <Row xs={2} md={5} className="bg-white py-3">
                            <Col xs={12}>
                                <Image src="src/assets/bus-image.jpeg" fluid rounded />
                            </Col>
                            <Col>
                                <dt className='fw-light'>Departure</dt>
                                {item && item.busRoute && (
                                    <dd className='fw-bold'>{item.busRoute.startLocation}</dd>
                                )}
                                <dt className='fw-light'>Date</dt>
                                <dd className='fw-bold'>{item && item.startDate}</dd>
                                <dt className='fw-light'>Time</dt>
                                <dd className='fw-bold'>{item && item.startTime}</dd>
                            </Col>
                            <Col>
                                <dt className='fw-light'>Arrival</dt>
                                {item && item.busRoute && (
                                    <dd className='fw-bold'>{item.busRoute.endLocation}</dd>
                                )}
                                <dt className='fw-light'>Date</dt>
                                <dd className='fw-bold'>{item && item.endDate}</dd>
                                <dt className='fw-light'>Time</dt>
                                <dd className='fw-bold'>{item && item.endTime}</dd>
                            </Col>
                            <Col>
                                <dt className='fw-light'><small>Bus Type</small></dt>
                                <dd className="fw-bold">{item.bus && item.bus.busType}</dd>
                                <dt className='fw-light'>Depot Name</dt>
                                <dd className='fw-bold'>{item.bus && item.bus.depotName}</dd>
                                <dt className='fw-light'>Status</dt>
                                <dd><Badge bg={item.status == "active" ? "primary" : "danger"}>{item.status}</Badge></dd>
                            </Col>
                            <Col>
                                <dt>Ticket Price</dt>
                                <dd className="fw-bold" style={{ fontSize: 25 }}>Rs: {item.busRoute.ticketPrice}</dd>
                                <dt>Available Seats</dt>
                                <dd className="fw-bold text-warning" style={{ fontSize: 28 }}> | {calculateSeats(item.bus.seatsCapacity, item.bookedSeats)}</dd>
                                <Button disabled={item.status != "active" || calculateSeats(item.bus.seatsCapacity, item.bookedSeats) == 0} onClick={() => handleBooking(item.id)}>Book Seat</Button>
                            </Col>
                        </Row>
                    </Container>
                ))
            )}

            {openTicketComponent && selectedItem ? // Check if selectedItem exists
                <Seats usersData={usersData} id={selectedItem.id} onClick={() => setOpenTicketComponent(false)} /> : null
            }
        </>
    );
}

export default Booking;
