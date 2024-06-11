import  { useState, useEffect } from 'react';
import {Button, Card, Table, Modal, Pagination, Dropdown, Badge, FloatingLabel, Form, Alert} from "react-bootstrap";
import axios from 'axios';
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {busschedule, bus, route} from "@/components/api.jsx";
import * as z from "zod";
import {useSession} from "@/context/auth.jsx";
import {DayPicker} from "react-day-picker";
import {differenceInCalendarDays, format} from "date-fns";

function BusSchedule() {
    const [show, setShow] = useState(false);
    const [showAddSchedule, setShowAddSchedule] = useState(false);
    const [schedulesData, setSchedulesData] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const schedulesPerPage = 5;
    const [statusFilter, setStatusFilter] = useState('All');
    const [loginError, setLoginError] = useState('');
    const [selectedStartDay, setSelectedStartDay] = useState('');
    const [selectedEndDay, setSelectedEndDay] = useState('');
    const [showDatePickerStart, setShowDatePickerStart] = useState(false);
    const [showDatePickerEnd, setShowDatePickerEnd] = useState(false);
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);

    const { token } = useSession();

    const schema = z.object({
        busId: z.number().min(1, { message: 'Bus ID is Required' }),
        busRouteId: z.number().min(1, { message: 'Bus Route ID is Required' }),
        startDate: z.string().min(10, { message: 'Start Date is Required' }),
        startTime: z.string().min(4, { message: 'Start Time is Required' }),
        endDate: z.string().min(10, { message: 'End Date is Required' }),
        endTime: z.string().min(4, { message: 'End Time is Required' }),
    });

    const {register, handleSubmit, formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const scheduleData = { ...data, status: "active" }
            const response = await axios.post(busschedule, scheduleData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSchedulesData(prevSchedulesData => [...prevSchedulesData, response.data]);
            handleAddScheduleClose();
        } catch (error) {
            setLoginError(error.response.data);
        }
    };

    const onUpdate = async (data) => {
        try {
            const scheduleData = { ...data, status: "active", id: selectedSchedule.id }
            await axios.put(`${busschedule}/${selectedSchedule.id}`, scheduleData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            await fetchSchedules();
            handleClose();
        } catch (error) {
            setLoginError(error.response.data);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${busschedule}/${selectedSchedule.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const updatedSchedulesData = schedulesData.filter(schedule => schedule.id !== selectedSchedule.id);
            setSchedulesData(updatedSchedulesData);
            handleClose();
        } catch (error) {
            setLoginError(error.response.data);
        }
    };

    const handleClose = () => {
        setShow(false);
        setSelectedSchedule(null);
        setLoginError('');
        reset();
    };

    const handleShow = (schedule) => {
        reset();
        setSelectedSchedule(schedule);
        setShow(true);
    };

    const handleAddScheduleClose = () => {
        setShowAddSchedule(false);
        setLoginError('');
        reset();
    };

    const handleAddScheduleShow = () => {
        reset();
        setShowAddSchedule(true);
    };

    useEffect(() => {
        fetchSchedules();
        fetchBuses();
        fetchRoutes();
    }, []);
    const handleCancel = async () => {
        try {
            const updatedSchedule = { ...selectedSchedule, status: "cancelled" };
            await axios.put(`${busschedule}/${selectedSchedule.id}`, updatedSchedule, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Update local state with updated bus
            const updatedScheduleData = schedulesData.map(schedule =>
                schedule.id === selectedSchedule.id ? updatedSchedule : schedule
            );
            setSchedulesData(updatedScheduleData);
            handleClose();
        } catch (error) {
            console.error('Error updating bus status:', error);
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
            setSchedulesData(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
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
            console.error('Error fetching buses:', error);
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
            console.error('Error fetching buses:', error);
        }
    };

    const filteredBusSchedule = schedulesData.filter(schedule => {
        if (statusFilter === 'All') return true;
        return schedule.status === statusFilter;
    });

    const totalPages = Math.ceil(filteredBusSchedule.length / schedulesPerPage);

    const indexOfLastSchedule = currentPage * schedulesPerPage;
    const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
    const currentSchedules = filteredBusSchedule.slice(indexOfFirstSchedule, indexOfLastSchedule);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEndDayClick = (day) => {
        const formattedDate = format(day, 'yyyy-MM-dd');
        setSelectedEndDay(formattedDate);
        setShowDatePickerEnd(false);
    };
    const handleStartDayClick = (day) => {
        const formattedDate = format(day, 'yyyy-MM-dd');
        setSelectedStartDay(formattedDate);
        setShowDatePickerStart(false);
    };
    function isPastDate(date) {
        return differenceInCalendarDays(date, new Date()) < 0;
    }
    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <Card.Title>Bus Schedule</Card.Title>
                    <div className="d-flex align-items-center">
                        <Button className="mx-2" onClick={() => handleAddScheduleShow()}>Add Schedule</Button>
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
                            <th>Route</th>
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>Booked Seats</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentSchedules.map((schedule) => (
                            <tr key={schedule.id}>
                                <td>{schedule.bus?.busNumber}</td>
                                <td>{schedule.busRoute?.startLocation} - {schedule.busRoute?.endLocation}</td>
                                <td>{schedule.startDate}</td>
                                <td>{schedule.startTime}</td>
                                <td>{schedule.bookedSeats?.split(',').length}</td>
                                <td><Badge bg={schedule.status === "active" ? "success" : "danger"}>{schedule.status}</Badge></td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShow(schedule)}
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
                    <Modal.Title>Schedule Details</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onUpdate)}>
                    <Modal.Body>
                        {loginError && (
                            <Alert variant="danger" className="text-center" dismissible>
                                {loginError}
                            </Alert>
                        )}
                        <FloatingLabel controlId="bus" label="Bus Number" className="mb-3">
                            <Form.Select
                                aria-label="Select Bus"
                                {...register('busId',{ valueAsNumber: true, value: selectedSchedule?.busId })}
                            >
                                {buses.map((bus) => (
                                    <option key={bus.id} value={bus.id}>
                                        {bus.busNumber}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <span className="text-danger">{errors.busId?.message}</span>
                        <FloatingLabel controlId="busRouteId" label="Bus Route" className="mb-3">
                            <Form.Select
                                aria-label="Select Route"
                                {...register('busRouteId',{ valueAsNumber: true , value: selectedSchedule?.busRouteId })}
                            >
                                {routes.map((route) => (
                                    <option key={route.id} value={route.id}>
                                        {route.startLocation} - {route.endLocation}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <span className="text-danger">{errors.busRouteId?.message}</span>
                        <FloatingLabel
                            className="mb-3"
                            controlId="floatingInput"
                            label="Click to select Start Date">
                            <Form.Control {...register('startDate', {value: selectedSchedule?.startDate})}
                                          value={selectedStartDay}
                                          onClick={() => setShowDatePickerStart(!showDatePickerStart)}/>

                            {showDatePickerStart && (
                                <div className="datepicker-wrapper">
                                    <DayPicker
                                        mode="single"
                                        required
                                        selected={selectedStartDay}
                                        disabled={isPastDate}
                                        onSelect={handleStartDayClick}
                                    />
                                </div>
                            )}
                        </FloatingLabel>
                        <span className="text-danger">{errors.startDate?.message}</span>
                        <FloatingLabel controlId="startTime" label="Start Time" className="mb-3">
                            <Form.Control placeholder="Enter Start Time"
                                          {...register('startTime', {value: selectedSchedule?.startTime})}/>
                        </FloatingLabel>
                        <span className="text-danger">{errors.startTime?.message}</span>
                        <FloatingLabel className="mb-3" controlId="endDate" label="Click to Select End Date">
                            <Form.Control {...register('endDate', {value: selectedSchedule?.endDate})}
                                          value={selectedEndDay}
                                          onClick={() => setShowDatePickerEnd(!showDatePickerEnd)} />
                            <div className="datepicker-container">
                                {showDatePickerEnd && (
                                    <div className="datepicker-wrapper">
                                        <DayPicker
                                            mode="single"
                                            required
                                            selected={selectedEndDay}
                                            disabled={isPastDate}
                                            onSelect={handleEndDayClick}
                                        />
                                    </div>
                                )}
                            </div>
                        </FloatingLabel>
                        <span className="text-danger">{errors.endDate?.message}</span>
                        <span className="text-danger">{errors.routeNumber?.message}</span>
                        <FloatingLabel controlId="endTime" label="End Time" className="mb-3">
                            <Form.Control placeholder="Enter End Time"
                                          {...register('endTime', {value: selectedSchedule?.endTime})}/>
                        </FloatingLabel>
                        <span className="text-danger">{errors.endTime?.message}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        <Button variant="danger" onClick={handleCancel}>Cancel Schedule</Button>
                        <Button variant="primary" type="submit" className="px-4">Edit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal for adding new schedule */}
            <Modal show={showAddSchedule} onHide={handleAddScheduleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Schedule</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                        {loginError && (
                            <Alert variant="danger" className="text-center" dismissible>
                                {loginError}
                            </Alert>
                        )}
                        <FloatingLabel controlId="bus" label="Bus Number" className="mb-3">
                            <Form.Select
                                aria-label="Select Bus"
                                {...register('busId',{ valueAsNumber: true })}
                            >
                                {buses.map((bus) => (
                                    <option key={bus.id} value={bus.id}>
                                        {bus.busNumber}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <span className="text-danger">{errors.busId?.message}</span>
                        <FloatingLabel controlId="busRouteId" label="Bus Route" className="mb-3">
                            <Form.Select
                                aria-label="Select Route"
                                {...register('busRouteId',{ valueAsNumber: true })}
                            >
                                {routes.map((route) => (
                                    <option key={route.id} value={route.id}>
                                        {route.startLocation} - {route.endLocation}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        <span className="text-danger">{errors.busRouteId?.message}</span>
                        <FloatingLabel
                            className="mb-3"
                            controlId="floatingInput"
                            label="Click to select Start Date">
                            <Form.Control {...register('startDate',)}
                                value={selectedStartDay}
                                          onClick={() => setShowDatePickerStart(!showDatePickerStart)}/>

                                {showDatePickerStart && (
                                    <div className="datepicker-wrapper">
                                        <DayPicker
                                            mode="single"
                                            required
                                            selected={selectedStartDay}
                                            disabled={isPastDate}
                                            onSelect={handleStartDayClick}
                                        />
                                    </div>
                                )}
                        </FloatingLabel>
                        <span className="text-danger">{errors.startDate?.message}</span>
                        <FloatingLabel controlId="startTime" label="Start Time" className="mb-3">
                            <Form.Control placeholder="Enter Start Time"
                                          {...register('startTime')}/>
                        </FloatingLabel>
                        <span className="text-danger">{errors.startTime?.message}</span>
                        <FloatingLabel className="mb-3" controlId="endDate" label="Click to Select End Date">
                            <Form.Control {...register('endDate')}
                                          value={selectedEndDay}
                                          onClick={() => setShowDatePickerEnd(!showDatePickerEnd)} />
                            <div className="datepicker-container">
                                          {showDatePickerEnd && (
                                              <div className="datepicker-wrapper">
                                                  <DayPicker
                                                      mode="single"
                                                      required
                                                      selected={selectedEndDay}
                                                      disabled={isPastDate}
                                                      onSelect={handleEndDayClick}
                                                  />
                                              </div>
                                          )}
                            </div>
                        </FloatingLabel>
                        <span className="text-danger">{errors.endDate?.message}</span>
                        <span className="text-danger">{errors.routeNumber?.message}</span>
                        <FloatingLabel controlId="endTime" label="End Time" className="mb-3">
                            <Form.Control placeholder="Enter End Time"
                                          {...register('endTime')}/>
                        </FloatingLabel>
                        <span className="text-danger">{errors.endTime?.message}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" className="px-4">Add</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );

}

export default BusSchedule;
