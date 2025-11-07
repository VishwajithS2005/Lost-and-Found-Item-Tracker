import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import ItemCard from "../components/ItemCard";
import { vi } from "vitest";
import { useAuthStore } from "../store/AuthStore";
import { useItemStore } from "../store/ItemStore";
import { useNavigate } from "react-router-dom";

vi.mock("../store/AuthStore", () => ({
    useAuthStore: vi.fn(),
}));
vi.mock("../store/ItemStore", () => ({
    useItemStore: vi.fn(),
}));
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

const mockItem = {
    _id: "i1",
    name: "Laptop",
    description: "Silver Dell XPS",
    dateSubmitted: new Date("2024-10-10").toISOString(),
    foundAt: "Library",
    foundBy: { name: "John", contactInfo: "9999999999" },
    status: "unclaimed",
    image: "https://placehold.co/300x200",
};

const mockDeleteItem = vi.fn().mockResolvedValue({ success: true, message: "Item deleted" });
const mockNavigate = vi.fn();

describe("ItemCard Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
        useItemStore.mockReturnValue({ deleteItem: mockDeleteItem });
    });

    test("renders item info properly", () => {
        useAuthStore.mockReturnValue({ employee: null });

        render(
            <ChakraProvider>
                <ItemCard item={mockItem} />
            </ChakraProvider>
        );

        expect(screen.getByText("Laptop")).toBeInTheDocument();
        expect(screen.getByText(/Silver Dell XPS/i)).toBeInTheDocument();
        expect(screen.getByText(/Library/i)).toBeInTheDocument();
        expect(screen.getByText(/9999999999/i)).toBeInTheDocument();

        expect(screen.queryByRole("button", { name: /Edit/i })).not.toBeInTheDocument();
    });

    test("shows Edit and Delete buttons when logged in", () => {
        useAuthStore.mockReturnValue({ employee: { id: "emp1" } });

        render(
            <ChakraProvider>
                <ItemCard item={mockItem} />
            </ChakraProvider>
        );

        expect(screen.getByRole("button", { name: /Edit/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
    });

    test("clicking Delete triggers deleteItem", async () => {
        useAuthStore.mockReturnValue({ employee: { id: "emp1" } });

        render(
            <ChakraProvider>
                <ItemCard item={mockItem} />
            </ChakraProvider>
        );

        const deleteButton = screen.getByRole("button", { name: /Delete/i });
        fireEvent.click(deleteButton);

        expect(mockDeleteItem).toHaveBeenCalledWith("i1");
    });
});
