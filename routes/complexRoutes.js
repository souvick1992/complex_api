const express = require("express");
const router = express.Router();
const { loginComplex, changeEmailComplex, changePasswordComplex, createComplex } = require("../controllers/complexController");

// Admin Routes
router.post("/login", loginComplex);
router.post("/create", createComplex);
router.put("/change-email", changeEmailComplex);
router.put("/change-password", changePasswordComplex);

//router.put("/change-profile-image", upload.single("image"), changeProfileImage);

module.exports = router;
