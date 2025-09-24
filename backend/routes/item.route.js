import express from 'express';
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from '../controllers/item.controller.js';

const router = express.Router();

router.get("/", getAllItems);
router.post("/", createItem);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;