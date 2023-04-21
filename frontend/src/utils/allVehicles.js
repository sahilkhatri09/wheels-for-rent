export const allVehicles = async (setVehicles) => {
    try {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const response = await fetch(`http://localhost:4000/api/v1/booking`, {
            method: 'GET',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: headers
        })

        const json = await response.json();
        setVehicles(json.data);

    } catch {
        console.log("Something went wrong");
    }
};