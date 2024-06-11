import Home from "../pages/home.jsx";
import Login from "../pages/login.jsx";
import Booking from "../pages/customer/booking.jsx";
import { Navigate} from "react-router-dom";
import About from "../pages/about.jsx";
import Dashboard from "../pages/admin/index.jsx";
import AppLayout from "../pages/AppLayout.jsx";
import Services from "../pages/services.jsx";
import Contact from "../pages/contact.jsx";
import ProtectedRoute from "@/routes/ProtectedRoute.jsx";
import Users from "@/pages/admin/users.jsx";
import Bus from "@/pages/admin/bus.jsx";
import BusRoutes from "@/pages/admin/busRoute.jsx";
import BusSchedule from "@/pages/admin/busSchedule.jsx";
import BookedTickets from "@/pages/admin/ticket.jsx";
import AdminDashboard from "@/pages/admin/dashboard.jsx";
import Register from "@/pages/register.jsx";
import OrderHistory from "@/pages/customer/orderHistory.jsx";
import CustomerProtectedRoute from "@/routes/CustomerProtectedRoute.jsx";
import UpdateProfile from "@/pages/customer/updateProfile.jsx";

const RouterBuilder = () => {
    const generalRoutes = [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/about",
            element: <About />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/services",
            element: <Services />,
        },
        {
            path: "/contact",
            element: <Contact />,
        },
        {
            path: '*',
            element: <Navigate to="/" replace />,
        },
    ];


    const adminRoutes = [
        {
            path: "users",
            element: <Users />,
        },
        {
            path: "bus",
            element: <Bus />,
        },
        {
            path: "bus-route",
            element: <BusRoutes/>,
        },
        {
            path: "bus-schedule",
            element: <BusSchedule/>,
        },
        {
            path: "ticket",
            element: <BookedTickets/>,
        },
        {
            path: "admin",
            element: <AdminDashboard/>,
        },
    ];

    const customerRoutes = [
        {
            path: "/order-history",
            element: <CustomerProtectedRoute><OrderHistory /></CustomerProtectedRoute>,
        },
        {
            path: "update-profile",
            element: <CustomerProtectedRoute><UpdateProfile /></CustomerProtectedRoute>,
        },
        {
            path: "/booking",
            element: <CustomerProtectedRoute><Booking /></CustomerProtectedRoute>,
        },
    ];
    const routes = [
        {
            element: <AppLayout/>,
            children: [
                ...generalRoutes,
                ...customerRoutes,
                {
                    element: <CustomerProtectedRoute/>,
                    children: customerRoutes
                }
            ]
        },
        {
            element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
            children: adminRoutes
        }
    ];

    return routes;
};

export default RouterBuilder;
