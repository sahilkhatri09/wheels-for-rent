import { React, useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LogContext from '../context/LogContext'
import logo from '../images/avator.jpg'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import Error from './Error'


export default function Navbar() {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { isLoggedIn, setIsLoggedIn, name, role, setRole } = useContext(LogContext);

    const logOutHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch('http://localhost:4000/api/v1/user/logout', {
                method: 'GET',
                credentials: 'include', // Don't forget to specify this if you need cookies
                headers: headers
            })

            const json = await response.json();
            setLoading(false);
            if (json.status === 'success') {
                setIsLoggedIn(false);
                setRole('user');
                setError(false);
                navigate('/');
            }
            else {
                setError(true);
            }
        } catch {
            setLoading(false);
            setError(true);
        }
    }

    return (
        <>{loading ? <Loader /> : error ? <Error /> :
            <nav className="navbar navbar-dark navbar-expand-lg fixed-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">WheelsForRent</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className=" navbar-nav me-auto mb-2 mb-lg-0">

                            {role === 'admin' && <li className="nav-item">
                                <NavLink className="nav-link" to="/bookings">Bookings</NavLink>
                            </li>}
                            {role === 'admin' &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/users">Users</NavLink>
                                </li>
                            }
                            {role === 'admin' &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/vehicles">Vehicles</NavLink>
                                </li>
                            }
                            {role === 'admin' &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/addVehicle">Add Vehicle</NavLink>
                                </li>
                            }

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                        </ul>

                        {isLoggedIn ?
                            <div className='d-flex'>
                                <div>
                                    <NavLink type="button" className="nav-link mx-2" onClick={logOutHandler}>Logout</NavLink>
                                </div>
                                <img src={logo} alt='avator' style={{ height: '40px', width: '40px' }} />
                                <div>
                                    <NavLink className="nav-link" to="/me">{name}</NavLink>
                                </div>


                            </div>
                            :
                            <div className='d-flex'>
                                <NavLink type="button" className="nav-link" to="/login">Login</NavLink>
                                <NavLink type="button" className="nav-link" to="/signup">Signup</NavLink>
                            </div>

                        }
                    </div>

                </div>

            </nav >
        }</>
    )
}
