import React, { useState } from 'react'
import Vehicle from './Vehicle';
import moment from 'moment'
// eslint-disable-next-line
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;


export default function AvailableVehicles(props) {
    const allVehicles = props.vehicles;
    const [vehicles, setVehicles] = useState([...allVehicles]);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [sort, setSort] = useState("rel");
    const [filter, setFilter] = useState("");
    const [category, setcategory] = useState("all");

    // Return sorted vehilce in order set
    const sorting = (type) => {
        let tempVehicle = [...allVehicles];
        if (type === 'asc') {
            tempVehicle = tempVehicle.sort(function (a, b) { return a.rent - b.rent });
        } else if (type === 'dec') {
            tempVehicle = tempVehicle.sort(function (a, b) { return a.rent - b.rent })
            tempVehicle.reverse();
        }
        return tempVehicle;
    }

    // Return on selected type vehicle in sorted order applied
    const categorize = (tempVehicles, current) => {
        if (current === 'all') return tempVehicles;
        tempVehicles = tempVehicles.filter((vehicle) => {
            return vehicle.category.toString() === current.toString();
        })
        return tempVehicles;
    }

    // Return vehicle whose name include searched keyword in applied sorted order and applied category
    const searching = (tempVehicles, type) => {
        if (type === "") return tempVehicles;
        tempVehicles = tempVehicles.filter((vehicle) => {
            return vehicle.name.toLowerCase().includes(type.toLowerCase());
        })
        return tempVehicles;
    }

    // listen to onKeyUp from user runs every time a key is pressed 
    // onChange runs after enter or when user complete entering value
    const keyUpHandler = (e) => {

        let tempVehicles = sorting(sort);
        tempVehicles = categorize(tempVehicles, category);
        tempVehicles = searching(tempVehicles, e.target.value);

        setVehicles(tempVehicles);
    }

    // listen to category changes from user
    const categoryHandler = (e) => {
        setcategory(e.target.value);

        let tempVehicles = sorting(sort);
        tempVehicles = categorize(tempVehicles, e.target.value);
        tempVehicles = searching(tempVehicles, filter);

        setVehicles(tempVehicles);
    }

    // listen to sort type from user
    const sortHandler = (e) => {
        setSort(e.target.value);

        let tempVehicle = sorting(e.target.value);
        tempVehicle = categorize(tempVehicle, category);
        tempVehicle = searching(tempVehicle, filter);

        setVehicles(tempVehicle);
    }

    // update todate and from date when use edit dates
    function filterByDate(dates) {
        setFromDate(moment(dates[0].format('DD-MM-YYYY'))._i);
        setToDate(moment(dates[1].format('DD-MM-YYYY'))._i);
    }

    return (
        <>

            <div className='container ' >
                <div className='row mt-5  bs'>
                    <div className='col-md-3 '>
                        <RangePicker format='DD-MM-YYYY' onChange={filterByDate} style={{ border: '2px solid black' }} />
                    </div>
                    <div className='col-md-3 align-self-center' >
                        <input category='text' placeholder='Search Vehicle' value={filter} onChange={(e) => { setFilter(e.target.value) }} onKeyUp={keyUpHandler} />
                    </div>
                    <div className='col-md-3 align-self-center'>
                        <select value={category} onChange={categoryHandler}>
                            <option value="all" > Vehicle category : All</option>
                            <option value="2" > Vehicle category : 2 Wheelers</option>
                            <option value="4" >Vehicle category : 4 Wheelers</option>
                        </select>
                    </div>
                    <div className='col-md-3 align-self-center'>
                        <select value={sort} onChange={sortHandler}>
                            <option value="rel">Sort By : Relevence</option>
                            <option value="asc">Rent : Low to High</option>
                            <option value="dec">Rent : High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='container '>
                <div className='row justify-content-center mt-5'>
                    <div className='col-md-9 mt-2'>
                        {
                            vehicles.length > 0 &&
                            vehicles.map((vehicle) => {
                                return <Vehicle vehicle={vehicle} toDate={toDate} fromDate={fromDate} key={(vehicle._id.toString())} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
