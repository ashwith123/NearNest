import { Link } from "react-router-dom";
 import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";


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
        <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">

            <div className="container-fluid">

                <div 
                className="collapse navbar-collapse" 
                id="navbarId"
                >


                    <div className="navbar-nav">
                        <Link
                            className="nav-link"
                            to="/listings"
                            >
                            <div id="icon">
                                <i className="fa-solid fa-house"></i>
                                NearNest
                            </div>  
                        </Link>
                    </div>

                    <div className="navbar-nav ms-auto">
                        {user ? (
                            <>
                            <Link
                                    to="/listings/add"
                                    className="nav-link"
                                    onClick={addNewListing}
                                >
                                    Add New Listing
                            </Link>
                            <button
                                     className="nav-link btn btn-link"
                                     onClick={handleLogout}
                            >
                                Logout
                            </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    className="nav-link"
                                    to="/login"
                                >
                                    Login
                                </Link>
                                <Link
                                    className="nav-link"
                                    to="/signup"
                                 >
                                    Signup
                                </Link>
                            </>
                        )
                        }
                    </div>
                
                </div>
                
            </div>

              </nav>
    );
}

export default Navbar;