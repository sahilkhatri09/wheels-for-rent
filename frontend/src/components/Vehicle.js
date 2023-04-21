import { React, useContext } from 'react'
import { Link } from 'react-router-dom'
import LogContext from '../context/LogContext'
import moment from 'moment';



export default function Vehicle(props) {

    const { isLoggedIn } = useContext(LogContext);
    let isValid = true;

    // filtering vehicles that can be booked from user selected date range
    if (props.toDate != null && props.fromDate != null) {
        for (let i = 0; i < props.vehicle.currentbookings.length; i++) {
            const targetDate1 = moment(props.vehicle.currentbookings[i].fromDate, 'DD-MM-YYYY');
            const targetDate2 = moment(props.vehicle.currentbookings[i].toDate, 'DD-MM-YYYY');
            const startDate = moment(props.fromDate, 'DD-MM-YYYY');
            const endDate = moment(props.toDate, 'DD-MM-YYYY');
            if (targetDate1.isBetween(startDate, endDate) || targetDate1.isSame(startDate) || targetDate1.isSame(endDate)) {
                isValid = false
            }
            if (targetDate2.isBetween(startDate, endDate) || targetDate2.isSame(startDate) || targetDate2.isSame(endDate)) {
                isValid = false
            }
        }
    }


    return (
        isValid === true ? <>
            <div className='row shadow p-3 mb-5 bg-white rounded shadow'>
                < div className='col-md-5' >
                    <img src={props.vehicle.image[0]} className='smallimg' alt="a object " />
                </div >
                <div className='col-md-7 text-left'><b>
                    <h1>{props.vehicle.name}</h1></b>
                    <p>Capacity : {props.vehicle.capacity} liters</p>
                    <p>Rent : {props.vehicle.rent} / per day</p>
                    <p>Address : {props.vehicle.address}</p>
                    <div style={{ float: "right" }}>

                        {// showing  booking button only if user selected a date
                            // if loggin in then on click to booking screen else to login page
                        }

                        {
                            (props.toDate != null) && (props.fromDate != null) && (
                                isLoggedIn ?
                                    <Link to={`/booking/${props.vehicle._id}/${props.fromDate}/${props.toDate}`}>
                                        <button className='btn m-2'>Book Now </button>
                                    </Link>
                                    :
                                    <Link to={`/login`}>
                                        <button className='btn m-2'>Book Now </button>
                                    </Link>
                            )
                        }

                        < Link to={`/details/${props.vehicle._id}/${props.fromDate}/${props.toDate}`}>
                            <button className='btn m-2'>View Details</button>
                        </Link>

                    </div>
                </div>

            </div >

        </> : <></>)
}

