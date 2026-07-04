import { Link } from "react-router-dom";
 import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import "./Navbar.css";

function Navbar() {

    
     const navigate = useNavigate();
    
const user = useAuthStore((state) => state.user);
const setUser = useAuthStore((state) => state.setUser);
const logoutStore = useAuthStore((state) => state.logout);

    useEffect(()=>{
    
    async function fetchUser() {
    
    try {
        const res = await axios.get(
            "http://localhost:3000/me",
            {
                withCredentials: true,
            }
        );
        setUser(res.data.user);
    } catch (error) {
        setUser(null);
    }
}

    fetchUser();

    },[]);

    let logout=async()=>{
        try{
            console.log("Logging out...");
            await axios.post("http://localhost:3000/logout",{
                withCredentials:true,
            });
            logoutStore();
            setUser(null);
        }
        catch(error){
            console.error("Error logging out:", error);
        }
    };

    let handleLogout=async()=>{
        console.log("handling logout...");
        await logout();
        navigate("/login");
    };

    let addNewListing=()=>{
        navigate("/listings/add");
    }


    return (
    <nav className="navbar">
        <div className="nav-container">
            <Link to="/listings" className="logo">
                <i className="fa-solid fa-house"></i>
                <span>NearNest</span>
            </Link>

            <div className="nav-links">
                {user ? (
                    <>
                        <Link to="/listings/add" className="nav-btn">Add Listing</Link>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-btn">Login</Link>
                        <Link to="/signup" className="signup-btn">Signup</Link>
                    </>
                )}
            </div>
        </div>
    </nav>
);
}

export default Navbar;