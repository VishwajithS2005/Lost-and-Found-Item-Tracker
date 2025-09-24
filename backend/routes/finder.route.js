import express from "express";
import { createFinder, deleteFinder, getAllFinders, getFinderById, updateFinder } from "../controllers/finder.controller.js";

const router = express.Router();

router.get("/", getAllFinders);
router.post("/", createFinder);
router.get("/:id", getFinderById);
router.put("/:id", updateFinder);
router.delete("/:id", deleteFinder);

export default router;