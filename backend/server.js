import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import finderRoutes from "./routes/finder.route.js";
import claimerRoutes from "./routes/claimer.route.js";
import itemRoutes from "./routes/item.route.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/api/finder", finderRoutes);
app.use("/api/claimer", claimerRoutes);
app.use("/api/item", itemRoutes);

app.get("/", (req, res) => {
    res.send("LAFIT API is running...");
});