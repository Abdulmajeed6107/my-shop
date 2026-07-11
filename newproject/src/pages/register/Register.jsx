import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {

    const navigate = useNavigate();


    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const [username, setUserName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');


    const [phonenumber, setPhonenumber] = useState('');

    const [adress, setAdress] = useState('');

    const [postalcode, setPostalcode] = useState('');
    const [userdata, setUserData] = useState('');
    const [showpassword, setShowpassword] = useState(false);
    const [showpassword2, setShowpassword2] = useState(false);


    const userRegister = async (e) => {
        e.preventDefault(); // stop page reload

        if (password !== confirmpassword) {
            alert("password do not match");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    username,
                    email,
                    password,
                    phonenumber,
                    adress,
                    postalcode,
                })
            });
            const data = await response.json();
            console.log("response:", data);

            if (response.ok) {
                alert("User Registered Successfully");

                //  redirect to login
                navigate("/login");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (err) {

        }
    }


    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-8 justify-content-center mt-3">
                        <div className="card p-4 w-75"  >

                            <h1 className="text-center mb-3">Create Account</h1>
                            {/* from starts from here  */}
                            <form onSubmit={userRegister}>
                                <input type="text" className="form-control mb-3 p-3" required
                                    name="" id=""
                                    placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}

                                />
                                <input type="text" className="form-control mb-3 p-3" required
                                    name="" id=""
                                    placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}

                                />
                                <input type="text" className="form-control mb-3 p-3" required
                                    name="" id=""
                                    placeholder="User Name" onChange={(e) => setUserName(e.target.value)}

                                />
                                <div>
                                    <input type="text" className="form-control mb-3 p-3" required
                                        name="" id=""
                                        placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)}

                                    />

                                </div>
                                <div className="d-flex align-items-center position-relative">
                                    <input type={showpassword ? "text" : "password"} className="form-control mb-3 p-3 "
                                        name="" id="" required
                                        placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} />
                                    <i className={showpassword ? "bi bi-eye-fill position-absolute end-0 mb-3 pe-3" : "bi bi-eye-slash-fill position-absolute end-0 mb-3 pe-3"} onClick={() => setShowpassword(!showpassword)}></i>
                                </div>
                                <div className="d-flex align-items-center position-relative">
                                    <input type={showpassword2 ? "text" : "password"} className="form-control mb-3 p-3"
                                        name="" id="" required
                                        placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                        <i className={showpassword2? "bi bi-eye-fill position-absolute end-0 mb-3 pe-3" : "bi bi-eye-slash-fill position-absolute end-0 mb-3 pe-3"} onClick={()=> setShowpassword2(!showpassword2)}></i>
                                </div>

                                <input type="text" className="form-control mb-3 p-3"
                                    name="" id="" required
                                    placeholder="Enter your Phone Number" onChange={(e) => setPhonenumber(e.target.value)} />
                                <input type="text" className="form-control mb-3 p-3"
                                    name="" id="" required
                                    placeholder="Enter Your Adress" onChange={(e) => setAdress(e.target.value)} />
                                <input type="text" className="form-control mb-3 p-3"
                                    name="" id="" required
                                    placeholder="Enter Postal Code" onChange={(e) => setPostalcode(e.target.value)} />
                                <div className="d-flex justify-content-between">
                                    <div className='d-flex gap-3 align-items-center'>
                                        <input type="checkbox" className="form-check"

                                        /> Accept All Terms and Conditions

                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button className="btn mybtn-color rounded-pill  w-75 p-2 mt-3 " type='submit'>Create Account</button>

                                </div>
                            </form>
                            <div className='text-center align-items-center mt-3 '>
                                Already have acount?
                                <button className='btn' onClick={() => navigate("/login")}>Login</button>

                            </div>

                        </div>





                    </div>
                </div>

            </div>
        </>
    )
}