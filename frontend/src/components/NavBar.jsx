import { Button, Container, Flex, HStack, Text, useColorMode, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { TbLogout, TbLogin } from "react-icons/tb";

const Navbar = ({ selectedType }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { employee, logout } = useAuthStore();
    const navigate = useNavigate();
    const toast = useToast(); // ✅ added

    const createLink = {
        finder: "/create-finder",
        claimer: "/create-claimer",
        item: "/create-item",
    }[selectedType || "item"];

    const handleLogout = () => {
        logout();
        navigate("/");
        toast({
            title: "Logged out",
            description: "Successfully logged out.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{ base: "column", sm: "row" }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>Lost and Found Item Tracker</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    {employee && (
                        <Link to={createLink}>
                            <Button>
                                <PlusSquareIcon fontSize={20} />
                            </Button>
                        </Link>
                    )}
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
                    </Button>
                    {employee ? (
                        <Button colorScheme="red" onClick={handleLogout} name="logout" aria-label="logout">
                            <TbLogout fontSize={20} />
                        </Button>
                    ) : (
                        <Button colorScheme="green" onClick={() => navigate("/login")} name="login" aria-label="login">
                            <TbLogin fontSize={20} />
                        </Button>
                    )}
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
