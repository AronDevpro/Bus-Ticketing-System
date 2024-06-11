import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Dropdown, Form, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSession} from "@/context/auth.jsx";

function TopNavbar() {
    const {user, logout} = useSession();
    const handleLogout = () => {
        logout();
    };
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="px-0 py-3" data-bs-theme="dark">
                <Container>
                    {/* Logo */}
                    <Navbar.Brand as={Link} to="/"><Image width={180} height={80} src="src/assets/logo.png"/></Navbar.Brand>
                    {/* Navbar toggle */}
                    <Navbar.Toggle aria-controls="navbarCollapse" />
                    {/* Collapse */}
                    <Navbar.Collapse id="navbarCollapse">
                        {/* Nav */}
                        <Nav className="mx-lg-auto justify-content-center align-items-center">
                            <Nav.Link className="" as={Link} to="/">Home</Nav.Link>
                            <Nav.Link className="" as={Link} to="/about">About</Nav.Link>
                            <Nav.Link className="" as={Link} to="/services">Services</Nav.Link>
                            <Nav.Link className="text-light" as={Link} to="/booking">Vacancy</Nav.Link>
                            <Nav.Link as={Link} className="text-light" to="/contact">Contact Us</Nav.Link>
                        </Nav>
                        {/* Right navigation */}
                        <Nav className="ms-lg-4">
                            <Form.Control type="text" placeholder="Search" className="me-2 mb-3 mb-lg-0" aria-label="Search"/>
                            <Button variant="outline-primary">Search</Button>
                        </Nav>
                        {/* Action */}
                        <Nav className="mx-3 my-3 ">
                            <Button as={Link} to="/booking" className="mx-2 my-2 my-lg-0" variant="outline-primary">Booking</Button>
                            {user && user.accountType === 'admin' && <Button  as={Link} to="/admin">Admin</Button>}
                            {user && user.accountType === 'customer' &&
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic" className="col-12">
                                        Account
                                    </Dropdown.Toggle>
                                    {/*<Button as={Link} to="/login">Account</Button>*/}
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/order-history">Order History</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="update-profile">Update Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>}
                            {!user && <Button as={Link} to="/login">Login</Button>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default TopNavbar;
