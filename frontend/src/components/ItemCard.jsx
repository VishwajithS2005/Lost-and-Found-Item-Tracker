import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack, Image, Text, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useItemStore } from "../store/ItemStore";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
    const bg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.600", "gray.200");

    const { deleteItem } = useItemStore();
    const { employee } = useAuthStore();
    const toast = useToast();
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const { success, message } = await deleteItem(id);
        if (!success) {
            toast({ title: "Error", description: message, status: "error", duration: 3000, isClosable: true });
        } else {
            toast({ title: "Success", description: message, status: "success", duration: 3000, isClosable: true });
        }
    };

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={item.image} alt={item.name} h={48} w="full" objectFit="cover" />
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {item.name}
                </Heading>

                <Text color={textColor} mb={1}>
                    Description: {item.description || "unavailable"}
                </Text>
                <Text color={textColor} mb={1}>
                    Date Submitted: {new Date(item.dateSubmitted).toLocaleDateString()}
                </Text>
                <Text color={textColor} mb={1}>
                    Found At: {item.foundAt || "unavailable"}
                </Text>
                <Text color={textColor} mb={1}>
                    Finder: {item.foundBy?.name} ({item.foundBy?.contactInfo})
                </Text>
                <Text color={textColor} mb={1}>
                    Status: {item.status}
                </Text>
                {item.status === "claimed" && item.claimedBy && (
                    <Text color={textColor}>
                        Claimer: {item.claimedBy.name} ({item.claimedBy.contactInfo})
                    </Text>
                )}

                {employee && ( // 👈 only show buttons if logged in
                    <HStack spacing={2} mt={4} justify="flex-end" w="full">
                        <Button leftIcon={<EditIcon />} colorScheme="blue" size="sm" onClick={() => navigate(`/edit-item/${item._id}`)}>
                            Edit
                        </Button>
                        <Button leftIcon={<DeleteIcon />} colorScheme="red" size="sm" onClick={() => handleDelete(item._id)}>
                            Delete
                        </Button>
                    </HStack>
                )}
            </Box>
        </Box>
    );
};

export default ItemCard;
