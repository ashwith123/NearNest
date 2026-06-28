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

    furnishing: {
        type: String,
        enum: ["Fully Furnished", "Semi Furnished", "Unfurnished"],
        required: true,
    },

    floor: String,

    images: [
        {
            url: String,
            filename: String,
        }
    ],

    address: {
        type: String,
        required: true,
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