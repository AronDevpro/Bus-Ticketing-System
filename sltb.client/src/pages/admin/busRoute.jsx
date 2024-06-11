import { useState, useEffect } from 'react';
import {
    Button,
    Card,
    Table,
    Modal,
    Pagination,
    Dropdown,
    Badge,
    FloatingLabel,
    Form,
    Alert
} from "react-bootstrap";
import { useSession } from "@/context/auth.jsx";
import axios from 'axios';
import {route} from "@/components/api.jsx";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function BusRoutes() {
    const [show, setShow] = useState(false);
    const [showAddRoute, setShowAddRoute] = useState(false);
    const [routesData, setRoutesData] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const routesPerPage = 5;
    const [statusFilter, setStatusFilter] = useState('All');
    const [loginError, setLoginError] = useState('');

    const { token } = useSession();

    const schema = z.object({
        routeNumber: z.number().min(1, { message: 'Route Number is Required' }),
        startLocation: z.string().min(5, { message: 'Start Location is required' }),
        ticketPrice: z.number().min(1, { message: 'Ticket Price is Required' }),
        endLocation: z.string().min(5, { message: 'End Location is Required' }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const routeData = { ...data, status: "active" }
            const response = await axios.post(route, routeData);
            setRoutesData(prevRoutesData => [...prevRoutesData, response.data]);
            handleClose();
        } catch (error) {
            setLoginError(error.response.data);
        }
    };

    const onUpdate = async (data) => {
        try {
            const routeData = { ...data, status: "active", id: selectedRoute.id }
            await axios.put(`${route}/${selectedRoute.id}`, routeData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            await fetchRoutes();
            handleClose();
        } catch (error) {
            setLoginError(error.response.data);
        }
    };
    const handleInActive = async () => {
        try {
            const updatedRoute = { ...selectedRoute, status: "inactive" };
            await axios.put(`${route}/${selectedRoute.id}`, updatedRoute, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Update local state with updated bus
            const updatedRouteData = routesData.map(route =>
                route.id === selectedRoute.id ? updatedRoute : route
            );
            setRoutesData(updatedRouteData);
            handleClose();
        } catch (error) {
            console.error('Error updating bus status:', error);
        }
    };
    const handleActivate = async () => {
        try {
            const updatedRoute = { ...selectedRoute, status: "active" };
            await axios.put(`${route}/${selectedRoute.id}`, updatedRoute, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Update local state with updated bus
            const updatedRouteData = routesData.map(route =>
                route.id === selectedRoute.id ? updatedRoute : route
            );
            setRoutesData(updatedRouteData);
            handleClose();
        } catch (error) {
            console.error('Error updating bus status:', error);
        }
    }

    const handleClose = () => {
        setShow(false);
        setSelectedRoute(null);
        setLoginError('');
        reset();
    };

    const handleShow = (route) => {
        reset();
        setSelectedRoute(route);
        setShow(true);
    };
    const handleAddRouteClose = () => {
        setShowAddRoute(false);
        setLoginError('');
        reset();
    };

    const handleAddRouteShow = () => {
        reset();
        setShowAddRoute(true);
    };

    useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        try {
            const response = await axios.get(route, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setRoutesData(response.data);
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${route}/${selectedRoute.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const updatedRoutesData = routesData.filter(r => r.id !== selectedRoute.id);
            setRoutesData(updatedRoutesData);
            handleClose();
        } catch (error) {
            setLoginError(error.response.data);
        }
    };

    const filteredRoutes = routesData.filter(r => {
        if (statusFilter === 'All') return true;
        return r.status === statusFilter;
    });

    const totalPages = Math.ceil(filteredRoutes.length / routesPerPage);

    const indexOfLastRoute = currentPage * routesPerPage;
    const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
    const currentRoutes = filteredRoutes.slice(indexOfFirstRoute, indexOfLastRoute);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <Card.Title>Routes</Card.Title>
                    <div className="d-flex align-items-center">
                        <Button className="mx-2" onClick={() => handleAddRouteShow()}>Add Route</Button>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="filter">
                                {statusFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setStatusFilter('All')}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => setStatusFilter('active')}>Active</Dropdown.Item>
                                <Dropdown.Item onClick={() => setStatusFilter('inactive')}>Inactive</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table responsive="md" hover>
                        <thead>
                        <tr>
                            <th>Route Number</th>
                            <th>Start Location</th>
                            <th>End Location</th>
                            <th>Ticket Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentRoutes.map((route) => (
                            <tr key={route.id}>
                                <td>{route.routeNumber}</td>
                                <td>{route.startLocation}</td>
                                <td>{route.endLocation}</td>
                                <td>{route.ticketPrice}</td>
                                <td><Badge bg={route.status === "active" ? "success" : "danger"}>{route.status}</Badge></td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShow(route)}
                                    >
                                        View
                                    </Button>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Route Details</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onUpdate)}>
                    <Modal.Body>
                        {loginError && (
                            <Alert variant="danger" className="text-center" dismissible>
                                {loginError}
                            </Alert>
                        )}
                        <FloatingLabel controlId="routeNumber" label="Route Number" className="mb-3">
                            <Form.Control
                                type="number"
                                placeholder="Enter Route Number"
                                {...register('routeNumber', { value: selectedRoute?.routeNumber })}
                            />
                        </FloatingLabel>
                        <span className="text-danger">{errors.routeNumber?.message}</span>
                        <FloatingLabel controlId="startLocation" label="Start Location" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Start Location"
                                {...register('startLocation', { value: selectedRoute?.startLocation })}
                            />
                        </FloatingLabel>
                        <span className="text-danger">{errors.startLocation?.message}</span>
                        <FloatingLabel controlId="endLocation" label="End Location" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter End Location"
                                {...register('endLocation', { value: selectedRoute?.endLocation })}
                            />
                        </FloatingLabel>
                        <span className="text-danger">{errors.endLocation?.message}</span>
                        <FloatingLabel controlId="ticketPrice" label="Ticket Price" className="mb-3">
                            <Form.Control
                                type="number"
                                placeholder="Enter Ticket Price"
                                {...register('ticketPrice', { value: selectedRoute?.ticketPrice })}
                            />
                        </FloatingLabel>
                        <span className="text-danger">{errors.ticketPrice?.message}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        {selectedRoute && (
                            <>
                                {selectedRoute.status =="active" ? (
                                    <Button variant="danger" onClick={handleInActive}>Inactive Route</Button>
                                ) : (
                                    <Button variant="success" onClick={handleActivate}>Activate Route</Button>
                                )}
                            </>
                        )}
                        <Button variant="primary" type="submit" className="px-4">
                            Edit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        {/*    create route model*/}
            <Modal show={showAddRoute} onHide={handleAddRouteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Route Details</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        {loginError && (
                            <Alert variant="danger" className="text-center" dismissible>
                                {loginError}
                            </Alert>
                        )}
                        <FloatingLabel controlId="routeNumber" label="Route Number" className="mb-3">
                            <Form.Control placeholder="Enter Route Number"
                                          {...register('routeNumber',{ valueAsNumber: true })}/>
                        </FloatingLabel>
                        <span className="text-danger">{errors.routeNumber?.message}</span>
                        <FloatingLabel controlId="startLocation" label="Start Location" className="mb-3">
                            <Form.Control placeholder="Enter Start Location"
                                {...register('startLocation')}/>
                        </FloatingLabel>
                        <span className="text-danger">{errors.startLocation?.message}</span>
                        <FloatingLabel controlId="endLocation" label="End Location" className="mb-3">
                            <Form.Control placeholder="Enter End Location"
                                {...register('endLocation')}/>
                        </FloatingLabel>
                        <span className="text-danger">{errors.endLocation?.message}</span>
                        <FloatingLabel controlId="ticketPrice" label="Ticket Price" className="mb-3">
                            <Form.Control placeholder="Enter Ticket Price"
                                {...register('ticketPrice', { valueAsNumber: true })}/>
                        </FloatingLabel>
                        <span className="text-danger">{errors.ticketPrice?.message}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" className="px-4">Add</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default BusRoutes;
