const mongoose = require("mongoose");
const User = require("./user");
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    rent: {
        type: Number,
        required: true,
    },

    bhk: {
        type: Number,
        required: true,
    },

    propertyType: {
        type: String,
        enum: ["Apartment", "Independent House", "Villa", "PG", "Hostel"],
        required: true,
    },

    furnishing: {
        type: String,
        enum: ["Fully Furnished", "Semi Furnished", "Unfurnished"],
        required: true,
    },

    bathrooms: Number,

    floor: String,

    area: Number,

    availableFrom: Date,

    bachelorAllowed: {
        type: Boolean,
        default: true,
    },

    images: [
        {
            url: String,
            filename: String,
        }
    ],

    address: {
        houseNo: String,
        street: String,
        locality: String,
        city: String,
        state: String,
        pincode: String,
    },

    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    contactNumber: {
        type: String,
        required: true,
    },

    isAvailable: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("Listing", listingSchema);