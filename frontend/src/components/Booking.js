import { React, useState } from 'react'
import Error from './Error'
import Loader from './Loader';

export default function Booking(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const booking = props.booking;
    const setBookings = props.setBookings;
    const bookings = props.bookings;

    async function deleteBooking(bookingId, vehicleId) {
        try {
            setLoading(true);
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch('http://localhost:4000/api/v1/booking/', {
                method: 'DELETE',
                credentials: 'include', // Don't forget to specify this if you need cookies
                headers: headers,
                body: JSON.stringify({ bookingId, vehicleId })
            })

            const json = await response.json();
            setLoading(false);
            if (json.status === "fail") {
                setShow(true);
                return;
            }
            if (json.status === 'success') {
                const tempBooking = bookings.filter((booking) => {
                    return booking._id !== bookingId
                })
                setBookings(tempBooking);
                setError(false);
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
            <div className='row justify-content-center my-5 mx-5 shadow'>
                <div className='col-md-5'>
                    <h1 style={{ textAlign: "center" }}>{booking.vehicle.name}</h1>
                    <img src={booking.vehicle.image} className='smallimg' alt="a vehicle" />
                </div>
                <div className='col-md-5 mb-5'>
                    <div style={{ textAlign: "right" }}><b><h1>Booking Details</h1></b>
                        <hr />
                        <p className='booking'>Vehicle Name : {booking.vehicle.name}</p>
                        <p className='booking'>From : {booking.fromDate}</p>
                        <p className='booking'>To : {booking.toDate}</p>
                        <p className='booking'>Amount :{booking.amount} </p>
                        <p className='booking'>Status : {booking.status}</p>
                    </div>
                    {show ? <p style={{ color: 'red', textAlign: 'right' }}>You cannot cancel this booking after 24 hours</p> :
                        <button className='btn btn-primary mt-2' style={{ float: 'right' }} onClick={() => { deleteBooking(booking._id, booking.vehicle._id) }}>Cancel Booking</button>
                    }
                </div>

            </div>
        } </>)
}
