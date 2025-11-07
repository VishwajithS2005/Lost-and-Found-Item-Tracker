import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Navbar from "../components/Navbar";
import { vi } from "vitest";

const mockUseAuthStore = vi.fn();

vi.mock("../store/AuthStore", () => ({
    useAuthStore: () => mockUseAuthStore(),
}));

test("renders login button when logged out", () => {
    mockUseAuthStore.mockReturnValue({
        employee: null,
        logout: vi.fn(),
    });

    renderWithProviders(<Navbar />);
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

test("renders logout button when logged in", () => {
    mockUseAuthStore.mockReturnValue({
        employee: { name: "John" },
        logout: vi.fn(),
    });

    renderWithProviders(<Navbar />);
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
});
