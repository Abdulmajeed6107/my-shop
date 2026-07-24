import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../login/login.css";
import MyNavbar from '../../components/Navbarcustom';
import TopHeader from '../../components/TopHeader';
import Footer from '../../components/Footer';

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
    const [showpassword, setShowpassword] = useState(false);
    const [showpassword2, setShowpassword2] = useState(false);

    const userRegister = async (e) => {
        e.preventDefault();

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
                navigate("/login");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (err) {
            console.error("Registration error:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <TopHeader />
            <MyNavbar />

            <section className="auth-page auth-page-register">
                <div className="auth-page-container">
                    <div className="auth-card">
                        <div className="auth-card-header">
                            <h1>Create Account</h1>
                            <p>Join us and start shopping your favorite fashion items.</p>
                        </div>

                        <form onSubmit={userRegister}>
                            <div className="auth-form-row">
                                <div className="auth-field">
                                    <label htmlFor="register-firstname">First Name</label>
                                    <input
                                        type="text"
                                        id="register-firstname"
                                        className="form-control"
                                        required
                                        placeholder="First name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        value={firstname}
                                    />
                                </div>
                                <div className="auth-field">
                                    <label htmlFor="register-lastname">Last Name</label>
                                    <input
                                        type="text"
                                        id="register-lastname"
                                        className="form-control"
                                        required
                                        placeholder="Last name"
                                        onChange={(e) => setLastName(e.target.value)}
                                        value={lastname}
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="register-username">Username</label>
                                <input
                                    type="text"
                                    id="register-username"
                                    className="form-control"
                                    required
                                    placeholder="Choose a username"
                                    onChange={(e) => setUserName(e.target.value)}
                                    value={username}
                                />
                            </div>

                            <div className="auth-field">
                                <label htmlFor="register-email">Email</label>
                                <input
                                    type="email"
                                    id="register-email"
                                    className="form-control"
                                    required
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            <div className="auth-form-row">
                                <div className="auth-field">
                                    <label htmlFor="register-password">Password</label>
                                    <div className="auth-password-field">
                                        <input
                                            type={showpassword ? "text" : "password"}
                                            id="register-password"
                                            className="form-control"
                                            required
                                            placeholder="Create password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                        <button
                                            type="button"
                                            className="auth-toggle-password"
                                            onClick={() => setShowpassword(!showpassword)}
                                            aria-label={showpassword ? "Hide password" : "Show password"}
                                        >
                                            <i className={showpassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="auth-field">
                                    <label htmlFor="register-confirm-password">Confirm Password</label>
                                    <div className="auth-password-field">
                                        <input
                                            type={showpassword2 ? "text" : "password"}
                                            id="register-confirm-password"
                                            className="form-control"
                                            required
                                            placeholder="Confirm password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            value={confirmpassword}
                                        />
                                        <button
                                            type="button"
                                            className="auth-toggle-password"
                                            onClick={() => setShowpassword2(!showpassword2)}
                                            aria-label={showpassword2 ? "Hide password" : "Show password"}
                                        >
                                            <i className={showpassword2 ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="auth-form-row">
                                <div className="auth-field">
                                    <label htmlFor="register-phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="register-phone"
                                        className="form-control"
                                        required
                                        placeholder="Phone number"
                                        onChange={(e) => setPhonenumber(e.target.value)}
                                        value={phonenumber}
                                    />
                                </div>
                                <div className="auth-field">
                                    <label htmlFor="register-postal">Postal Code</label>
                                    <input
                                        type="text"
                                        id="register-postal"
                                        className="form-control"
                                        required
                                        placeholder="Postal code"
                                        onChange={(e) => setPostalcode(e.target.value)}
                                        value={postalcode}
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="register-address">Address</label>
                                <input
                                    type="text"
                                    id="register-address"
                                    className="form-control"
                                    required
                                    placeholder="Enter your address"
                                    onChange={(e) => setAdress(e.target.value)}
                                    value={adress}
                                />
                            </div>

                            <div className="auth-options">
                                <label className="auth-checkbox">
                                    <input type="checkbox" required />
                                    <span>Accept all terms and conditions</span>
                                </label>
                            </div>

                            <button className="auth-submit-btn" type="submit">Create Account</button>
                        </form>

                        <div className="auth-footer-text">
                            Already have an account?
                            <button className="auth-link-btn" type="button" onClick={() => navigate("/login")}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
