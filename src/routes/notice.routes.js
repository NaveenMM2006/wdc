import express from "express";
import {authenticate} from "../middleware/auth.middleware.js"
import {authorizeRole} from "../middleware/role.middleware.js";
import { createNewNotice,getNotices, editNotice, removeNotice } from "../controllers/notice.controller.js";


const router = express.Router();

router.get("/",authenticate,getNotices);

router.post("/", authenticate,authorizeRole('SUPER_ADMIN'),createNewNotice);
router.put("/:id", authenticate,authorizeRole('SUPER_ADMIN'),editNotice);
router.delete("/:id", authenticate,authorizeRole('SUPER_ADMIN'),removeNotice);

export default router;