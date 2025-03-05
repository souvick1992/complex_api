const express = require("express");
const { createOwner, getOwners, getOwnerById, updateOwner, deleteOwner, importOwners, upload } = require("../controllers/ownerController");

const router = express.Router();

router.post("/", createOwner);
router.get("/", getOwners);
router.get("/:id", getOwnerById);
router.put("/:id", updateOwner);
router.delete("/:id", deleteOwner);
// CSV Import Route
router.post("/import", upload.single("file"), importOwners);


module.exports = router;
