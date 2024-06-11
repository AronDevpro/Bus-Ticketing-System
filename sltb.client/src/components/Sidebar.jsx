import {Sidebar, Menu, MenuItem, sidebarClasses} from 'react-pro-sidebar';
import {Link} from 'react-router-dom';
import {useSession} from "@/context/auth.jsx";
import { Speedometer2, People, BusFront , TicketDetailed, Calendar2Check, GeoAlt, BoxArrowLeft} from 'react-bootstrap-icons';

function SidebarNav({ setBroken ,toggled, setToggled }) {
    const { logout } = useSession();
    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <Sidebar backgroundColor="#212529" onBreakPoint={setBroken} toggled={toggled} onBackdropClick={() => setToggled(false)} breakPoint="md"
                     rootStyles={{
                         [`.${sidebarClasses.container}`]: {
                             color: "white",

                         },
                     }}>
                <Menu menuItemStyles={{
                        button: {
                            [`&.active`]: {
                                backgroundColor: '#e12a7d',
                                color: '#080809',
                            },
                            '&:hover': {
                                color: 'black',
                            },
                        },
                    }}
                >
                    <MenuItem component={<Link to="/admin" />} icon={<Speedometer2 />}> Dashboard</MenuItem>
                    <MenuItem component={<Link to="users" />} icon={<People />}> Users</MenuItem>
                    <MenuItem component={<Link to="bus" />} icon={<BusFront/>}> Bus</MenuItem>
                    <MenuItem component={<Link to="bus-route" />} icon={<GeoAlt/>}> Bus Route</MenuItem>
                    <MenuItem component={<Link to="bus-schedule" />} icon={<Calendar2Check/>}> Bus Schedule</MenuItem>
                    <MenuItem component={<Link to="ticket" />} icon={<TicketDetailed/>}> Booked Tickets</MenuItem>
                    <MenuItem className="position-absolute bottom-0 border-top" style={{ marginTop: 'auto' }} onClick={handleLogout} icon={<BoxArrowLeft/>}> Signout</MenuItem>
                </Menu>
            </Sidebar>
            </>
    );
}

export default SidebarNav;
