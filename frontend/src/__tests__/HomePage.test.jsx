import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "../pages/HomePage";
import { useFinderStore } from "../store/FinderStore";
import { useClaimerStore } from "../store/ClaimerStore";
import { useItemStore } from "../store/ItemStore";
import { vi } from "vitest";

vi.mock("../store/FinderStore");
vi.mock("../store/ClaimerStore");
vi.mock("../store/ItemStore");

const mockFetchFinders = vi.fn();
const mockFetchClaimers = vi.fn();
const mockFetchItems = vi.fn();

beforeEach(() => {
    vi.clearAllMocks();
    useFinderStore.mockReturnValue({ fetchFinders: mockFetchFinders, finders: [] });
    useClaimerStore.mockReturnValue({ fetchClaimers: mockFetchClaimers, claimers: [] });
    useItemStore.mockReturnValue({ fetchItems: mockFetchItems, items: [] });
});

test("renders buttons for finder, claimer, item", () => {
    render(
        <ChakraProvider>
            <HomePage selectedType="finder" setSelectedType={() => { }} />
        </ChakraProvider>
    );
    expect(screen.getByRole("button", { name: /Item/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Finder/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Claimer/i })).toBeInTheDocument();
});

test("shows 'No finders found' when empty", () => {
    render(
        <ChakraProvider>
            <HomePage selectedType="finder" setSelectedType={() => { }} />
        </ChakraProvider>
    );
    expect(screen.getByText(/No finders found/i)).toBeInTheDocument();
});

test("calls fetchFinders on mount when selectedType is finder", () => {
    render(
        <ChakraProvider>
            <HomePage selectedType="finder" setSelectedType={() => { }} />
        </ChakraProvider>
    );
    expect(mockFetchFinders).toHaveBeenCalledTimes(1);
    expect(mockFetchClaimers).not.toHaveBeenCalled();
    expect(mockFetchItems).not.toHaveBeenCalled();
});

test("calls setSelectedType when a different button is clicked", () => {
    const mockSetSelectedType = vi.fn();

    render(
        <ChakraProvider>
            <HomePage selectedType="finder" setSelectedType={mockSetSelectedType} />
        </ChakraProvider>
    );

    const itemButton = screen.getByRole("button", { name: /Item/i });
    fireEvent.click(itemButton);

    expect(mockSetSelectedType).toHaveBeenCalledWith("item");
});
