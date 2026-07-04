const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");
const User = require("../models/user");
const { requireAuth } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../lib/cloudinary");
const upload = multer({ storage });

router.get("/", async (req, res) => {
    try {
        const allListings = await Listing.find();
        res.status(200).json(allListings);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

 router.get("/:id",async (req, res) => {
    try {
      const listingId = req.params.id;

      const listing = await Listing.findById(listingId)
        .populate("owner"); 

      if (!listing) {
        return res.status(404).json({
          success: false,
          message: "Listing not found"
        });
      }

      res.status(200).json({
    success: true,
    listing
});

    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false, 
        message: "Something went wrong"
      });
    }
  });

  
  router.get("/:id/edit", requireAuth, async (req, res) => {
    try {
      const listing = await Listing.findById(req.params.id)
        .populate("owner");

      if (!listing) {
        return res.status(404).json({
          success: false,
          message: "Listing not found"
        });
      }

       
    if (listing.owner._id.toString() !== req.userId) {
        return res.status(403).json({
          success: false,
          message: "You are not allowed to edit this listing"
        });
      }

      res.status(200).json({
        success: true,
        listing
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "not allowed to edit this listing  "
      });
    }
  });

  router.post("/add",requireAuth,upload.array("images", 10),async (req, res) => {
console.log("Before try");
        try {
            const {
                title,
                description,
                rent,
                bhk,
                furnishing,
                floor,
                address,
                latitude,
                longitude,
                contactNumber
            } = req.body;

            if (
                !title ||
                !description ||
                !rent ||
                !bhk ||
                !furnishing ||
                !address ||
                !latitude ||
                !longitude ||
                !contactNumber
            ) {
                return res.status(400).json({
                    success: false,
                    message: "All required fields must be filled."
                });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({
                    success: false, 
                    message: "Please upload at least one image."
                });
            }

            const images = req.files.map(file => ({
                url: `/uploads/${file.filename}`,
                filename: file.filename
            }));

            const listing = new Listing({
                title: title.trim(),
                description: description.trim(),
                rent: Number(rent),
                bhk: Number(bhk),
                furnishing,
                floor: floor || undefined,
                images,
                address: address.trim(),
                location: {
                    type: "Point",
                    coordinates: [
                        Number(longitude),
                        Number(latitude)
                    ]
                },
                owner: req.userId,
                contactNumber: contactNumber.trim()
            });

            await listing.save();

            res.status(201).json({
                success: true,
                message: "Listing created successfully.",
                listing
            });

        } catch (err) {
    console.log("Inside catch");

            console.log(typeof err);
            console.log(err);
            console.dir(err, { depth: null });
            console.log(JSON.stringify(err, null, 2));  
              res.status(500).json({
                success: false,
                message: "Internal Server Error."
            });
        }
    }
);

router.put("/:id",requireAuth,upload.array("images", 10),async (req, res) => {
        try {
            const { id } = req.params;

            const listing = await Listing.findById(id);

            if (!listing) {
                return res.status(404).json({
                    success: false,
                    message: "Listing not found."
                });
            }

             if (listing.owner.toString() !== req.userId) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to edit this listing."
                });
            }

            const {
                title,
                description,
                rent,
                bhk,
                furnishing,
                floor,
                address,
                latitude,
                longitude,
                contactNumber,
                isAvailable
            } = req.body;

            listing.title = title.trim();
            listing.description = description.trim();
            listing.rent = Number(rent);
            listing.bhk = Number(bhk);
            listing.furnishing = furnishing;
            listing.floor = floor || null;
            listing.address = address.trim();
            listing.contactNumber = contactNumber.trim();
            listing.isAvailable =
                isAvailable === undefined
                    ? listing.isAvailable
                    : isAvailable === "true";

            listing.location = {
                type: "Point",
                coordinates: [
                    Number(longitude),
                    Number(latitude)
                ]
            };

             if (req.files && req.files.length > 0) {
                listing.images = req.files.map(file => ({
                    url: `/uploads/${file.filename}`,
                    filename: file.filename
                }));
            }

            await listing.save();

            res.status(200).json({
                success: true,
                message: "Listing updated successfully.",
                listing
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "Internal Server Error."
            });
        }
    }
);

router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const { id } = req.params;

        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found."
            });
        }

         if (listing.owner._id.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this listing."
            });
        }

         await Listing.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Listing deleted successfully."
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
});

module.exports = router;