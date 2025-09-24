import mongoose from "mongoose";
import Finder from "../models/finder.model.js";
import Item from "../models/item.model.js";

export const getAllFinders = async (req, res) => {
    try {
        const finders = await Finder.find();
        res.status(200).json({
            "Details": finders,
            "Message": "All Finders fetched successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Message": "Server Error",
            "Success": false
        });
    }
}

export const createFinder = async (req, res) => {
    try {
        const finderData = req.body;
        if (!finderData.name || !finderData.contactInfo || !finderData.userName) {
            return res.status(400).json({
                "Message": "Please provide all required fields",
                "Success": false
            });
        }

        const existingFinder = await Finder.findOne({ userName: finderData.userName });
        if (existingFinder) {
            return res.status(400).json({
                "Message": "Finder with this userName already exists",
                "Success": false
            });
        }

        if (finderData.contactInfo.length < 10) {
            return res.status(400).json({
                "Message": "Contact Info must be at least 10 characters long",
                "Success": false
            });
        }

        if (finderData.userName.length < 3) {
            return res.status(400).json({
                "Message": "Username must be at least 3 characters long",
                "Success": false
            });
        }

        if (String(finderData.userName).includes(" ")) {
            return res.status(400).json({
                "Message": "Username must not contain spaces",
                "Success": false
            });
        }

        const newFinder = new Finder(finderData);
        await newFinder.save();
        res.status(201).json({
            "Details": newFinder,
            "Message": "Finder created successfully",
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

export const getFinderById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Finder ID",
                "Success": false
            });
        }

        const finder = await Finder.findById(id);
        if (!finder) {
            return res.status(404).json({
                "Details": null,
                "Message": "Finder not found",
                "Success": false
            });
        }

        res.status(200).json({
            "Details": finder,
            "Message": "Finder fetched successfully",
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

export const updateFinder = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Finder ID",
                "Success": false
            });
        }

        if (!updateData.name || !updateData.contactInfo || !updateData.userName) {
            return res.status(400).json({
                "Details": null,
                "Message": "Please provide all required fields",
                "Success": false
            });
        }

        const existingFinder = await Finder.findOne({ userName: updateData.userName, _id: { $ne: id } });
        if (existingFinder) {
            return res.status(400).json({
                "Details": null,
                "Message": "Another Finder with this userName already exists",
                "Success": false
            });
        }

        const updatedFinder = await Finder.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedFinder) {
            return res.status(404).json({
                "Details": null,
                "Message": "Finder not found",
                "Success": false
            });
        }

        res.status(200).json({
            "Details": updatedFinder,
            "Message": "Finder updated successfully",
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

export const deleteFinder = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Finder ID",
                "Success": false
            });
        }

        if (await Item.exists({ foundBy: id })) {
            return res.status(400).json({
                "Details": null,
                "Message": "Cannot delete Finder with associated Items",
                "Success": false
            });
        }

        const deletedFinder = await Finder.findByIdAndDelete(id);
        if (!deletedFinder) {
            return res.status(404).json({
                "Details": null,
                "Message": "Finder not found",
                "Success": false
            });
        }

        res.status(200).json({
            "Details": deletedFinder,
            "Message": "Finder deleted successfully",
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