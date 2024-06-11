import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Col, Dropdown, Row, Table} from "react-bootstrap";
import axios from 'axios';
import {transaction, users, ticket, busschedule, route, bus} from "@/components/api.jsx";
import {useSession} from "@/context/auth.jsx";
import Container from "react-bootstrap/Container";

function AdminDashboard() {
    const [data, setData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [buses, setBuses] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [routes, setRoutes] = useState([]);
    const { token} = useSession();
    function calculateRelativeTime(transactionDateTime) {
        const now = new Date();
        const transactionDate = new Date(transactionDateTime);
        const difference = now - transactionDate;
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (weeks > 0) {
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    }
    const fetchUsers = async () => {
        try {
            const response = await axios.get(users, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setUsersData(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    const fetchBuses = async () => {
        try {
            const response = await axios.get(bus, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setBuses(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    const fetchRoutes = async () => {
        try {
            const response = await axios.get(route, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setRoutes(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    const fetchSchedules = async () => {
        try {
            const response = await axios.get(busschedule, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSchedule(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const fetchTransaction = async () => {
        try {
            const response = await axios.get(transaction, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    useEffect(() => {
        fetchTransaction();
        fetchUsers();
        fetchBuses();
        fetchSchedules();
        fetchRoutes();
    },[])

    return (
        <Container className="p-3">
            <Row xs={1} md={2} lg={4}>
                <Col>
                    <Card className="mb-3">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Users</span>
                                    <span className="h3 font-bold mb-0">{usersData?.length}</span>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mb-3">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Buses</span>
                                    <span className="h3 font-bold mb-0">{buses?.length}</span>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mb-3">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Routes</span>
                                    <span className="h3 font-bold mb-0">{routes?.length}</span>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mb-3">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Schedules</span>
                                    <span className="h3 font-bold mb-0">{schedule?.length}</span>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card>
                <Card.Header className="d-flex justify-content-between">
                <Card.Title>Transaction</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table responsive="md" hover className="nowrap" >
                    <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Payment Mode</th>
                        <th>Status</th>
                        <th>Date/Time</th>
                        <th>Total</th>
                    </tr>
                    {data.map((tickets) => (
                        <tr key={tickets.id}>
                            <td>{tickets.id}</td>
                            <td>{tickets.paymentMode}</td>
                            <td><Badge bg={tickets?.status === "Completed" ? "success" : "danger"}>{tickets?.status}</Badge></td>
                            <td>{calculateRelativeTime(tickets.transactionDateTime)}</td>
                            <td>{tickets.totalAmount}</td>
                        </tr>
                    ))}
                    </thead>
                </Table>
            </Card.Body>
            </Card>
        </Container>
    );
}

export default AdminDashboard;
