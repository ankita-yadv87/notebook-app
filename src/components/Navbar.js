import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";



const Navbar = (props) => {

    let navigate = useNavigate();
    let location = useLocation();
    
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login');

    }

    return (
        <>
            <div>
                <nav className={`navbar navbar-expand-lg bg-${props.mode === 'dark' ? 'dark' : 'light'} navbar-${props.mode === 'dark' ? 'dark' : 'light'}`}>
                    <div className="container-fluid ">
                        <Link className="navbar-brand " to="/">Welcome</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                                </li>
                            </ul>

                            {!localStorage.getItem('token') ? <form>
                                <Link className="btn btn-primary mx-1" to="/login">Login</Link>
                                <Link className="btn btn-primary mx-1" to="/signup">SignUp</Link>
                            </form> : <button className="btn btn-primary mx-1" onClick={handleLogout}> Log out </button>}

                            <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                                <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable {`${props.mode === 'dark' ? 'light' : 'dark'}`} Mode</label>
                            </div>





                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar