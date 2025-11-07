import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import FinderCard from "../components/FinderCard";
import { vi } from "vitest";
import { useAuthStore } from "../store/AuthStore";
import { useFinderStore } from "../store/FinderStore";
import { useNavigate } from "react-router-dom";

vi.mock("../store/AuthStore", () => ({
    useAuthStore: vi.fn(),
}));
vi.mock("../store/FinderStore", () => ({
    useFinderStore: vi.fn(),
}));
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

const mockFinder = {
    _id: "123",
    name: "John Doe",
    contactInfo: "9876543210",
    userName: "johndoe",
};

const mockDeleteFinder = vi.fn().mockResolvedValue({ success: true, message: "Deleted successfully" });
const mockNavigate = vi.fn();

describe("FinderCard Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
        useFinderStore.mockReturnValue({ deleteFinder: mockDeleteFinder });
    });

    test("renders finder details correctly", () => {
        useAuthStore.mockReturnValue({ employee: null });

        render(
            <ChakraProvider>
                <FinderCard finder={mockFinder} />
            </ChakraProvider>
        );

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText(/Contact:/i)).toHaveTextContent("9876543210");
        expect(screen.getByText(/Username:/i)).toHaveTextContent("johndoe");

        expect(screen.queryByRole("button", { name: /Edit/i })).not.toBeInTheDocument();
    });

    test("shows Edit and Delete buttons when logged in", () => {
        useAuthStore.mockReturnValue({ employee: { id: "emp1", name: "Employee" } });

        render(
            <ChakraProvider>
                <FinderCard finder={mockFinder} />
            </ChakraProvider>
        );

        expect(screen.getByRole("button", { name: /Edit/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
    });

    test("clicking Delete calls deleteFinder", async () => {
        useAuthStore.mockReturnValue({ employee: { id: "emp1" } });

        render(
            <ChakraProvider>
                <FinderCard finder={mockFinder} />
            </ChakraProvider>
        );

        const deleteButton = screen.getByRole("button", { name: /Delete/i });
        fireEvent.click(deleteButton);

        expect(mockDeleteFinder).toHaveBeenCalledWith("123");
    });
});
