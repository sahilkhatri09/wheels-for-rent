import LogContext from "./LogContext";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from "../components/Loader";
import Error from "../components/Error";

const LogState = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("");
    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        try {
            setLoading(true);
            const checkLogin = async () => {
                const headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                const response = await fetch('http://localhost:4000/api/v1/user/me', {
                    method: 'GET',
                    credentials: 'include', // Don't forget to specify this if you need cookies
                    headers: headers,
                })

                const json = await response.json();
                setLoading(false);
                if (json.status === 'success') {
                    setIsLoggedIn(true);
                    setName(json.data.name);
                    setRole(json.data.role);
                    setError(false);
                    navigate('/');
                }
                // else {
                //     setError(true);
                // }
            }
            checkLogin();
        } catch {
            setLoading(false);
            setError(true);
        }
        // eslint-disable-next-line
    }, []);
    return (<>{loading ? <Loader /> : error ? <Error /> :
        <LogContext.Provider value={{ isLoggedIn, setIsLoggedIn, name, setName, setRole, role }}>
            {props.children}
        </LogContext.Provider>}</>)

}

export default LogState;