import { create } from "zustand";

export const useItemStore = create((set) => ({
    items: [],
    setItems: (items) => set({ items }),

    createItem: async (newItem) => {
        if (!newItem.name || !newItem.image || !newItem.foundBy) {
            return { success: false, message: "Name, Image, and Finder are required." };
        }

        const res = await fetch("/api/item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        });
        const data = await res.json();
        if (!data.Success) return { success: false, message: data.Message };

        set((state) => ({ items: [...state.items, data.Details] }));
        return { success: true, message: data.Message };
    },

    fetchItems: async () => {
        const res = await fetch("/api/item");
        const data = await res.json();
        set({ items: data.Details });
    },

    deleteItem: async (id) => {
        const res = await fetch(`/api/item/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (!data.Success) return { success: false, message: data.Message };

        set((state) => ({ items: state.items.filter((item) => item._id !== id) }));
        return { success: true, message: data.Message };
    },

    updateItem: async (id, updatedItem) => {
        const res = await fetch(`/api/item/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedItem),
        });
        const data = await res.json();
        if (!data.Success) return { success: false, message: data.Message };

        set((state) => ({
            items: state.items.map((item) => (item._id === id ? data.Details : item)),
        }));
        return { success: true, message: data.Message };
    },
}));
