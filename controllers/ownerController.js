const Owner = require("../models/Owner");
const multer = require("multer");
const csvParser = require("csv-parser");
const fs = require("fs");
const path = require("path");

// Set up Multer for file uploads
const upload = multer({ dest: "uploads/" });


// Create User
const createOwner = async (req, res) => {
  try {
    const { name, email, phone, flat_number, complex_id } = req.body;
    const newOwner = new Owner({ name, email, phone, flat_number, complex_id });
    await newOwner.save();
    res.status(201).json(newOwner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Users
const getOwners = async (req, res) => {
  try {
    const {complex_id } = req.body;
    const owners = await Owner.find({ complex_id: complex_id });
    if (owners.length === 0) {
      return res.status(404).json({ message: "No owners found for this complex ID" });
    }
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single User by ID
const getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).json({ message: "Owner not found" });
    res.json(owner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User
const updateOwner = async (req, res) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOwner) return res.status(404).json({ message: "User not found" });
    res.json(updatedOwner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
const deleteOwner = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Import Owners from CSV
const importOwners = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a CSV file" });
  }
  const { complex_number } = req.body; // Get flat_number from request body

  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => {
      // Validate that all required fields are present
   

      results.push({
        complex_id :complex_number,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: Number(data.phone), // Convert phone number to Number
        block: data.block.trim(),
        flat_number: data.flat_number.trim(),
      });
    })
    .on("end", async () => {
      try {
        if (results.length === 0) {
          return res.status(400).json({ message: "No valid records found in CSV" });
        }

        await Owner.insertMany(results);
        fs.unlinkSync(filePath); // Delete the file after processing
        res.json({ message: "CSV imported successfully", data: results });
      } catch (err) {
        res.status(500).json({ message: "Error importing CSV", error: err.message });
      }
    })
    .on("error", (err) => {
      res.status(500).json({ message: "Error reading CSV file", error: err.message });
    });
};

// Get All Apartments
const getOwnerByFlat = async (req, res) => {

  try {
    const { flat_number } = req.body; // Get flat_number from request body

    if (!flat_number) {
      return res.status(400).json({ message: "Flat number is required" });
    }

    const owner = await Owner.findOne({ flat_number });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.json({ owner });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }

};

// Get All Apartments
const getApartments = async (req, res) => {

  try {
    const {complex_id } = req.body;
    const flats = await Owner.find({complex_id}, "flat_number"); // Fetch only flat_number field
    const flatNumbers = flats.map(flat => flat.flat_number); // Extract values
    res.json({ flatNumbers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }

};

module.exports = { createOwner, getOwners, getOwnerById, updateOwner, deleteOwner, importOwners, upload, getApartments, getOwnerByFlat };
