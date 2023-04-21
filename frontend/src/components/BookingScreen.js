import moment from 'moment';
import { React, useEffect, useState, useContext } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate, } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import LogContext from '../context/LogContext'
import Loader from './Loader';
import Error from './Error'


export default function BookingScreen(match) {
    const { name } = useContext(LogContext);
    const { vehicleId, fromDate, toDate } = useParams();
    const [vehicle, setVehicle] = useState({});
    const [isLoading, setLoding] = useState(true);
    const [error, setError] = useState(false);


    const date1 = moment(fromDate, 'DD-MM-YYYY');
    const date2 = moment(toDate, 'DD-MM-YYYY');
    const tdays = date2.diff(date1, 'days') + 1;
    const navigate = useNavigate();

    const getVehicle = async () => {
        try {
            setLoding(true);
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch(`http://localhost:4000/api/v1/vehicle/${vehicleId}`, {
                method: 'GET',
                credentials: 'include', // Don't forget to specify this if you need cookies
                headers: headers,
            })
            const json = await response.json();

            setLoding(false);
            if (json.status === 'success') {
                setVehicle(json.data);
                setError(false);
            }
            else {
                setError(true);
            }
        } catch (e) {
            setLoding(false);
            setError(true);
        }
    }
    useEffect(() => {
        getVehicle();
        // eslint-disable-next-line 
    }, [])

    const onToken = async () => {
        try {
            setLoding(true);
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch(`http://localhost:4000/api/v1/booking/${vehicleId}`, {
                method: 'POST',
                credentials: 'include', // Don't forget to specify this if you need cookies
                headers: headers,
                body: JSON.stringify({ fromDate, toDate, amount: tdays * (vehicle.rent) })
            })

            const json = await response.json();
            setLoding(false);
            if (json.status === "success") {
                setError(false);
                navigate('/me');
            }
            else {
                setError(true);
            }
        } catch {
            setLoding(false);
            setError(true);
        }
    }
    return isLoading ? <Loader /> : error ? <Error /> : <>
        <div className='row justify-content-center  mx-5 shadow' style={{ marginTop: '70px' }}>
            <div className='col-md-5'>
                <h1 style={{ textAlign: "center" }}>{vehicle.name}</h1>
                <img src={vehicle.image} className='bigimg' alt="a object" />
            </div>
            <div className='col-md-5'>
                <div style={{ textAlign: "right" }}><b><h1>Booking Details</h1></b>
                    <hr />
                    <p>Name :{name} </p>
                    <p>From Date : {fromDate}</p>
                    <p>To Date : {toDate}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                    <h1>Amount </h1>
                    <hr />
                    <p>Total days :{tdays} </p>
                    <p>Rent per day :{vehicle.rent} </p>
                    <p>Total Amount : {vehicle.rent * tdays}</p>
                </div>

                <div>

                    <StripeCheckout
                        amount={vehicle.rent * tdays * 100}
                        token={onToken} currency='INR'
                        stripeKey="pk_test_51MxXRxSCKby4Z5klBOUgBowpbA9DMFfLbVTVSIBnGhr21TRyG4zbTFxvR5YsWiaejqRH6QT1yliyhs87XHce37Gu00E784yT50"


                    >
                        <button className='btn' style={{ float: "right" }}>Pay Now</button>
                    </StripeCheckout>

                </div>
            </div>
        </div>
        <div className='container '>
            <p style={{ fontSize: '15px', textAlign: 'end' }}><span style={{ color: 'red' }}>!important </span>You can cancel your booking within 24 hours of booking time</p>

        </div>
    </>

}
