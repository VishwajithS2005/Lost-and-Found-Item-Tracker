import { create } from "zustand";

export const useAuthStore = create((set) => ({
  employee: JSON.parse(sessionStorage.getItem("employee")) || null,
  loading: false,
  error: null,

  login: async (userName, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/employee/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();

      if (!data.Success) {
        set({ loading: false, error: data.Message });
        return { success: false, message: data.Message };
      }

      // ✅ Save to sessionStorage
      sessionStorage.setItem("employee", JSON.stringify(data.Details));
      set({ employee: data.Details, loading: false });

      return { success: true, message: data.Message };
    } catch (err) {
      set({ loading: false, error: err.message });
      return { success: false, message: err.message };
    }
  },

  logout: () => {
    sessionStorage.removeItem("employee");
    set({ employee: null });
  },
}));
