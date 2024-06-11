import  {useEffect, useState} from 'react';
import axios from "axios";
import { users} from "@/components/api.jsx";
import Container from "react-bootstrap/Container";
import {Alert, Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSession} from "@/context/auth.jsx";
import Loading from "@/components/Loading.jsx";
import {Bounce, toast, ToastContainer} from "react-toastify";

function UpdateProfile() {
    const [userData, setUserData] = useState([]);
    const [loginError, setLoginError] = useState();
    const { user, token } = useSession();
    const [loading, setLoading] = useState(true);
    const schema = z.object({
        name: z.string().min(3, { message: 'Name Required' }),
        phoneNumber: z.string().min(10, { message: 'Enter a valid mobile number' }),
        nic: z.string().min(9, { message: 'Enter a valid nic number' }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().optional(),
    });

    const {register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: zodResolver(schema),
    });
    const onUpdate = async (data) => {
        if (!data.password){
            const updatedData= {...userData, name:data.name, phoneNumber:data.phoneNumber, nic:data.nic,email:data.email}
            try {
                await axios.put(`${users}/${user.accountId}`, updatedData,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('User Updated Successfully', {
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
            } catch (error) {
                setLoginError(error.response.data);
            }
        } else{
            const updatedData= {...userData, name:data.name, phoneNumber:data.phoneNumber, nic:data.nic,email:data.email, password:data.password}
            try {
                await axios.put(`${users}/${user.accountId}`, updatedData,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('User Updated Successfully', {
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
            } catch (error) {
                setLoginError(error.response.data);
            }
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${users}/${user.accountId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const usersData = response.data;
                setUserData(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false); // Set loading to false whether request succeeds or fails
            }
        };

        fetchUsers();
    }, []);
    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
            <Row xs={12} md={8} lg={3} className="justify-content-center">
            <Col className="my-3">
                <ToastContainer/>
            <Form onSubmit={handleSubmit(onUpdate)}>
            {loginError &&
                <Alert variant="danger" className="text-center" dismissible={true}>{loginError}</Alert>}
            <FloatingLabel controlId="name" label="Name" className="mb-3">
                <Form.Control type="text" placeholder="Enter your name" {...register('name', {value: userData?.name})} />
                <span className="text-danger">{errors.name?.message}</span>
            </FloatingLabel>
            <FloatingLabel controlId="phoneNumber" label="Phone Number" className="mb-3">
                <Form.Control type="text" placeholder="Enter your mobile number" {...register('phoneNumber', {value: userData?.phoneNumber})} />
                <span className="text-danger">{errors.phoneNumber?.message}</span>
            </FloatingLabel>
            <FloatingLabel controlId="nic" label="Nic" className="mb-3">
                <Form.Control type="text" placeholder="Enter your NIC Number" {...register('nic', {value: userData?.nic})} />
                <span className="text-danger">{errors.phoneNumber?.message}</span>
            </FloatingLabel>
            <FloatingLabel controlId="email" label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="Enter your email address" {...register('email', {value: userData?.email})} />
                <span className="text-danger">{errors.email?.message}</span>
            </FloatingLabel>
            <FloatingLabel controlId="password" label="Password" className="mb-3">
                <Form.Control type="password" placeholder="Enter your password" {...register('password')} />
                <span className="text-danger">{errors.password?.message}</span>
            </FloatingLabel>
        <Button variant="primary" type="submit" className="px-4 col-12">Add</Button>
        </Form>
            </Col>
            </Row>
            )}
        </Container>
    );
}

export default UpdateProfile;
