import { React, useEffect, useState } from 'react'
import AvailableVehicles from './AvailableVehicles';
import Loader from './Loader';
import Error from './Error'
import Vehicle from './Vehicle';

export default function AllVehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(false);


    const vehicleHandler = async () => {
        try {
            setLoading(true);

            // Fetching all available
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch(`http://localhost:4000/api/v1/admin/vehicle`, {
                method: 'GET',
                credentials: 'include', // Don't forget to specify this if you need cookies
                headers: headers
            })
            const json = await response.json();
            setLoading(false);
            if (json.status === 'success') {
                setVehicles(json.data);
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
    useEffect(() => {
        vehicleHandler();
        // eslint-disable-next-line
    }, [update]);

    const deleteVehicle = async (id) => {
        try {
            setLoading(true);
            setUpdate(false);
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch(`http://localhost:4000/api/v1/admin/vehicle/${id}`, {
                method: 'DELETE',
                credentials: 'include', // Don't forget to specify this if you need cookies
                headers: headers
            })
            const json = await response.json();
            setLoading(false);
            console.log(json);
            if (json.status === 'success') {
                setError(false);
                setUpdate(true);
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
        <>{
            loading ? <Loader /> : error ? <Error /> : <div className='d-flex justify-content-around row'>{
                vehicles.length > 0 && vehicles.map(vehicle => {
                    console.log(vehicle);
                    return <div className=' col-md-5 row shadow ' style={{ marginTop: '70px' }}>
                        < div className='col-md-5' >
                            <img src={vehicle.image[0]} className='smallimg' alt="a object " />
                        </div >
                        <div className='col-md-7' style={{ textAlign: 'right', height: 'auto' }}><b>
                            <h1>{vehicle.name}</h1></b>
                            <p>Capacity : {vehicle.capacity} liters</p>
                            <p>Rent : {vehicle.rent} / per day</p>
                            <p>Address : {vehicle.address}</p>
                            <p>Available : {vehicle.available ? "true" : "false"}</p>
                            <button className='btn mb-3' onClick={() => deleteVehicle(vehicle._id)}>Change Availablity</button>
                        </div>
                    </div>
                })
            }</div>
        }</>
    )
}
