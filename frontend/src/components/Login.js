import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LogContext from '../context/LogContext'
import Loader from './Loader';
import Error from './Error';

export default function Login(props) {
    const { setIsLoggedIn, setName, setRole } = useContext(LogContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const validate = (values) => {
        const errors = {}
        // eslint-disable-next-line
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!regex.test(values.email)) {
            errors.email = "Please Enter a valid Email"
        }
        if (values.password.length < 8) {
            errors.password = "Password need to be atleast 8 characters"
        }
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate(credentials);
        if (Object.keys(err).length !== 0) {
            setFormErrors(err); return;
        }
        try {
            setLoading(true);
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch('http://localhost:4000/api/v1/user/login', {
                method: 'POST',
                credentials: 'include', // Don't forget to specify this if you need cookies
                headers: headers,
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })

            const json = await response.json();
            setLoading(false);
            if (json.status === 'fail') {
                const err = {}
                err.both = json.message;
                setFormErrors(err);
                return;
            }
            if (json.status === 'success') {
                setIsLoggedIn(true);
                setName(json.data.name);
                setRole(json.data.role);
                navigate('/');
                setError(false);
            }
            else {
                setError(true);
            }
        } catch {
            setError(true);
            setLoading(false);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const joinHandler = (e) => {
        e.preventDefault();
        navigate('/signup');
    }
    return (
        <> {loading ? <Loader />
            : error ? <Error /> :
                <div className='container shadow' style={{ marginTop: "100px", padding: '80px' }}>
                    <h2>Login to Continue : </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="text" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} value={credentials.email} required />
                            <p style={{ color: "red", fontSize: '13px' }}>{formErrors.email}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} required />
                            <p style={{ color: "red", fontSize: '13px' }}>{formErrors.password}</p>
                        </div>
                        <p style={{ color: "red", fontSize: '13px' }}>{formErrors.both}</p>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button className="btn btn-primary mx-3" onClick={joinHandler}>Signup</button>
                    </form>
                </div>
        }</>)
}
