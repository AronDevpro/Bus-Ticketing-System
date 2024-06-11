import { useState, useEffect } from 'react';
import {
    Button,
    Card,
    Table,
    Modal,
    Pagination,
    Dropdown,
    Badge,
    Col,
    FloatingLabel,
    Form,
    Alert
} from "react-bootstrap";
import {useSession} from "@/context/auth.jsx";
import axios from 'axios';
import {users} from "@/components/api.jsx";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

function Users() {
    const [show, setShow] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const [accountTypeFilter, setAccountTypeFilter] = useState('All');
    const [loginError, setLoginError] = useState('');

    const {token} = useSession();

    const schema = z.object({
        name: z.string().min(3, { message: 'Name Required' }),
        phoneNumber: z.string().min(10, { message: 'Enter a valid mobile number' }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: 'Password must be 8 characters long' }),
        accountType: z.string().min(1, { message: 'Account Type is required' }),
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
                const userData = { ...data, status: true }
                const response = await axios.post(`${users}/register`, userData);
                setUsersData(prevUsersData => [...prevUsersData, response.data]);
                handleAddUserClose();
            } catch (error) {
                setLoginError(error.response.data);
            }
        };
    const handleClose = () => {
        setShow(false);
        setSelectedUser(null);
    };

    const handleShow = (user) => {
        setSelectedUser(user);
        setShow(true);
    };
    const handleAddUserClose = () => {
        setShowAddUser(false);
        reset();
    };

    const handleAddUserShow = () => {
        setShowAddUser(true);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(users, {
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

        fetchUsers();
    }, []);
    const handleBan = async () => {
        try {
            const updatedUser = { ...selectedUser, status: false }; // Update user status
            await axios.put(`${users}/${selectedUser.id}`, updatedUser, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Update local state with updated user
            const updatedUsersData = usersData.map(user =>
                user.id === selectedUser.id ? updatedUser : user
            );
            setUsersData(updatedUsersData);
            handleClose();
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };
    const handleActivate = async () => {
        try {
            const updatedUser = {...selectedUser, status: true}; // Update user status
            await axios.put(`${users}/${selectedUser.id}`, updatedUser, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Update local state with updated user
            const updatedUsersData = usersData.map(user =>
                user.id === selectedUser.id ? updatedUser : user
            );
            setUsersData(updatedUsersData);
            handleClose();
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    }

    const handleDelete = async () => {
        try {
            // Send a DELETE request to delete the selected user
            await axios.delete(`${users}/${selectedUser.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include authorization token if required
                    'Content-Type': 'application/json' // Set content type to JSON
                }
            });

            // Update local state to remove the deleted user
            const updatedUsersData = usersData.filter(user => user.id !== selectedUser.id);
            setUsersData(updatedUsersData);
            handleClose(); // Close the modal after successful deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const filteredUsers = usersData.filter(user => {
        if (accountTypeFilter === 'All') return true; // Show all users
        // Modify this condition as per your user status property
        return user.accountType === accountTypeFilter;
    });

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Get current users for the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <Card.Title>Users</Card.Title>
                    <div className="d-flex align-items-center">
                        <Button className="mx-2" onClick={() => handleAddUserShow()}>Add User</Button>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="filter">
                                {accountTypeFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setAccountTypeFilter('All')}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => setAccountTypeFilter('admin')}>Admins</Dropdown.Item>
                                <Dropdown.Item onClick={() => setAccountTypeFilter('customer')}>Customers</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table responsive="md" hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Account Type</th>
                            <th>NIC</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.accountType}</td>
                                <td>{user.nic}</td>
                                <td><Badge bg={user.status ? "success" : "danger"}>{user.status ? "active" : "banned"}</Badge></td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShow(user)}
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
            {/*model for user handle*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Text>Name: {selectedUser?.name}</Card.Text>
                            <Card.Text>Email: {selectedUser?.email}</Card.Text>
                            <Card.Text>Account Type: {selectedUser?.accountType}</Card.Text>
                            <Card.Text>NIC: {selectedUser?.nic}</Card.Text>
                            <Card.Text>Status: {selectedUser?.status ? "true" : "banned"}</Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    {selectedUser && (
                        <>
                            {selectedUser.status ? (
                                <Button variant="danger" onClick={handleBan}>Ban User</Button>
                            ) : (
                                <Button variant="success" onClick={handleActivate}>Activate User</Button>
                            )}
                        </>
                    )}
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

        {/*    model for creating users*/}
            <Modal show={showAddUser} onHide={handleAddUserClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    {loginError &&
                        <Alert variant="danger" className="text-center" dismissible={true}>{loginError}</Alert>}

                        <FloatingLabel controlId="name" label="Name" className="mb-3">
                            <Form.Control type="text" placeholder="Enter your name" {...register('name')} />
                        </FloatingLabel>
                        <span className="text-danger">{errors.name?.message}</span>
                        <FloatingLabel controlId="phoneNumber" label="Phone Number" className="mb-3">
                            <Form.Control type="text" placeholder="Enter your mobile number" {...register('phoneNumber')} />
                        </FloatingLabel>
                        <span className="text-danger">{errors.phoneNumber?.message}</span>
                        <FloatingLabel controlId="accountType" label="Account Type" className="mb-3">
                            <Form.Select aria-label="Select Account Type" {...register('accountType')}>
                                <option value="admin">Admin</option>
                                <option value="customer">Customer</option>
                            </Form.Select>
                        </FloatingLabel>
                        <span className="text-danger">{errors.accountType?.message}</span>
                        <FloatingLabel controlId="email" label="Email address" className="mb-3">
                            <Form.Control type="email" placeholder="Enter your email address" {...register('email')} />
                        </FloatingLabel>
                        <span className="text-danger">{errors.email?.message}</span>
                        <FloatingLabel controlId="password" label="Password">
                            <Form.Control type="password" placeholder="Enter your password" {...register('password')} />
                        </FloatingLabel>
                        <span className="text-danger">{errors.password?.message}</span>


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

export default Users;
