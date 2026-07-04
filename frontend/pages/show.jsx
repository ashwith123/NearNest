import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowListing() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
 
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
        }
    }

    async function handleDelete() {
        try {
            await axios.delete(
                `http://localhost:3000/listings/${id}`,
                {
                    withCredentials: true,
                }
            );
            alert("Listing deleted successfully");
            navigate("/listings");
        } catch (err) {
            console.log(err);
            alert(
                err.response?.data?.message ||
                "Failed to delete listing"
            );
        } 
    } 

    async function handleEdit() {
    try {
        await axios.get(
            `http://localhost:3000/listings/${id}/edit`,
            {
                withCredentials: true,
            }
        );

        navigate(`/listings/${id}/edit`);

    } catch (err) {
        alert(err.response?.data?.message || "You are not allowed to edit this listing.");
    }
}

    if (!listing) {
        return <h2>Listing Not Found</h2>;
    }

    return (
        <div>
            <h1>{listing.title}</h1>

            {listing.images.length > 0 && (
                <img
                    src={listing.images[0].url}
                    alt={listing.title}
                    width="400"
                />
            )}

            <p><strong>Description:</strong> {listing.description}</p>
            <p><strong>Rent:</strong> ₹{listing.rent}</p>
            <p><strong>BHK:</strong> {listing.bhk}</p>
            <p><strong>Furnishing:</strong> {listing.furnishing}</p>
            <p><strong>Floor:</strong> {listing.floor || "N/A"}</p>
            <p><strong>Address:</strong> {listing.address}</p>
            <p><strong>Contact:</strong> {listing.contactNumber}</p>

            <h3>Owner Details</h3>

            <p>Username: {listing.owner?.username}</p>

            <button onClick={() => handleEdit()}>Edit</button>

            <button onClick={() => handleDelete()}>delete</button>

        </div>
    );
}


export default ShowListing;