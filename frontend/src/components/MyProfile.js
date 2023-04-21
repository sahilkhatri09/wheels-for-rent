import React, { useState, useEffect } from 'react'
import logo from '../images/avator.jpg'
import Loader from './Loader';
import Error from './Error'
import Booking from './Booking';


export default function MyProfile() {
    const [user, setUser] = useState("");
    const [bookings, setBookings] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);
            const getProfile = async () => {
                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                const response = await fetch('http://localhost:4000/api/v1/user/me', {
                    method: 'GET',
                    credentials: 'include', // Don't forget to specify this if you need cookies
                    headers: headers,
                })
                const json = await response.json();

                setLoading(false);
                if (json.status === 'success') {
                    setUser(json.data);
                    setError(false);
                }
                else {
                    setError(true);
                }
            }
            getProfile();
        } catch {
            setLoading(false);
            setError(true);

        }
    }, []);

    useEffect(() => {
        try {
            setLoading(true);
            const getBooking = async () => {
                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                const response = await fetch('http://localhost:4000/api/v1/user/bookings', {
                    method: 'GET',
                    credentials: 'include', // Don't forget to specify this if you need cookies
                    headers: headers,
                })

                const json = await response.json();
                setLoading(false);
                if (json.status === 'success') {
                    setBookings(json.data);
                    setError(false);
                }
                else {
                    setError(true);
                }
            }
            getBooking();
        } catch {
            setLoading(false);
            setError(true);

        }
    }, [])

    return (
        <>
            {loading ? <Loader /> : error ? <Error /> :
                <>
                    <div className='container  justify-content-around row mt-5'>
                        <div className='col-md-8 shadow mt-3 mb-4'>
                            <div className='row'>
                                <div className='col-md-4' >
                                    <img src={logo} style={{ height: '250px' }} alt="an logo" />
                                </div>
                                <div className='col-md-5 ' >
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

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='container' style={{ width: "100%", textAlign: 'center', fontSize: '30px', fontWeight: '5' }}>My Bookings : </div>

                    {bookings.length > 0 && bookings.map((booking) => {
                        return booking.status === 'booked' && <Booking booking={booking} setBookings={setBookings} bookings={bookings} />
                    })}

                </>
            }
        </>
    )
}
