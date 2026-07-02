import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../src/store/authStore";

function Login() {
     const navigate = useNavigate();
        const setLoggedInUser = useAuthStore((state) => state.setUser);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        try {
            const res = await axios.post(
                "http://localhost:3000/login",
                formData,
                {
                    withCredentials: true,
                }
            );

            setLoggedInUser(res.data.user);

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
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
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