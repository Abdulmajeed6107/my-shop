import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getusers = async () => {

        try {
            const response = await fetch('http://localhost:3000/api/users/allusers');
            const data = await response.json();

            console.log("API response:", data);

            setUsers(data.users ?? []);

        } catch (e) {
            console.log("error getting users", e)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getusers();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (

        <div>
            <div className="d-flex justify-content-between mt-5">
                <h1>All Users</h1>
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            </div>
            {
                users.length === 0 ? (
                    <p>no users found</p>
                ) : (
                    users.map((user) => (
                        <div className="card mb-3" key={user.id}>
                            <div className="card-body">
                                <h5 className="card-title">User #{user.id}</h5>
                                <p className="card-text">Username: {user.username}</p>
                                <p className="card-text">Email:  {user.email}</p>
                                <p className="card-text">Phone: {user.phonenumber}</p>
                                <p className="card-text">Adress: {user.adress}</p>

                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}
export default GetUsers;