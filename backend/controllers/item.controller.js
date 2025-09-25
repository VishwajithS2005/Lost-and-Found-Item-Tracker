import mongoose from "mongoose";
import Item from "../models/item.model.js";
import Finder from "../models/finder.model.js";
import Claimer from "../models/claimer.model.js";

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find()
            .populate('foundBy')
            .populate('claimedBy')
            .exec();
        res.status(200).json({
            "Details": items,
            "Message": "All Items fetched successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Details": error.message,
            "Message": "Server Error",
            "Success": false
        });
    }
}

export const createItem = async (req, res) => {
    try {
        const itemData = req.body;

        if (!itemData.name || !itemData.image || !itemData.foundBy) {
            return res.status(400).json({
                "Details": null,
                "Message": "Name, Image, and Finder details are required",
                "Success": false
            });
        }
        if (!mongoose.Types.ObjectId.isValid(itemData.foundBy) || (itemData.claimedBy && !mongoose.Types.ObjectId.isValid(itemData.claimedBy))) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Finder/Claimer ID",
                "Success": false
            });
        }

        const finder = await Finder.findById(itemData.foundBy);
        if (!finder) {
            return res.status(404).json({
                "Details": null,
                "Message": "Finder not found",
                "Success": false
            });
        }

        if (itemData.claimedBy) {
            const claimer = await Claimer.findById(itemData.claimedBy);
            if (!claimer) {
                return res.status(404).json({
                    "Details": null,
                    "Message": "Claimer not found",
                    "Success": false
                });
            }
        }

        const newItem = new Item(itemData);
        await newItem.save();
        res.status(201).json({
            "Details": newItem,
            "Message": "Item created successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Details": error.message,
            "Message": "Server Error",
            "Success": false
        });
    }
}

export const getItemById = async (req, res) => {
    try {
        const itemId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Item ID",
                "Success": false
            });
        }

        const item = await Item.findById(itemId)
            .populate('foundBy')
            .populate('claimedBy')
            .exec();
        if (!item) {
            return res.status(404).json({
                "Details": null,
                "Message": "Item not found",
                "Success": false
            });
        }

        res.status(200).json({
            "Details": item,
            "Message": "Item fetched successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Details": error.message,
            "Message": "Server Error",
            "Success": false
        });
    }
}

export const updateItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Item ID",
                "Success": false
            });
        }

        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({
                "Details": null,
                "Message": "Item not found",
                "Success": false
            });
        }

        if (!updateData.name || !updateData.image || !updateData.foundBy) {
            return res.status(400).json({
                "Details": null,
                "Message": "Name, Image, and Finder details are required",
                "Success": false
            });
        }
        if (!mongoose.Types.ObjectId.isValid(updateData.foundBy) || (updateData.claimedBy && !mongoose.Types.ObjectId.isValid(updateData.claimedBy))) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Finder/Claimer ID",
                "Success": false
            });
        }

        const finder = await Finder.findById(updateData.foundBy);
        if (!finder) {
            return res.status(404).json({
                "Details": null,
                "Message": "Finder not found",
                "Success": false
            });
        }

        if (updateData.claimedBy) {
            const claimer = await Claimer.findById(updateData.claimedBy);
            if (!claimer) {
                return res.status(404).json({
                    "Details": null,
                    "Message": "Claimer not found",
                    "Success": false
                });
            }
        }

        Object.assign(item, updateData);
        await item.save();

        await item.populate('foundBy', 'claimedBy');
        res.status(200).json({
            "Details": item,
            "Message": "Item updated successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Details": error.message,
            "Message": "Server Error",
            "Success": false
        });
    }
}

export const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Item ID",
                "Success": false
            });
        }
        const item = await Item.findByIdAndDelete(itemId);
        if (!item) {
            return res.status(404).json({
                "Details": null,
                "Message": "Item not found",
                "Success": false
            });
        }

        res.status(200).json({
            "Details": item,
            "Message": "Item deleted successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Details": error.message,
            "Message": "Server Error",
            "Success": false
        });
    }
}