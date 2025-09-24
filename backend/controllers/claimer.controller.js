import mongoose from "mongoose";
import Claimer from "../models/claimer.model.js";
import Item from "../models/item.model.js";

export const getAllClaimers = async (req, res) => {
    try {
        const Claimers = await Claimer.find();
        res.status(200).json({
            "Details": Claimers,
            "Message": "All Claimers fetched successfully",
            "Success": true
        });
    } catch (error) {
        res.status(500).json({
            "Message": "Server Error",
            "Success": false
        });
    }
}

export const createClaimer = async (req, res) => {
    try {
        const ClaimerData = req.body;
        if (!ClaimerData.name || !ClaimerData.contactInfo || !ClaimerData.userName) {
            return res.status(400).json({
                "Message": "Please provide all required fields",
                "Success": false
            });
        }

        const existingClaimer = await Claimer.findOne({ userName: ClaimerData.userName });
        if (existingClaimer) {
            return res.status(400).json({
                "Message": "Claimer with this userName already exists",
                "Success": false
            });
        }

        if (ClaimerData.contactInfo.length < 10) {
            return res.status(400).json({
                "Message": "Contact Info must be at least 10 characters long",
                "Success": false
            });
        }

        if (ClaimerData.userName.length < 3) {
            return res.status(400).json({
                "Message": "Username must be at least 3 characters long",
                "Success": false
            });
        }

        if (String(ClaimerData.userName).includes(" ")) {
            return res.status(400).json({
                "Message": "Username must not contain spaces",
                "Success": false
            });
        }

        const newClaimer = new Claimer(ClaimerData);
        await newClaimer.save();
        res.status(201).json({
            "Details": newClaimer,
            "Message": "Claimer created successfully",
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

export const getClaimerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Claimer ID",
                "Success": false
            });
        }

        const claimer = await Claimer.findById(id);
        if (!claimer) {
            return res.status(404).json({
                "Details": null,
                "Message": "Claimer not found",
                "Success": false
            });
        }

        res.status(200).json({
            "Details": claimer,
            "Message": "Claimer fetched successfully",
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

export const updateClaimer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Claimer ID",
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

        const existingClaimer = await Claimer.findOne({ userName: updateData.userName, _id: { $ne: id } });
        if (existingClaimer) {
            return res.status(400).json({
                "Details": null,
                "Message": "Another Claimer with this userName already exists",
                "Success": false
            });
        }

        const updatedClaimer = await Claimer.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedClaimer) {
            return res.status(404).json({
                "Details": null,
                "Message": "Claimer not found",
                "Success": false
            });
        }

        res.status(200).json({
            "Details": updatedClaimer,
            "Message": "Claimer updated successfully",
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

export const deleteClaimer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                "Details": null,
                "Message": "Invalid Claimer ID",
                "Success": false
            });
        }

        if (await Item.exists({ claimedBy: id })) {
            return res.status(400).json({
                "Details": null,
                "Message": "Cannot delete Claimer with associated Items",
                "Success": false
            });
        }

        const deletedClaimer = await Claimer.findByIdAndDelete(id);
        if (!deletedClaimer) {
            return res.status(404).json({
                "Details": null,
                "Message": "Claimer not found",
                "Success": false
            });
        }

        res.status(200).json({
            "Details": deletedClaimer,
            "Message": "Claimer deleted successfully",
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