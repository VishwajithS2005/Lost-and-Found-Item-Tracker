import { useState } from "react";
import { Box, Button, Input, VStack, Heading, useToast } from "@chakra-ui/react";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { success, message } = await login(userName, password);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) navigate("/");
  };

  return (
    <Box maxW="sm" mx="auto" mt={20} p={8} rounded="lg" shadow="md">
      <VStack spacing={4}>
        <Heading size="md">Employee Login</Heading>
        <Input placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme="blue" w="full" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
