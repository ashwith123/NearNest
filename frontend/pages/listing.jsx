import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function ListingsPage() {
    const navigate = useNavigate();
    const [allListings, setAllListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
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
        };

        fetchListings();
    }, []);

    return (
        <div>
            <div className="profile-page-title">
                <h1>Available Houses</h1>
                <p>Browse rental houses near you</p>
            </div>

            <div className="listing-container">
                {allListings.map((listing) => (
                    <Link
                        key={listing._id}
                        to={`/listings/${listing._id}`}
                        className="card-link"
                    >
                        <div className="listing-card">

                            <img
                                src={
                                    listing.images?.length > 0
                                        ? listing.images[0].url
                                        : "https://imgs.search.brave.com/tu80peDDYz46QJ-k5hQt-xJBiKLPdXDaWtkdTw-6rH8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdmUtc3VpdGUv/YXVkaW8tY3JlYXRp/b24vdmlzdWFscy1z/b25ncy53ZWJw"  
                                }
                                alt={listing.title}
                            />

                            <div className="card-body">
                                <h3>{listing.title}</h3>

                                <p>
                                    <strong>₹{listing.rent}/month</strong>
                                </p>

                                <p>
                                    {listing.bhk} BHK • {listing.furnishing}
                                </p>

                                <p>{listing.address}</p>

                                <p>
                                    {listing.description.length > 100
                                        ? listing.description.substring(0, 100) + "..."
                                        : listing.description}
                                </p>

                                {!listing.isAvailable && (
                                    <p style={{ color: "red" }}>
                                        Not Available
                                    </p>
                                )}
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ListingsPage;