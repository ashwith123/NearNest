import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
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

        try {
            const res = await axios.post(
                "http://localhost:3000/login",
                user,
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
        <div className="login-page">
            <div className="login-card">

                <h1>Login</h1>

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

                    {error && (
                        <p style={{ color: "red" }}>
                            {error}
                        </p>
                    )}

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/signup">
                        Signup
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;