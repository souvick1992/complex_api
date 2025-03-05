const express = require("express");
const router = express.Router();
const { loginAdmin, changeEmail, changePassword, changeProfileImage, upload } = require("../controllers/adminController");

// Admin Routes
router.post("/login", loginAdmin);
router.put("/change-email", changeEmail);
router.put("/change-password", changePassword);
router.put("/change-profile-image", upload.single("image"), changeProfileImage);

module.exports = router;
