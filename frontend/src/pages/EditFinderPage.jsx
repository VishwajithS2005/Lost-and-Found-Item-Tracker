import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useFinderStore } from "../store/FinderStore";
import { useNavigate, useParams } from "react-router-dom";

const EditFinderPage = () => {
    const { id } = useParams();
    const { finders, updateFinder, fetchFinders } = useFinderStore();
    const navigate = useNavigate();
    const toast = useToast();

    const [finderData, setFinderData] = useState({
        name: "",
        userName: "",
        contactInfo: "",
    });

    useEffect(() => {
        if (finders.length === 0) fetchFinders();
        const finder = finders.find((f) => f._id === id);
        if (finder) {
            setFinderData({
                name: finder.name,
                userName: finder.userName,
                contactInfo: finder.contactInfo,
            });
        }
    }, [id, finders, fetchFinders]);

    const handleUpdate = async () => {
        const { success, message } = await updateFinder(id, finderData);
        if (!success) {
            toast({ title: "Error", description: message, status: "error", isClosable: true });
        } else {
            toast({ title: "Success", description: message, status: "success", isClosable: true });
            navigate("/");
        }
    };

    return (
        <Container maxW="container.sm" py={8}>
            <VStack spacing={6}>
                <Heading>Edit Finder</Heading>
                <Box w="full" bg={useColorModeValue("white", "gray.800")} p={6} rounded="lg" shadow="md">
                    <VStack spacing={4}>
                        <Input
                            placeholder="Name"
                            value={finderData.name}
                            onChange={(e) => setFinderData({ ...finderData, name: e.target.value })}
                        />
                        <Input
                            placeholder="Contact Info"
                            value={finderData.contactInfo}
                            onChange={(e) => setFinderData({ ...finderData, contactInfo: e.target.value })}
                        />
                        <Input
                            placeholder="Username"
                            value={finderData.userName}
                            onChange={(e) => setFinderData({ ...finderData, userName: e.target.value })}
                        />
                        <Button colorScheme="blue" w="full" onClick={handleUpdate}>
                            Update Finder
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default EditFinderPage;
