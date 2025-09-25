import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = ({ selectedType }) => {
	const { colorMode, toggleColorMode } = useColorMode();

	// Map type to create page route
	const createLink = {
		finder: "/create-finder",
		claimer: "/create-claimer",
		item: "/create-item",
	}[selectedType || "item"];

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
					<Link to={createLink}>
						<Button>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};

export default Navbar;
