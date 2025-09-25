import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useClaimerStore } from "../store/ClaimerStore";
import { useNavigate, useParams } from "react-router-dom";

const EditClaimerPage = () => {
    const { id } = useParams();
    const { claimers, updateClaimer, fetchClaimers } = useClaimerStore();
    const navigate = useNavigate();
    const toast = useToast();

    const [claimerData, setClaimerData] = useState({
        name: "",
        userName: "",
        contactInfo: "",
    });

    useEffect(() => {
        if (claimers.length === 0) fetchClaimers();
        const claimer = claimers.find((c) => c._id === id);
        if (claimer) {
            setClaimerData({
                name: claimer.name,
                userName: claimer.userName,
                contactInfo: claimer.contactInfo,
            });
        }
    }, [id, claimers, fetchClaimers]);

    const handleUpdate = async () => {
        const { success, message } = await updateClaimer(id, claimerData);
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
                <Heading>Edit Claimer</Heading>
                <Box w="full" bg={useColorModeValue("white", "gray.800")} p={6} rounded="lg" shadow="md">
                    <VStack spacing={4}>
                        <Input
                            placeholder="Name"
                            value={claimerData.name}
                            onChange={(e) => setClaimerData({ ...claimerData, name: e.target.value })}
                        />
                        <Input
                            placeholder="Contact Info"
                            value={claimerData.contactInfo}
                            onChange={(e) => setClaimerData({ ...claimerData, contactInfo: e.target.value })}
                        />
                        <Input
                            placeholder="Username"
                            value={claimerData.userName}
                            onChange={(e) => setClaimerData({ ...claimerData, userName: e.target.value })}
                        />
                        <Button colorScheme="blue" w="full" onClick={handleUpdate}>
                            Update Claimer
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default EditClaimerPage;
