import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:3000/signup",
                {
                    username: user.username,
                    password: user.password,
                },
                {
                    withCredentials: true,
                }
            );

            alert(res.data.message);
            navigate("/listings");

        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong"
            );
        }
    }

    return (
        <div className="signup-page">
            <div className="signup-card">
                <div className="signup-header">
                    <h1>Create Account</h1>
                    <p>Join NearNest and start finding your next home.</p>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={user.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button className="signup-submit-btn" type="submit">
                        Create Account
                    </button>
                </form>

                <p className="login-text">
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;