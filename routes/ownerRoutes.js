const express = require("express");
const { createOwner, getOwners, getOwnerById, updateOwner, deleteOwner, importOwners, upload, getApartments,  getOwnerByFlat} = require("../controllers/ownerController");

const router = express.Router();

router.post("/", createOwner);
router.post("/getOwners", getOwners);
router.get("/getApartments", getApartments);
router.post("/getOwnerByFlat", getOwnerByFlat);
router.get("/:id", getOwnerById);
router.put("/:id", updateOwner);
router.delete("/:id", deleteOwner);

// CSV Import Route
router.post("/import", upload.single("file"), importOwners);


module.exports = router;
