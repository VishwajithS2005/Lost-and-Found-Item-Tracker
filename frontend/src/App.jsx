import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreateClaimerPage from "./pages/CreateClaimerPage";
import CreateItemPage from "./pages/CreateItemPage";
import CreateFinderPage from "./pages/CreateFinderPage";
import EditItemPage from "./pages/EditItemPage";
import EditFinderPage from "./pages/EditFinderPage";
import EditClaimerPage from "./pages/EditClaimerPage";
import LoginPage from "./pages/LoginPage";

function App() {
    const [selectedType, setSelectedType] = useState("item");

    return (
        <div>
            <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
                <Navbar selectedType={selectedType} />

                <Routes>
                    <Route
                        path="/"
                        element={<HomePage selectedType={selectedType} setSelectedType={setSelectedType} />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/create-claimer" element={<CreateClaimerPage />} />
                    <Route path="/create-item" element={<CreateItemPage />} />
                    <Route path="/create-finder" element={<CreateFinderPage />} />
                    <Route path="/edit-item/:id" element={<EditItemPage />} />
                    <Route path="/edit-finder/:id" element={<EditFinderPage />} />
                    <Route path="/edit-claimer/:id" element={<EditClaimerPage />} />
                </Routes>
            </Box>
        </div>
    );
}

export default App;
