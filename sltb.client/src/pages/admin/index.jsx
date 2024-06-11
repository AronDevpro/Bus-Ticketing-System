import {Link, Outlet} from "react-router-dom";
import SidebarNav from "../../components/Sidebar.jsx";
import {useState} from "react";
import { Sliders} from 'react-bootstrap-icons';


function Dashboard() {
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(false);
    return (
        <>
            <div className="vh-100 d-flex flex-column">
            <nav className="navbar navbar-expand-lg bg-dark" style={{ width: '100%' }}>
                <div className="container-fluid mx-lg-2">
                    <Link className="navbar-brand text-light" to="/admin">SLTB Admin Panel</Link>
                    {broken && (
                        <span className="" onClick={() => setToggled(!toggled)}><Sliders color="white"/>
                        </span> )}
                </div>
            </nav>
            <div className="d-flex flex-grow-1">
                <SidebarNav toggled={toggled} setBroken={setBroken} setToggled={setToggled}/>
                <div className="w-100 p-2 bg-light">
                    <Outlet />
                    <div className="my-3">
                        <p className="text-center">Copyright @ 2024 | Design by Arosha</p>
                    </div>
                </div>

            </div>
            </div>
        </>
    );
}

export default Dashboard;
