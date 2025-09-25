import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useFinderStore } from "../store/FinderStore";

const CreateFinderPage = () => {
    const [newFinder, setNewFinder] = useState({
        name: "",
        contactInfo: "",
        userName: "",
    });
    const toast = useToast();

    const { createFinder } = useFinderStore();

    const handleAddFinder = async () => {
        const { success, message } = await createFinder(newFinder);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
        }
        setNewFinder({ name: "", contactInfo: "", userName: "" });
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Finder
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Name'
                            name='name'
                            value={newFinder.name}
                            onChange={(e) => setNewFinder({ ...newFinder, name: e.target.value })}
                        />
                        <Input
                            placeholder='Contact Info'
                            name='contactInfo'
                            value={newFinder.contactInfo}
                            onChange={(e) => setNewFinder({ ...newFinder, contactInfo: e.target.value })}
                        />
                        <Input
                            placeholder='Username'
                            name='userName'
                            value={newFinder.userName}
                            onChange={(e) => setNewFinder({ ...newFinder, userName: e.target.value })}
                        />

                        <Button colorScheme='blue' onClick={handleAddFinder} w='full'>
                            Add Finder
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreateFinderPage;
