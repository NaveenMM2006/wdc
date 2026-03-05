import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { getMyProfile, updateMyProfile, uploadProfilePhoto  } from "../controllers/faculty.controller.js";

const router = express.Router();

router.get("/me", authenticate, getMyProfile);
router.put("/me",authenticate,updateMyProfile)
router.put("/me/photo", authenticate, (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.log("Multer error:", err.message);
      return res.status(400).json({ message: err.message });
    }

    uploadProfilePhoto(req, res);
  });
});
export default router;