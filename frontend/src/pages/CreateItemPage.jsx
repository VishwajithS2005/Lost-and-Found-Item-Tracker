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

const CreateItemPage = () => {
    const [newItem, setNewItem] = useState({
        name: "",
        description: "",
        foundAt: "",
        image: "",
        status: "unclaimed",
        foundBy: "",
        claimedBy: "",
    });

    const toast = useToast();
    const { createItem } = useItemStore();
    const { fetchFinders, finders } = useFinderStore();
    const { fetchClaimers, claimers } = useClaimerStore();

    const [finderSearch, setFinderSearch] = useState("");
    const [claimerSearch, setClaimerSearch] = useState("");
    const [filteredFinders, setFilteredFinders] = useState([]);
    const [filteredClaimers, setFilteredClaimers] = useState([]);

    useEffect(() => {
        fetchFinders();
        fetchClaimers();
    }, []);

    useEffect(() => {
        setFilteredFinders(
            finders.filter((f) =>
                f.userName.toLowerCase().includes(finderSearch.toLowerCase())
            )
        );
    }, [finderSearch, finders]);

    useEffect(() => {
        setFilteredClaimers(
            claimers.filter((c) =>
                c.userName.toLowerCase().includes(claimerSearch.toLowerCase())
            )
        );
    }, [claimerSearch, claimers]);

    const handleAddItem = async () => {
        const payload = {
            ...newItem,
            claimedBy: newItem.status === "claimed" ? newItem.claimedBy || null : null,
        };

        const { success, message } = await createItem(payload);

        if (!success) {
            toast({ title: "Error", description: message, status: "error", isClosable: true });
        } else {
            toast({ title: "Success", description: message, status: "success", isClosable: true });
            setNewItem({
                name: "",
                description: "",
                foundAt: "",
                image: "",
                status: "unclaimed",
                foundBy: "",
                claimedBy: "",
            });
            setFinderSearch("");
            setClaimerSearch("");
        }
    };

    return (
        <Container maxW="container.sm">
            <VStack spacing={8}>
                <Heading as="h1" size="2xl" textAlign="center" mb={8}>
                    Create New Item
                </Heading>

                <Box w="full" bg={useColorModeValue("white", "gray.800")} p={6} rounded="lg" shadow="md">
                    <VStack spacing={4}>
                        <Input
                            placeholder="Name"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        />
                        <Textarea
                            placeholder="Description (optional)"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        />
                        <Input
                            placeholder="Found At (optional)"
                            value={newItem.foundAt}
                            onChange={(e) => setNewItem({ ...newItem, foundAt: e.target.value })}
                        />
                        <Input
                            placeholder="Image URL"
                            value={newItem.image}
                            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                        />

                        <Select
                            value={newItem.status}
                            onChange={(e) => {
                                const newStatus = e.target.value;
                                setNewItem({
                                    ...newItem,
                                    status: newStatus,
                                    claimedBy: newStatus === "unclaimed" ? "" : newItem.claimedBy,
                                });
                            }}
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
                                            setNewItem({ ...newItem, foundBy: f._id });
                                            setFinderSearch(f.userName);
                                        }}
                                    >
                                        {f.userName}
                                    </ListItem>
                                ))}
                            </List>
                        )}

                        {/* Claimer Search & Selection */}
                        {newItem.status === "claimed" && (
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
                                                    setNewItem({ ...newItem, claimedBy: c._id });
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

                        <Button colorScheme="blue" onClick={handleAddItem} w="full">
                            Add Item
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreateItemPage;
