import { create } from "zustand";

export const useClaimerStore = create((set) => ({
	claimers: [],
	setClaimers: (claimers) => set({ claimers }),
	createClaimer: async (newClaimer) => {
		if (!newClaimer.name || !newClaimer.contactInfo || !newClaimer.userName) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/claimer", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newClaimer),
		});
		const data = await res.json();
		if (!data.Success) return { success: false, message: data.Message };

		set((state) => ({ claimers: [...state.claimers, data.Details] }));
		return { success: true, message: data.Message };
	},
	fetchClaimers: async () => {
		const res = await fetch("/api/claimer");
		const data = await res.json();
		set({ claimers: data.Details });
	},
	deleteClaimer: async (cid) => {
		const res = await fetch(`/api/claimer/${cid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.Success) return { success: false, message: data.Message };

		set((state) => ({ claimers: state.claimers.filter((claimer) => claimer._id !== cid) }));
		return { success: true, message: data.Message };
	},
	updateClaimer: async (cid, updatedClaimer) => {
		const res = await fetch(`/api/claimer/${cid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedClaimer),
		});
		const data = await res.json();
		if (!data.Success) return { success: false, message: data.Message };

		set((state) => ({
			claimers: state.claimers.map((claimer) => (claimer._id === cid ? data.Details : claimer)),
		}));

		return { success: true, message: data.Message };
	},
}));
