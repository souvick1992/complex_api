const Complex = require("../models/Complex");
const multer = require("multer");
const fs = require("fs");

// Multer setup for image uploads
/* const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }); */




// Create User
const createComplex = async (req, res) => {
  try {
    const { full_name, address, complex_id, email, password, status } = req.body;
    const newComplex = new Complex({ full_name, address, complex_id, email, password, status });
    await newComplex.save();
    res.status(201).json(newComplex);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Login (Simple Email & Password Check)
const loginComplex = async (req, res) => {
  try {
    const { email, password } = req.body;
    const complex = await Complex.findOne({ email });

    if (!complex) return res.status(404).json({ message: "Admin not found" });
    if (complex.password !== password) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", complex });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

// Change Email
const changeEmailComplex = async (req, res) => {
  try {
    const { email, newEmail } = req.body;
    const admin = await Complex.findByIdAndUpdate(email, { email: newEmail }, { new: true });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json({ message: "Email updated successfully", email });
  } catch (error) {
    res.status(500).json({ message: "Error updating email", error: error.message });
  }
};

// Change Password (Without Hashing)
const changePasswordComplex = async (req, res) => {
  try {
    const { adminId, oldPassword, newPassword } = req.body;
    const admin = await Admin.findById(adminId);

    if (!admin) return res.status(404).json({ message: "Admin not found" });
    if (admin.password !== oldPassword) return res.status(401).json({ message: "Incorrect old password" });

    admin.password = newPassword;
    await admin.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password", error: error.message });
  }
};

// Change Profile Image
/* const changeProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Please upload an image" });

    const { adminId } = req.body;
    const admin = await Admin.findById(adminId);

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Delete old image if exists
    if (admin.image && fs.existsSync(`uploads/${admin.image}`)) {
      fs.unlinkSync(`uploads/${admin.image}`);
    }

    admin.image = req.file.filename;
    await admin.save();

    res.json({ message: "Profile image updated successfully", image: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile image", error: error.message });
  }
}; */

module.exports = { loginComplex, changeEmailComplex, changePasswordComplex, createComplex };
