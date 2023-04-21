import { React, useEffect, useState } from 'react'
import AvailableVehicles from './AvailableVehicles';
import Loader from './Loader';
import Error from './Error'

export default function Home() {

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const vehicleHandler = async () => {
        try {
            setLoading(true);

            // Fetching all available
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            const response = await fetch(`http://localhost:4000/api/v1/vehicle`, {
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
    }, []);

    return (<>{loading ? <Loader /> : error ? <Error /> :
        <AvailableVehicles vehicles={vehicles} />
    }</>
    )
}
