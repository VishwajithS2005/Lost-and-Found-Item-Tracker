import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Text, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useFinderStore } from "../store/FinderStore";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const FinderCard = ({ finder }) => {
    const bg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.700", "gray.200");

    const { deleteFinder } = useFinderStore();
    const { employee } = useAuthStore();
    const toast = useToast();
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const { success, message } = await deleteFinder(id);
        if (!success) {
            toast({ title: "Error", description: message, status: "error", duration: 3000, isClosable: true });
        } else {
            toast({ title: "Success", description: message, status: "success", duration: 3000, isClosable: true });
        }
    };

    return (
        <Box
            bg={bg}
            shadow="lg"
            rounded="lg"
            p={4}
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <VStack align="start" spacing={2}>
                <Text fontWeight="bold" fontSize="xl">
                    {finder.name}
                </Text>
                <Text fontSize="sm" color={textColor}>
                    Contact: {finder.contactInfo || "unavailable"}
                </Text>
                <Text fontSize="sm" color={textColor}>
                    Username: {finder.userName}
                </Text>
                {employee && ( // 👈 only show buttons if logged in
                    <HStack spacing={2} mt={4} justify="flex-end" w="full">
                        <Button leftIcon={<EditIcon />} colorScheme="blue" size="sm" onClick={() => navigate(`/edit-finder/${finder._id}`)}>
                            Edit
                        </Button>
                        <Button leftIcon={<DeleteIcon />} colorScheme="red" size="sm" onClick={() => handleDelete(finder._id)}>
                            Delete
                        </Button>
                    </HStack>
                )}
            </VStack>
        </Box>
    );
};

export default FinderCard;
