import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./listing.css";

function ListingsPage() {
    const navigate = useNavigate();
    const [allListings, setAllListings] = useState([]);

    useEffect(() => {
        async function fetchListings() {
            try {
                const res = await axios.get(
                    "http://localhost:3000/listings",
                    {
                        withCredentials: true,
                    }
                );

                setAllListings(res.data);
            } catch (err) {
                console.log(err);
                navigate("/login");
            }
        }

        fetchListings();
    }, []);

    return (
        <div className="listings-page">
            <div className="page-header">
                <h1>Find Your Perfect Home</h1>
                <p>Browse rental houses near you</p>
            </div>

            <div className="listing-grid">
                {allListings.map((listing) => (
                    <Link
                        key={listing._id}
                        to={`/listings/${listing._id}`}
                        className="card-link"
                    >
                        <div className="listing-card">

                            <div className="listing-image">
                                <img
                                    src={
                                        listing.images?.length > 0
                                            ? listing.images[0].url
                                            : "https://placehold.co/600x400?text=No+Image"
                                    }
                                    alt={listing.title}
                                />

                                <span
                                    className={
                                        listing.isAvailable
                                            ? "status available"
                                            : "status unavailable"
                                    }
                                >
                                    {listing.isAvailable
                                        ? "Available"
                                        : "Not Available"}
                                </span>
                            </div>

                            <div className="card-content">

                                <h2>{listing.title}</h2>

                                <div className="rent">
                                    ₹{listing.rent}
                                    <span>/month</span>
                                </div>

                                <div className="listing-info">
                                    <span> {listing.bhk} BHK</span>
                                    <span> {listing.furnishing}</span>
                                </div>

                                <div className="address">
                                     {listing.address}
                                </div>

                                <p className="description">
                                    {listing.description
                                        ? listing.description.length > 100
                                            ? listing.description.substring(0, 100) + "..."
                                            : listing.description
                                        : "No description provided."}
                                </p>

                                <div className="view-btn">
                                    View Details →
                                </div>

                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ListingsPage;