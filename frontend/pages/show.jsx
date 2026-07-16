import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./show.css";
import MapPicker from "../src/components/MapPicker.jsx";

function ShowListing() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        fetchListing();
    }, []);

    async function fetchListing() {
        try {
            const res = await axios.get(
                `http://localhost:3000/listings/${id}`
            );
            setListing(res.data.listing);
        } catch (err) {
            console.log(err);
            alert("Failed to fetch listing");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!window.confirm("Are you sure you want to delete this listing?")) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3000/listings/${id}`, {
                withCredentials: true,
            });
            alert("Listing deleted successfully");
            navigate("/listings");
        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Failed to delete listing");
        }
    }

    async function handleEdit() {
        try {
            await axios.get(`http://localhost:3000/listings/${id}/edit`, {
                withCredentials: true,
            });
            navigate(`/listings/${id}/edit`);
        } catch (err) {
            alert(
                err.response?.data?.message ||
                    "You are not allowed to edit this listing."
            );
        }
    }

    if (loading) {
        return (
            <div className="show-status">
                <div className="spinner"></div>
                <p>Loading listing...</p>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="show-status">
                <h2>Listing Not Found</h2>
            </div>
        );
    }

    const images = listing.images?.length
        ? listing.images
        : [{ url: "https://placehold.co/800x500?text=No+Image" }];

    return (
        <div className="show-page">
            <div className="show-container">

                {/* ===== Gallery ===== */}
                <div className="gallery">
                    <div className="main-image">
                        <img
                            src={images[activeImage].url}
                            alt={listing.title}
                        />
                        <span
                            className={
                                listing.isAvailable
                                    ? "status available"
                                    : "status unavailable"
                            }
                        >
                            {listing.isAvailable ? "Available" : "Not Available"}
                        </span>
                    </div>

                    {images.length > 1 && (
                        <div className="thumb-row">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    className={
                                        "thumb" +
                                        (i === activeImage ? " active" : "")
                                    }
                                    onClick={() => setActiveImage(i)}
                                >
                                    <img src={img.url} alt={`thumbnail ${i + 1}`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ===== Details ===== */}
                <div className="details">
                    <div className="details-header">
                        <h1>{listing.title}</h1>
                        <div className="rent">
                            ₹{listing.rent}
                            <span>/month</span>
                        </div>
                    </div>

                    <p className="address">📍 {listing.address}</p>

                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">🛏 BHK</span>
                            <span className="value">{listing.bhk}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">🪑 Furnishing</span>
                            <span className="value">{listing.furnishing}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">🏢 Floor</span>
                            <span className="value">{listing.floor || "N/A"}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">📞 Contact</span>
                            <span className="value">{listing.contactNumber}</span>
                        </div>
                    </div>

                    <div className="description-block">
                        <h3>Description</h3>
                        <p>{listing.description}</p>
                    </div>

                    <div className="owner-card">
                        <div>
                            <p className="owner-label">Listed by</p>
                            <p className="owner-name">
                                {listing.owner?.username || "Unknown"}
                            </p>
                        </div>
                    </div>

                    <div className="action-btns">
                        <button className="edit-btn" onClick={handleEdit}>
                            ✏️ Edit
                        </button>
                        <button className="delete-btn" onClick={handleDelete}>
                            🗑 Delete
                        </button>
                    </div>
                </div>

            </div>
            <div className="map-section">
                 <h2>See the location</h2>

            <div className="map-container">
                <MapPicker
                    coordinates={[
                        listing.location.coordinates[1], // latitude
                        listing.location.coordinates[0], // longitude
                    ]}
                    listing={listing}
                />
          </div>
</div>
        </div>
    );
}

export default ShowListing;