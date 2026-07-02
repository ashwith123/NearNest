import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        latitude: "",
        longitude: "",
        contactNumber: "",
    });

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
        <div className="add-listing-page">

            <h1>Add House Listing</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="rent"
                    placeholder="Monthly Rent"
                    value={formData.rent}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="bhk"
                    placeholder="BHK"
                    value={formData.bhk}
                    onChange={handleChange}
                    required
                />

                <select
                    name="furnishing"
                    value={formData.furnishing}
                    onChange={handleChange}
                >
                    <option>Fully Furnished</option>
                    <option>Semi Furnished</option>
                    <option>Unfurnished</option>
                </select>

                <input
                    type="text"
                    name="floor"
                    placeholder="Floor"
                    value={formData.floor}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    step="any"
                    name="latitude"
                    placeholder="Latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    step="any"
                    name="longitude"
                    placeholder="Longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                />

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />

                <button type="submit">
                    Add Listing
                </button>

            </form>

        </div>
    );
}

export default AddListing;