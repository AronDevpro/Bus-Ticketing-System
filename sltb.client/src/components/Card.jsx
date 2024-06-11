import { useState} from 'react';
import {Col, Row, Container, Form, Button, Card, Alert} from "react-bootstrap";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {busschedule, ticket, transaction} from "@/components/api.jsx";
import {useSession} from "@/context/auth.jsx";
import {useNavigate} from "react-router-dom";
import {Bounce, toast, ToastContainer} from "react-toastify";

function CardComponent({orderDetails, ticketDetails}) {
    const { token } = useSession();
    const [error,setError] = useState(false);
    const navigate = useNavigate();

    const schema = z.object({
        cardNumber: z.number({
            required_error: "Card Number is required",
            invalid_type_error: "Card Number must be a number",
        }).min(16),
        monthYear: z.number({
            required_error: "Month Year is required",
            invalid_type_error: "Month Year must be a number",
        }).min(4),
        cvv: z.number({
            required_error: "cvv is required",
            invalid_type_error: "cvv must be a number",
        }).min(3),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schema),
    });
    const onSubmit = async () => {
        try {
            // Fetch bus schedule information using busScheduleId
            const busScheduleResponse = await axios.get(`${busschedule}/${orderDetails.BusScheduleId}`);

            // Check if the bus schedule already has seat numbers
            let existingSeatNumbers = busScheduleResponse.data?.bookedSeats || [];
            if (existingSeatNumbers.length>1) {
                existingSeatNumbers = existingSeatNumbers.replace(/[\[\]'" ]/g, '').split(',');
            }

            // Combine existing seat numbers with new seat numbers while ensuring no duplicates
            const updatedSeatNumbers = Array.from(new Set([...existingSeatNumbers, ...orderDetails.seatNumber]));
            const bookedSeatsString = updatedSeatNumbers.join(',');
            const currDate = new Date().toLocaleDateString();
            const currTime = new Date().toLocaleTimeString();
            const currentDateTime = `${currDate} ${currTime}`;

            const transactionData = {...ticketDetails, paymentMode:"Credit-Card", status: "Completed", transactionDateTime: currentDateTime }
            const response = await axios.post(transaction, transactionData);

            const ticketData = {...orderDetails, transactionId: response.data.id, status:"completed"}
            await axios.post(ticket, ticketData);
            // Update bus schedule with updated seat numbers
            const updatedScheduleData = {...busScheduleResponse.data, bookedSeats: bookedSeatsString};
            await axios.put(`${busschedule}/${orderDetails.BusScheduleId}`, updatedScheduleData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            reset();
            toast.success('Booking Has been Successfully', {
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
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error) {
            console.log(error)
            setError(true);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <ToastContainer/>
            <Card xs={12} md={5} className="p-3">
            <Form onSubmit={handleSubmit(onSubmit)}>
                {error &&
                    <Alert variant="danger" className="text-center" dismissible={true}>Something went wrong. Try Again...</Alert>}
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="cardNumber">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control placeholder="eg: 4899 0033 1022 1002" {...register('cardNumber',{valueAsNumber:true})}/>
                        {errors.cardNumber && <span className="text-danger">{errors.cardNumber.message}</span>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="monthYear">
                        <Form.Label>Month/Year</Form.Label>
                        <Form.Control placeholder="11/25" {...register('monthYear',{valueAsNumber:true})}/>
                        {errors.monthYear && <span className="text-danger">{errors.monthYear.message}</span>}
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="cvv">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control placeholder="123" {...register('cvv',{valueAsNumber:true})}/>
                        {errors.cvv && <span className="text-danger">{errors.cvv.message}</span>}
                    </Form.Group>
                </Col>
            </Row>
            <Button type="submit" className="col-12">Pay</Button>
            </Form>
            </Card>
        </Container>
    );
}

export default CardComponent;
