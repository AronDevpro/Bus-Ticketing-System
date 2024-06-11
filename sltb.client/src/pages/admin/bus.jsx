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
import {useSession} from "@/context/auth.jsx";
import axios from 'axios';
import {bus} from "@/components/api.jsx";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

function Bus() {
    const [show, setShow] = useState(false);
    const [showAddBus, setShowAddBus] = useState(false);
    const [busesData, setBusesData] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const busesPerPage = 5;
    const [statusFilter, setStatusFilter] = useState('All');
    const [loginError, setLoginError] = useState('');

    const {token} = useSession();

    const schema = z.object({
        busNumber: z.string().min(5, { message: 'Bus Number is Required' }),
        busType: z.string().min(1, { message: 'Bus Type is required' }),
        depotName: z.string().min(5, { message: 'Depot Name is Required' }),
        seatsCapacity: z.coerce.number().min(1, { message: 'Seats Capacity is required' }),
    });

    const {register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: zodResolver(schema),
    });
    const onSubmit = async (data) => {
        try {
            const busesData = { ...data, status: "active" }
            const response = await axios.post(bus, busesData);
            setBusesData(prevBusesData => [...prevBusesData, response.data]);
            handleAddBusClose();
        } catch (error) {
            setLoginError(error.response.data);
        }
    };
    const onUpdate = async (data) => {
        try {
            const busesData = { ...data, status: "active", id: selectedBus.id }
            await axios.put(`${bus}/${selectedBus.id}`, busesData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                }
            });
            fetchBuses();
            handleClose();
        } catch (error) {
            setLoginError(error.response.data);
        }
    };
    const handleClose = () => {
        setShow(false);
        setSelectedBus(null);
        setLoginError('');
        reset();
    };

    const handleShow = (bus) => {
        reset();
        setSelectedBus(bus);
        setShow(true);
    };
    const handleAddBusClose = () => {
        setShowAddBus(false);
        setLoginError('');
        reset();
    };

    const handleAddBusShow = () => {
        reset();
        setShowAddBus(true);
    };

    useEffect(() => {
        fetchBuses();
    }, []);
    const fetchBuses = async () => {
        try {
            const response = await axios.get(bus, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const BusesData = response.data;
            setBusesData(BusesData);
        } catch (error) {
            console.error('Error fetching buses:', error);
        }
    };
    const handleInActive = async () => {
        try {
            const updatedBus = { ...selectedBus, status: "inactive" };
            await axios.put(`${bus}/${selectedBus.id}`, updatedBus, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Update local state with updated bus
            const updatedBusesData = busesData.map(bus =>
                bus.id === selectedBus.id ? updatedBus : bus
            );
            setBusesData(updatedBusesData);
            handleClose();
        } catch (error) {
            console.error('Error updating bus status:', error);
        }
    };
    const handleActivate = async () => {
        try {
            const updatedBus = {...selectedBus, status: "active"};
            await axios.put(`${bus}/${selectedBus.id}`, updatedBus, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Update local state with updated bus
            const updatedBusesData = busesData.map(bus =>
                bus.id === selectedBus.id ? updatedBus : bus
            );
            setBusesData(updatedBusesData);
            handleClose();
        } catch (error) {
            console.error('Error updating bus status:', error);
        }
    }

    const handleDelete = async () => {
        try {
            // Send a DELETE request to delete the selected bus
            await axios.delete(`${bus}/${selectedBus.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Update local state to remove the deleted bus
            const updatedBusesData = busesData.filter(bus => bus.id !== selectedBus.id);
            setBusesData(updatedBusesData);
            handleClose(); // Close the modal after successful deletion
        } catch (error) {
            setLoginError(error.response.data);
        }
    };


    const filteredBuses = busesData.filter(bus => {
        if (statusFilter === 'All') return true; // Show all buses
        // Modify this condition as per your bus status property
        return bus.status === statusFilter;
    });

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredBuses.length / busesPerPage);

    // Get current buses for the current page
    const indexOfLastBus = currentPage * busesPerPage;
    const indexOfFirstBus = indexOfLastBus - busesPerPage;
    const currentBuses = filteredBuses.slice(indexOfFirstBus, indexOfLastBus);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <Card.Title>Buses</Card.Title>
                    <div className="d-flex align-items-center">
                        <Button className="mx-2" onClick={() => handleAddBusShow()}>Add Bus</Button>
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
                            <th>Bus Number</th>
                            <th>Bus Type</th>
                            <th>Depot Name</th>
                            <th>Seat Capacity</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentBuses.map((bus) => (
                            <tr key={bus.id}>
                                <td>{bus.busNumber}</td>
                                <td>{bus.busType}</td>
                                <td>{bus.depotName}</td>
                                <td>{bus.seatsCapacity}</td>
                                <td><Badge bg={bus.status=="active" ? "success" : "danger"}>{bus.status}</Badge></td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShow(bus)}
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
            {/*model for bus handle*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Bus Details</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onUpdate)}>
                    <Modal.Body>
                        {loginError && (
                            <Alert variant="danger" className="text-center" dismissible>
                                {loginError}
                            </Alert>
                        )}
                        <FloatingLabel controlId="busNumber" label="Bus Number" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Bus Number"
                                {...register('busNumber', {value: selectedBus?.busNumber})}
                            />
                        </FloatingLabel>
                        <span className="text-danger">{errors.busNumber?.message}</span>
                        <FloatingLabel controlId="depotName" label="Depot Name" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Depot Name"
                                {...register('depotName',{value: selectedBus?.depotName})}
                            />
                        </FloatingLabel>
                        <span className="text-danger">{errors.depotName?.message}</span>
                        <FloatingLabel controlId="busType" label="Bus Type" className="mb-3">
                            <Form.Select
                                aria-label="Select Bus Type"
                                {...register('busType',{value: selectedBus?.busType})}
                            >
                                <option value="Normal">Normal</option>
                                <option value="Semi Luxury">Semi Luxury</option>
                                <option value="Luxury">Luxury</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId="seatsCapacity" label="Seats Capacity" className="mb-3">
                            <Form.Select
                                value={selectedBus?.seatsCapacity}
                                aria-label="Select Seat Capacity"
                                {...register('seatsCapacity',{value: selectedBus?.seatsCapacity})}
                            >
                                <option value={54}>54 seats</option>
                            </Form.Select>
                        </FloatingLabel>
                        <span className="text-danger">{errors.seatsCapacity?.message}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        {selectedBus && (
                            <>
                                {selectedBus.status =="active" ? (
                                    <Button variant="danger" onClick={handleInActive}>Inactive Bus</Button>
                                ) : (
                                    <Button variant="success" onClick={handleActivate}>Activate Bus</Button>
                                )}
                            </>
                        )}
                        <Button variant="primary" type="submit" className="px-4">
                            Edit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/*    model for creating buses*/}
            <Modal show={showAddBus} onHide={handleAddBusClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Bus</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        {loginError &&
                            <Alert variant="danger" className="text-center" dismissible={true}>{loginError}</Alert>}
                        <FloatingLabel controlId="busNumber" label="Bus Number" className="mb-3">
                            <Form.Control type="text" placeholder="Enter Bus Number" {...register('busNumber')} />
                        </FloatingLabel>
                        <span className="text-danger">{errors.busNumber?.message}</span>
                        <FloatingLabel controlId="depotName" label="Depot Name" className="mb-3">
                            <Form.Control type="text" placeholder="Enter Depot Name" {...register('depotName')} />
                        </FloatingLabel>
                        <span className="text-danger">{errors.depotName?.message}</span>
                        <FloatingLabel controlId="busType" label="Bus Type" className="mb-3">
                            <Form.Select aria-label="Select Bus Type" {...register('busType')}>
                                <option value="Normal">Normal</option>
                                <option value="Semi Luxury">Semi Luxury</option>
                                <option value="Luxury">Luxury</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId="seatsCapacity" label="Seats Capacity" className="mb-3">
                            <Form.Select aria-label="Select Seat Capacity" {...register('seatsCapacity')}>
                                <option value={54}>54 seats</option>
                            </Form.Select>
                        </FloatingLabel>
                        <span className="text-danger">{errors.seatsCapacity?.message}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" className="px-4">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Bus;
