import { Container, SimpleGrid, Text, VStack, HStack, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import FinderCard from "../components/FinderCard";
import ClaimerCard from "../components/ClaimerCard";
import ItemCard from "../components/ItemCard";

import { useFinderStore } from "../store/FinderStore";
import { useClaimerStore } from "../store/ClaimerStore";
import { useItemStore } from "../store/ItemStore";

const HomePage = ({ selectedType, setSelectedType }) => {
	const { fetchFinders, finders } = useFinderStore();
	const { fetchClaimers, claimers } = useClaimerStore();
	const { fetchItems, items } = useItemStore();

	useEffect(() => {
		if (selectedType === "finder") fetchFinders();
		if (selectedType === "claimer") fetchClaimers();
		if (selectedType === "item") fetchItems();
	}, [selectedType]);

	const dataMap = {
		finder: finders,
		claimer: claimers,
		item: items,
	};

	const displayData = dataMap[selectedType] || [];
	const CardComponent = {
		finder: FinderCard,
		claimer: ClaimerCard,
		item: ItemCard,
	}[selectedType];

	return (
		<Container maxW="container.xl" py={8}>
			<VStack spacing={6}>
				<HStack spacing={4}>
					{["finder", "claimer", "item"].map((type) => (
						<Button
							key={type}
							colorScheme={selectedType === type ? "blue" : "gray"}
							onClick={() => setSelectedType(type)}
						>
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</Button>
					))}
				</HStack>

				<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
					{displayData.length > 0 ? (
						displayData.map((item) => <CardComponent key={item._id} {...{ [selectedType]: item }} />)
					) : (
						<Text fontSize="xl" textAlign="center" w="full">
							No {selectedType}s found 😢
						</Text>
					)}
				</SimpleGrid>
			</VStack>
		</Container>
	);
};

export default HomePage;