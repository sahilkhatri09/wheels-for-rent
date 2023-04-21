import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LogContext from '../context/LogContext'
import Loader from './Loader';
import Error from './Error';

export default function Signup() {

    const [credentials, setCredentials] = useState({ email: "", password: "", passwordConfirm: "", name: "", licenceNo: "", phoneNo: "", gender: "male" });
    let navigate = useNavigate();
    const { setIsLoggedIn, setName, setRole } = useContext(LogContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const validate = (values) => {
        const errors = {}
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (values.name.length < 3) {
            errors.name = "Full name cannot be less than 3 characters"
        }
        if (values.phoneNo.length !== 10) {
            errors.phoneNo = "Please Enter a Valid Phone Number"
        }
        else {
            for (let i = 0; i < 10; i++) {
                if (values.phoneNo[i] >= '0' && values.phoneNo[i] <= '9') { }
                else { errors.phoneNo = "Please enter a valid phone number" }
            }
        }
        if (values.licenceNo.length < 5) {
            errors.licenceNo = "Please Enter a Valid Licence Number"
        }
        if (!regex.test(values.email)) {
            errors.email = "Please Enter a valid Email"
        }
        if (values.password.length < 8) {
            errors.password = "Password need to be atleast 8 characters"
        }
        else if (values.password != values.passwordConfirm) {
            errors.passwordConfirm = "Confirm Password and Password does not match"
        }
        console.log(errors);
        return errors;
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const err = validate(credentials)
        if (Object.keys(err).length !== 0) {
            setFormErrors(err); return;
        }
        try {
            setLoading(true);
            const response = await fetch('http://localhost:4000/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(credentials)
            })
            const json = await response.json();
            setLoading(false);
            if (json.status === 'fail') {
                console.log(json);
                const obj = {}
                obj.email = json.message;
                setFormErrors(obj);

                return;
            }
            if (json.status === 'success') {
                console.log(json.data.name);
                setIsLoggedIn(true);
                setName(json.data.name);
                setError(false);
                setRole(json.data.role);
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

    return (<>{loading ? <Loader /> : error ? <Error /> :
        <form className="container shadow" style={{ marginTop: '50px', padding: '50px', paddingBottom: '100px', marginBottom: '20px' }} onSubmit={submitHandler}>
            <h2 style={{ paddingBottom: '20px' }}>SignUp to Continue : </h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label" >Full Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} required />
                <p style={{ color: "red", fontSize: '13px' }}>{formErrors.name}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="text" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} value={credentials.email} required />
                <p style={{ color: "red", fontSize: '13px' }}>{formErrors.email}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="licenceNo" className="form-label">Licence Number</label>
                <input type="text" className="form-control" id="licenceNo" name="licenceNo" onChange={onChange} value={credentials.licenceNo} required />
                <p style={{ color: "red", fontSize: '13px' }}>{formErrors.licenceNo}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="phoneNo" className="form-label">Phone Number</label>
                <input type="text" className="form-control" id="phoneNo" name="phoneNo" onChange={onChange} value={credentials.phoneNo} required />
                <p style={{ color: "red", fontSize: '13px' }}>{formErrors.phoneNo}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} required />
                <p style={{ color: "red", fontSize: '13px' }}>{formErrors.password}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" onChange={onChange} value={credentials.passwordConfirm} required />
                <p style={{ color: "red", fontSize: '13px' }}>{formErrors.passwordConfirm}</p>
            </div>

            <div className='col-md-2' >Gender :</div>
            <div className='form-check'>

                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" id="gender1" value="male" checked={credentials.gender === "male"} onChange={onChange} style={{ borderRadius: '50%' }} />
                    <label className="form-check-label" htmlFor="gender1">Male</label>
                </div>
                <div className="form-check form-check-inline ">

                    <input className="form-check-input" type="radio" name="gender" id="gender2" value="female" checked={credentials.gender === "female"} onChange={onChange} />
                    <label className="form-check-label" htmlFor="gender2">Female</label>
                </div>
            </div>

            <div>
                <button type="submit" className="btn btn-primary my-3" style={{ float: 'right' }}>Submit</button>
            </div>
        </form>
    }</>)
}
