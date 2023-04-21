import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Error from './Error'
import Loader from './Loader';


export default function VehicleDetails() {
    const { vehicleId, fromDate, toDate } = useParams();
    const isValid = (fromDate === "undefined" || toDate === "undefined") ? false : true;
    const [vehicle, setVehicle] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const getVehicle = async () => {
        try {
            setLoading(true);

            // getting the vehicle details from id
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch(`http://localhost:4000/api/v1/vehicle/${vehicleId}`, {
                method: 'GET',
                credentials: 'include', // Don't forget to specify this if you need cookies
                headers: headers,
            })
            const json = await response.json();

            setLoading(false);
            if (json.status === 'success') {
                setError(false);
                setVehicle(json.data);
            }
            else {
                setError(true);
            }
        } catch (e) {
            setError(true);
            setLoading(false);
        }
    }
    useEffect(() => {
        getVehicle();
        // eslint-disable-next-line 
    }, [])
    return (
        loading ? <Loader /> :
            error ? <Error /> :
                <div className='row justify-content-center my-5 mx-5 shadow'>
                    <div className='col-md-6'>
                        <h1 style={{ textAlign: "center" }}>{vehicle.name}</h1>
                        <img src={vehicle.image} className='bigimg' alt="a object" />
                    </div>
                    <div className='col-md-6'>
                        <div style={{ textAlign: "left" }}><b><h1>Vehicle Details</h1></b>
                            <hr />
                            <p><span>Rent  : </span>{vehicle.rent}/per Day</p>
                            <p><span>Fuel Type :</span>{vehicle.type} </p>
                            <p><span>Fuel Capacity :</span>{vehicle.capacity}liters </p>
                            <p><span>Pick Up Address :</span>{vehicle.address} </p>
                            <p><span>About Vehicle:</span>{vehicle.description} </p>
                        </div>
                        {isValid ?
                            <Link to={`/booking/${vehicle._id}/${fromDate}/${toDate}`}>
                                <button className='btn m-2'>Book Now </button>
                            </Link> : <p style={{ color: "red" }}>Select date to book</p>
                        }
                        <Link to={`/`}>
                            <button className='btn m-2'>Back to Home </button>
                        </Link>
                    </div>
                </div>
    )
}
