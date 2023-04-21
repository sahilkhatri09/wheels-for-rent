import { React, useState, useEffect } from 'react'
import Loader from './Loader';
import Error from './Error';
export default function AllBookings() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        try {
            setLoading(true);
            const getBookings = async () => {
                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                const response = await fetch('http://localhost:4000/api/v1/admin/booking', {
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
            getBookings();
        } catch {
            setLoading(false);
            setError(true);
        }
    }, [])
    return (
        <>{
            loading ? <Loader /> : error ? <Error /> :
                <div className=' d-flex justify-content-between row mt-5' >{
                    bookings.length > 0 && bookings.map(booking => {
                        return <div className='row col-md-6  mt-5 shadow'>
                            <div className='col-md-4'>
                                <h1 style={{ textAlign: "center" }}>{booking.vehicle.name}</h1>
                                <img src={booking.vehicle.image} className='smallimg' alt="a vehicle" />
                            </div>
                            <div className='col-md-7'>
                                <div style={{ textAlign: "right" }}><b><h1>Booking Details</h1></b>
                                    <hr />
                                    <p className='booking'>User Name : {booking.user.name}</p>
                                    <p className='booking'>User Email : {booking.user.email}</p>

                                    <p className='booking'>From : {booking.fromDate}</p>
                                    <p className='booking'>To : {booking.toDate}</p>
                                    <p className='booking'>Amount :{booking.amount} </p>
                                    <p className='booking'>Status : {booking.status}</p>
                                    <p className='booking'>Vehicle Id: {booking.vehicle._id}</p>

                                </div>
                            </div>

                        </div>
                    })
                }</div>
        }</>
    )
}
