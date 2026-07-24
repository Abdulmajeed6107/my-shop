import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../../components/Navbarcustom';
import TopHeader from '../../components/TopHeader';
import Footer from '../../components/Footer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const userLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
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

            if (data.status) {
                alert(data.message);

                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);

                if (data.user.id) {
                    localStorage.setItem("user_id", data.user.id);
                }

                console.log(" User logged in successfully. User ID:", data.user.id);
                navigate("/products");
            } else {
                alert(data.message);
            }

        } catch (e) {
            console.error("Login error:", e);
            alert("Something went wrong. Please try again.")
        }
    };

    return (
        <>
            <TopHeader />
            <MyNavbar />

            <section className="auth-page">
                <div className="auth-page-container">
                    <div className="auth-card">
                        <div className="auth-card-header">
                            <h1>Sign In</h1>
                            <p>Welcome back! Please enter your details.</p>
                        </div>

                        <form onSubmit={userLogin}>
                            <div className="auth-field">
                                <label htmlFor="login-email">Email</label>
                                <input
                                    type="email"
                                    id="login-email"
                                    className="form-control"
                                    required
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            <div className="auth-field">
                                <label htmlFor="login-password">Password</label>
                                <div className="auth-password-field">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="login-password"
                                        className="form-control"
                                        required
                                        placeholder="Enter your password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                    <button
                                        type="button"
                                        className="auth-toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        <i className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                                    </button>
                                </div>
                            </div>

                            <div className="auth-options">
                                <label className="auth-checkbox">
                                    <input type="checkbox" />
                                    <span>Remember me</span>
                                </label>
                                <button type="button" className="auth-link-btn">Forgot Password?</button>
                            </div>

                            <button className="auth-submit-btn" type="submit">Login</button>
                        </form>

                        <div className="auth-footer-text">
                            Don&apos;t have an account?
                            <button className="auth-link-btn" type="button" onClick={() => navigate("/register")}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
