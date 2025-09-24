import express from 'express';
import { createClaimer, deleteClaimer, getAllClaimers, getClaimerById, updateClaimer } from '../controllers/claimer.controller.js';

const router = express.Router();

router.get("/", getAllClaimers);
router.post("/", createClaimer);
router.get("/:id", getClaimerById);
router.put("/:id", updateClaimer);
router.delete("/:id", deleteClaimer);

export default router;