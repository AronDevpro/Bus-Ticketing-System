import { useState, useEffect } from 'react';
import {Button, Card, Table, Modal, Pagination, Dropdown, Badge, Alert} from "react-bootstrap";
import axios from 'axios';
import { ticket} from "@/components/api.jsx";
import { useSession } from "@/context/auth.jsx";

function BookedTickets() {
    const [show, setShow] = useState(false);
    const [ticketsData, setTicketsData] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 5;
    const [loginError, setLoginError] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const { token } = useSession();
    console.log(ticketsData)

    async function handleDelete(id) {
        try {
            await axios.delete(`${ticket}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            fetchTickets();
        } catch (error) {
            setLoginError(error.response.data);
        }
    }

    const handleClose = () => {
        setShow(false);
        setSelectedTicket(null);
        setLoginError('');
    };

    const handleShow = (schedule) => {
        setSelectedTicket(schedule);
        setShow(true);
    };

    useEffect(() => {
        fetchTickets();
    }, []);
    const handleCancelled = async () => {
        try {
            const updatedTicket = { ...selectedTicket, status: "cancelled" };
            await axios.put(`${ticket}/${selectedTicket.id}`, updatedTicket, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Update local state with updated bus
            const updatedTicketData = ticketsData.map(ticket =>
                ticket.id === selectedTicket.id ? updatedTicket : ticket
            );
            setTicketsData(updatedTicketData);
            handleClose();
        } catch (error) {
            console.error('Error updating bus status:', error);
        }
    };

    const fetchTickets = async () => {
        try {
            const response = await axios.get(ticket, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setTicketsData(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };


    const filteredTicket = ticketsData.filter(ticket => {
        if (statusFilter === 'All') return true;
        return ticket?.status === statusFilter;
    });

    const totalPages = Math.ceil(filteredTicket.length / ticketsPerPage);

    const indexOfLastSchedule = currentPage * ticketsPerPage;
    const indexOfFirstSchedule = indexOfLastSchedule - ticketsPerPage;
    const currentTickets = filteredTicket.slice(indexOfFirstSchedule, indexOfLastSchedule);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <Card.Title>Tickets</Card.Title>
                    <div className="d-flex align-items-center">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="filter">
                                {statusFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setStatusFilter('All')}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => setStatusFilter('completed')}>Completed</Dropdown.Item>
                                <Dropdown.Item onClick={() => setStatusFilter('cancelled')}>Cancelled</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table responsive="md" hover>
                        <thead>
                        <tr>
                            <th>Schedule</th>
                            <th>Route</th>
                            <th>Name</th>
                            <th>NIC</th>
                            <th>Booked Seats</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentTickets.map((tickets) => (
                            <tr key={tickets.id}>
                                <td>{tickets.busSchedule?.startDate} - {tickets.busSchedule?.startTime}</td>
                                <td>{tickets.busSchedule?.busRoute?.startLocation} - {tickets.busSchedule?.busRoute?.endLocation}</td>
                                <td>{tickets.passengerName}</td>
                                <td>{tickets.nic}</td>
                                <td>{tickets.seatNumber?.length}</td>
                                <td><Badge bg={tickets?.status === "completed" ? "success" : "danger"}>{tickets?.status}</Badge></td>
                                <td>
                                    <Button variant="primary" onClick={() => handleShow(tickets)} className="mx-2">View</Button>
                                    <Button variant="danger" onClick={() => handleDelete(tickets.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
                    <Pagination>
                        <Pagination.First onClick={() => paginate(1)} />
                        <Pagination.Prev
                            onClick={() =>
                                currentPage > 1 && paginate(currentPage - 1)
                            }
                        />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() =>
                                currentPage < totalPages &&
                                paginate(currentPage + 1)
                            }
                        />
                        <Pagination.Last onClick={() => paginate(totalPages)} />
                    </Pagination>
                </Card.Footer>
            </Card>
            {/* Modal for booking ticket */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Ticket</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        {loginError && (
                            <Alert variant="danger" className="text-center" dismissible>
                                {loginError}
                            </Alert>
                        )}
                        <Card>
                            <Card.Body>
                                <Card.Text>Name: {selectedTicket?.passengerName}</Card.Text>
                                <Card.Text>Phone Number: {selectedTicket?.passengerPhone}</Card.Text>
                                <Card.Text>NIC: {selectedTicket?.nic}</Card.Text>
                                <Card.Text>Seats: {selectedTicket?.seatNumber?.length}</Card.Text>
                                <Card.Text>Status: <Badge bg={selectedTicket?.status === "completed" ? "success" : "danger"}>{selectedTicket?.status}</Badge></Card.Text>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancelled}>Cancel Ticket</Button>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
            </Modal>
        </>
    );
}

export default BookedTickets;
