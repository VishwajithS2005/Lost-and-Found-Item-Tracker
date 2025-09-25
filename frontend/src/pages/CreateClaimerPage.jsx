import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useClaimerStore } from "../store/ClaimerStore";

const CreateClaimerPage = () => {
    const [newClaimer, setNewClaimer] = useState({
        name: "",
        contactInfo: "",
        userName: "",
    });
    const toast = useToast();

    const { createClaimer } = useClaimerStore();

    const handleAddClaimer = async () => {
        const { success, message } = await createClaimer(newClaimer);
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
        setNewClaimer({ name: "", contactInfo: "", userName: "" });
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Claimer
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Name'
                            name='name'
                            value={newClaimer.name}
                            onChange={(e) => setNewClaimer({ ...newClaimer, name: e.target.value })}
                        />
                        <Input
                            placeholder='Contact Info'
                            name='contactInfo'
                            value={newClaimer.contactInfo}
                            onChange={(e) => setNewClaimer({ ...newClaimer, contactInfo: e.target.value })}
                        />
                        <Input
                            placeholder='Username'
                            name='userName'
                            value={newClaimer.userName}
                            onChange={(e) => setNewClaimer({ ...newClaimer, userName: e.target.value })}
                        />

                        <Button colorScheme='blue' onClick={handleAddClaimer} w='full'>
                            Add Claimer
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};
export default CreateClaimerPage;
