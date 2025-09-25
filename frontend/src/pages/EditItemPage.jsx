import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    Textarea,
    Select,
    useColorModeValue,
    useToast,
    VStack,
    List,
    ListItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useItemStore } from "../store/ItemStore";
import { useFinderStore } from "../store/FinderStore";
import { useClaimerStore } from "../store/ClaimerStore";
import { useNavigate, useParams } from "react-router-dom";

const EditItemPage = () => {
    const { id } = useParams();
    const { items, updateItem, fetchItems } = useItemStore();
    const { fetchFinders, finders } = useFinderStore();
    const { fetchClaimers, claimers } = useClaimerStore();
    const navigate = useNavigate();
    const toast = useToast();

    const [itemData, setItemData] = useState({
        name: "",
        description: "",
        foundAt: "",
        image: "",
        status: "unclaimed",
        foundBy: "",
        claimedBy: "",
    });

    const [finderSearch, setFinderSearch] = useState("");
    const [claimerSearch, setClaimerSearch] = useState("");
    const [filteredFinders, setFilteredFinders] = useState([]);
    const [filteredClaimers, setFilteredClaimers] = useState([]);

    // Fetch finders, claimers, and items
    useEffect(() => {
        fetchFinders();
        fetchClaimers();
        if (items.length === 0) fetchItems();
    }, [fetchFinders, fetchClaimers, fetchItems]);

    // Prefill item data and searches once items, finders, claimers are loaded
    useEffect(() => {
        if (items.length && finders.length && claimers.length) {
            const item = items.find((i) => i._id === id);
            if (item) {
                setItemData({
                    name: item.name || "",
                    description: item.description || "",
                    foundAt: item.foundAt || "",
                    image: item.image || "",
                    status: item.status || "unclaimed",
                    foundBy: item.foundBy || "",
                    claimedBy: item.claimedBy || "",
                });

                // Prefill finderSearch with userName
                const finder = finders.find((f) => f._id === item.foundBy._id);
                if (finder) setFinderSearch(finder.userName);

                // Prefill claimerSearch only if claimed
                if (item.status === "claimed" && item.claimedBy) {
                    const claimer = claimers.find((c) => c._id === item.claimedBy._id);
                    if (claimer) setClaimerSearch(claimer.userName);
                }
            }
        }
    }, [items, id, finders, claimers]);

    // Filter finders based on search
    useEffect(() => {
        setFilteredFinders(
            finders.filter((f) => f.userName.toLowerCase().includes(finderSearch.toLowerCase()))
        );
    }, [finderSearch, finders]);

    // Filter claimers based on search
    useEffect(() => {
        setFilteredClaimers(
            claimers.filter((c) => c.userName.toLowerCase().includes(claimerSearch.toLowerCase()))
        );
    }, [claimerSearch, claimers]);

    const handleUpdate = async () => {
        const payload = {
            ...itemData,
            claimedBy: itemData.status === "claimed" ? itemData.claimedBy : null,
        };

        const { success, message } = await updateItem(id, payload);
        if (!success) {
            toast({ title: "Error", description: message, status: "error", isClosable: true });
        } else {
            toast({ title: "Success", description: message, status: "success", isClosable: true });
            navigate("/");
        }
    };

    return (
        <Container maxW="container.sm">
            <VStack spacing={8} py={8}>
                <Heading as="h1" size="2xl" textAlign="center">
                    Edit Item
                </Heading>

                <Box w="full" bg={useColorModeValue("white", "gray.800")} p={6} rounded="lg" shadow="md">
                    <VStack spacing={4}>
                        <Input
                            placeholder="Name"
                            value={itemData.name}
                            onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
                        />
                        <Textarea
                            placeholder="Description (optional)"
                            value={itemData.description}
                            onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
                        />
                        <Input
                            placeholder="Found At (optional)"
                            value={itemData.foundAt}
                            onChange={(e) => setItemData({ ...itemData, foundAt: e.target.value })}
                        />
                        <Input
                            placeholder="Image URL"
                            value={itemData.image}
                            onChange={(e) => setItemData({ ...itemData, image: e.target.value })}
                        />

                        <Select
                            value={itemData.status}
                            onChange={(e) => setItemData({ ...itemData, status: e.target.value })}
                        >
                            <option value="unclaimed">Unclaimed</option>
                            <option value="claimed">Claimed</option>
                        </Select>

                        {/* Finder Search & Selection */}
                        <Input
                            placeholder="Search Finder by Username"
                            value={finderSearch}
                            onChange={(e) => setFinderSearch(e.target.value)}
                        />
                        {finderSearch && (
                            <List w="full" maxH="150px" overflowY="auto">
                                {filteredFinders.map((f) => (
                                    <ListItem
                                        key={f._id}
                                        p={2}
                                        _hover={{ bg: "gray.200", cursor: "pointer" }}
                                        onClick={() => {
                                            setItemData({ ...itemData, foundBy: f._id });
                                            setFinderSearch(f.userName);
                                        }}
                                    >
                                        {f.userName}
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Claimer Search & Selection (only if claimed) */}
                        {itemData.status === "claimed" && (
                            <>
                                <Input
                                    placeholder="Search Claimer by Username"
                                    value={claimerSearch}
                                    onChange={(e) => setClaimerSearch(e.target.value)}
                                />
                                {claimerSearch && (
                                    <List w="full" maxH="150px" overflowY="auto">
                                        {filteredClaimers.map((c) => (
                                            <ListItem
                                                key={c._id}
                                                p={2}
                                                _hover={{ bg: "gray.200", cursor: "pointer" }}
                                                onClick={() => {
                                                    setItemData({ ...itemData, claimedBy: c._id });
                                                    setClaimerSearch(c.userName);
                                                }}
                                            >
                                                {c.userName}
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </>
                        )}

                        <Button colorScheme="blue" onClick={handleUpdate} w="full">
                            Update Item
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default EditItemPage;
