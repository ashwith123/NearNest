import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ShowListing() {
    const { id } = useParams();

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
        } finally {
            setLoading(false);
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
        </div>
    );
}

export default ShowListing;