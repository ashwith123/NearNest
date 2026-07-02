import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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

                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <p style={{ color: "red" }}>
                            {error}
                        </p>
                    )}

                    <button type="submit">
                        Sign Up
                    </button>

                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Signup;