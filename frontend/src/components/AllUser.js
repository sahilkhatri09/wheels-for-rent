import { React, useState, useEffect } from 'react'
import Loader from './Loader';
import Error from './Error';
import logo from '../images/avator.jpg'

export default function AllUser() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        try {
            setLoading(true);
            const getBookings = async () => {
                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                const response = await fetch('http://localhost:4000/api/v1/admin/user', {
                    method: 'GET',
                    credentials: 'include', // Don't forget to specify this if you need cookies
                    headers: headers,
                })

                const json = await response.json();
                setLoading(false);
                console.log(json);
                if (json.status === 'success') {
                    setUsers(json.data);
                    setError(false);
                }
                else {
                    setError(true);
                }
            }
            getBookings();
        } catch {
            setLoading(false);
            setError(true);
        }
    }, [])
    return (
        <>{
            loading ? <Loader /> : error ? <Error /> :
                <div className='d-flex justify-content-between row mt-5'>{
                    users.length > 0 && users.map(user => {
                        return <div className='col-md-6'>
                            <div className='col-md-12 shadow mt-3 mb-4'>
                                <div className='row'>
                                    <div className='col-md-4' >
                                        <img src={logo} style={{ height: '250px' }} alt="an logo" />
                                    </div>
                                    <div className='col-md-6 ' style={{ textAlign: 'right' }}>
                                        <p>
                                            Name :  {user.name}
                                        </p>
                                        <p>
                                            Gender : {user.gender}
                                        </p>
                                        <p>
                                            PhoneNo : {user.phoneNo}
                                        </p>
                                        <p>
                                            Email :{user.email}
                                        </p>
                                        <p>
                                            LicenceNo :{user.licenceNo}
                                        </p>
                                        <p>
                                            Role :{user.role}
                                        </p>

                                    </div>
                                </div>
                            </div>

                        </div>

                    })
                }</div>
        }</>
    )
}
