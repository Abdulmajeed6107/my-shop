import { useState } from 'react'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [userdata, setUserdata] = useState();

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const userLogin = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/admin/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            // setUserdata(data);

            if (data.status) {
                alert(data.message);

                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);

                // Also save user_id separately (Important for Cart)
                if (data.user.id) {
                    localStorage.setItem("user_id", data.user.id);
                }

                console.log("User logged in successfully. User ID:", data.user.id);
                navigate("/dashboard");
            } else {
                alert(data.message);
            }

        } catch (e) {
            console.error("Login error:", e);
            alert("Something went wrong. Please try again.")
        }
    }

    return (
        <>

            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-8 justify-content-center mt-3">
                        <div className="card p-4 w-75"  >

                            <h1 className="text-center mb-3">Admin Sign In</h1>
                            {/* from starts from here  */}
                            <form action="" onSubmit={userLogin}>
                                <div>
                                    <input type="text" className="form-control mb-3 p-3" required
                                        name="" id=""
                                        placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />

                                </div>
                                <div className="d-flex align-items-center  position-relative">
                                    <input type={showPassword ? "text" : "password"} className="form-control mb-3 p-3"
                                        name="" id="" required
                                        placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} />
                                    <i className={showPassword ? "bi bi-eye-fill p-2 position-absolute end-0 mb-2" : "bi bi-eye-slash-fill p-2 position-absolute end-0 mb-2"} onClick={() => setShowPassword(!showPassword)} ></i>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className='d-flex gap-3 align-items-center'>
                                        <input type="checkbox" className="form-check"
                                            value={password}
                                        /> Remember me

                                    </div>
                                    <div>
                                        <button className="btn">Forgot Password</button>

                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button className="btn mybtn-color rounded-pill  w-75 p-2 mt-3 " type='submit' >Login</button>

                                </div>
                            </form>
                            <div className='text-center align-items-center mt-3 '>
                                don't have acount?
                                <button className='btn' onClick={() => navigate("/admin/register")}>Register</button>

                            </div>

                        </div>





                    </div>
                </div>

            </div>
        </>
    )
}