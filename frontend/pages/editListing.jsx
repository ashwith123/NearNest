import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./editListing.css";

function EditListing() {
    const { id } = useParams();
    const navigate = useNavigate();

 
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        rent: "",
        bhk: "",
        furnishing: "Fully Furnished",
        floor: "",
        address: "",
        latitude: "",
        longitude: "",
        contactNumber: "",
    });

    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchListing() {
            try {
                const res = await axios.get(
                    `http://localhost:3000/listings/${id}/edit`,
                    {
                        withCredentials: true,
                    }
                );

                const listing = res.data.listing;

                setFormData({
                    title: listing.title,
                    description: listing.description,
                    rent: listing.rent,
                    bhk: listing.bhk,
                    furnishing: listing.furnishing,
                    floor: listing.floor,
                    address: listing.address,
                    latitude: listing.location.coordinates[1],
                    longitude: listing.location.coordinates[0],
                    contactNumber: listing.contactNumber,
                });

             } catch (err) {
                console.log(err);
                alert(
                    err.response?.data?.message ||
                    "Unable to fetch listing"
                );
                navigate("/listings");
            }
        }

        fetchListing();
    }, [id, navigate]);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleImageChange(e) {
        setImages(e.target.files);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            for (let i = 0; i < images.length; i++) {
                data.append("images", images[i]);
            }

            await axios.put(
                `http://localhost:3000/listings/${id}`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Listing Updated Successfully");
            navigate(`/listings/${id}`);

        } catch (err) {
            console.log(err);
            alert(
                err.response?.data?.message ||
                "Something went wrong"
            );
        }
    }

  

    return (
    <div className="edit-listing-page">
        <h1>Edit Property Listing</h1>

        <form className="edit-form" onSubmit={handleSubmit}>

    <h2 className="section-title">🏠 Property Details</h2>

    <div className="form-group">
        <label>Property Title</label>
        <input
            type="text"
            name="title"
            placeholder="e.g. Spacious 2 BHK Apartment"
            value={formData.title}
            onChange={handleChange}
            required
        />
    </div>

    <div className="form-group full-width">
        <label>Description</label>
        <textarea
            name="description"
            placeholder="Describe your property, nearby facilities, amenities, etc."
            value={formData.description}
            onChange={handleChange}
            required
        />
    </div>

    <h2 className="section-title">💰 Rental Information</h2>

    <div className="form-group">
        <label>Monthly Rent (₹)</label>
        <input
            type="number"
            name="rent"
            placeholder="e.g. 15000"
            value={formData.rent}
            onChange={handleChange}
            required
        />
    </div>

    <div className="form-group">
        <label>BHK</label>
        <input
            type="number"
            name="bhk"
            placeholder="e.g. 2"
            value={formData.bhk}
            onChange={handleChange}
            required
        />
    </div>

    <div className="form-group">
        <label>Furnishing</label>
        <select
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
        >
            <option>Fully Furnished</option>
            <option>Semi Furnished</option>
            <option>Unfurnished</option>
        </select>
    </div>

    <div className="form-group">
        <label>Floor</label>
        <input
            type="text"
            name="floor"
            placeholder="e.g. Ground, 1st, 2nd"
            value={formData.floor}
            onChange={handleChange}
        />
    </div>

    <h2 className="section-title">📍 Location Details</h2>

    <div className="form-group full-width">
        <label>Address</label>
        <input
            type="text"
            name="address"
            placeholder="Complete Property Address"
            value={formData.address}
            onChange={handleChange}
            required
        />
    </div>

    <div className="form-group">
        <label>Latitude</label>
        <input
            type="number"
            step="any"
            name="latitude"
            placeholder="e.g. 17.3850"
            value={formData.latitude}
            onChange={handleChange}
            required
        />
    </div>

    <div className="form-group">
        <label>Longitude</label>
        <input
            type="number"
            step="any"
            name="longitude"
            placeholder="e.g. 78.4867"
            value={formData.longitude}
            onChange={handleChange}
            required
        />
    </div>

    <h2 className="section-title">📞 Contact Details</h2>

    <div className="form-group full-width">
        <label>Owner Contact Number</label>
        <input
            type="text"
            name="contactNumber"
            placeholder="e.g. 9876543210"
            value={formData.contactNumber}
            onChange={handleChange}
            required
        />
    </div>

    <h2 className="section-title">🖼 Property Images</h2>

    <div className="form-group full-width">
        <label>Upload New Images</label>
        <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
        />
        <small className="upload-note">
            Leave empty if you don't want to replace existing images.
        </small>
    </div>

    <button type="submit">
        Update Listing
    </button>

</form>
    </div>
);
}

export default EditListing;