import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MapPicker from "../src/components/MapPicker.jsx";

function AddListing() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        rent: "",
        bhk: "",
        furnishing: "Fully Furnished",
        floor: "",
        address: "",
        contactNumber: "",
    });

    const [coordinates, setCoordinates] = useState(null);

    const [images, setImages] = useState([]);

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

            data.append("location", JSON.stringify({
                type: "Point",
                coordinates: [
                    coordinates.lng,
                    coordinates.lat,
                ],
            }));

            for (let i = 0; i < images.length; i++) {
                data.append("images", images[i]);
            }

            await axios.post(
                "http://localhost:3000/listings/add",
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Listing Added Successfully");
            navigate("/listings");
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
        <h1>Add New Property</h1>

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
                    placeholder="Describe your property, nearby facilities, amenities, parking, water supply, etc."
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

            <div className="form-group full-width">
                  <label>Property Location</label>

                  <MapPicker onLocationSelect={setCoordinates} />

                  {coordinates && (
                 <small>
                    Selected Location:
                <br />
                Latitude: {coordinates.lat.toFixed(6)}
                 <br />
                Longitude: {coordinates.lng.toFixed(6)}
                </small>
                )}
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
                <label>Upload Property Images</label>

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />

                <small className="upload-note">
                    Upload high-quality images of the property. You can select multiple images.
                </small>
            </div>

            <button type="submit">
                Add Listing
            </button>

        </form>
    </div>
);
}

export default AddListing;