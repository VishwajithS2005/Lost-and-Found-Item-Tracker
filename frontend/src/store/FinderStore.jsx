import { create } from "zustand";

export const useFinderStore = create((set) => ({
	finders: [],
	setFinders: (finders) => set({ finders }),
	createFinder: async (newFinder) => {
		if (!newFinder.name || !newFinder.contactInfo || !newFinder.userName) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/finder", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newFinder),
		});
		const data = await res.json();
		if (!data.Success) return { success: false, message: data.Message };

		set((state) => ({ finders: [...state.finders, data.Details] }));
		return { success: true, message: data.Message };
	},
	fetchFinders: async () => {
		const res = await fetch("/api/finder");
		const data = await res.json();
		set({ finders: data.Details });
	},
	deleteFinder: async (fid) => {
		const res = await fetch(`/api/finder/${fid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.Success) return { success: false, message: data.Message };

		set((state) => ({ finders: state.finders.filter((finder) => finder._id !== fid) }));
		return { success: true, message: data.Message };
	},
	updateFinder: async (fid, updatedFinder) => {
		const res = await fetch(`/api/finder/${fid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedFinder),
		});
		const data = await res.json();
		if (!data.Success) return { success: false, message: data.Message };

		set((state) => ({
			finders: state.finders.map((finder) => (finder._id === fid ? data.Details : finder)),
		}));

		return { success: true, message: data.Message };
	},
}));
