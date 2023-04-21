import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddVehicle() {

    const [credentials, setCredentials] = useState({ capacity: "", image: "", name: "", type: "", rent: "", address: "", category: "", description: "" });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/v1/vehicle/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        })


        const json = await response.json();
        console.log(json);
        if (json.status === 'success') {
            navigate('/');
        }
        else {
            alert("Cannot add vehicle");
        }
    }

    return (
        <form className="container shadow col-md-10 " style={{ marginTop: '80px' }} onSubmit={submitHandler}>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Vehicle Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} />
            </div>
            <div className="mb-3">
                <label htmlFor="capacity" className="form-label">Capacity (in liters)</label>
                <input type="Number" className="form-control" id="capacity" name="capacity" onChange={onChange} value={credentials.capacity} />

            </div>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Fuel Type (Diesel or Petrol)</label>
                <input type="text" className="form-control" id="type" name="type" onChange={onChange} value={credentials.type} />
            </div>
            <div className="mb-3">
                <label htmlFor="rent" className="form-label">Rent per day (in rupees)</label>
                <input type="text" className="form-control" id="rent" name="rent" onChange={onChange} value={credentials.rent} />
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">Image</label>
                <input type="text" className="form-control" id="image" name="image" onChange={onChange} value={credentials.images} />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Add PickUp Address : </label>
                <input type="text" className="form-control" id="addres" name="address" onChange={onChange} value={credentials.address} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">About Vehicle: </label>
                <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={credentials.description} />
            </div>
            <div className="mb-3" >
                <label htmlFor="category" className="form-label">Category (2 Wheeler or 4 Wheeler) </label>
                <input type="text" className="form-control" id="category" name="category" onChange={onChange} value={credentials.category} />
            </div>
            <div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </div>
        </form>
    )
}
