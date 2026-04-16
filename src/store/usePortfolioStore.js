import { create } from "zustand";
import { projects } from "../data/projects";

export const usePortfolioStore = create((set) => ({
  projects,
  savedIds: projects.filter((project) => project.saved).map((project) => project.id),
  messages: [],
  isOverlayOpen: false,
  toggleSaved: (projectId) =>
    set((state) => {
      const exists = state.savedIds.includes(projectId);
      return {
        savedIds: exists
          ? state.savedIds.filter((id) => id !== projectId)
          : [...state.savedIds, projectId],
      };
    }),
  addMessage: ({ text = "", image = "", sticker = "", video = "" }) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `m${state.messages.length + 1}`,
          from: "user",
          text,
          image,
          sticker,
          video,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    })),
  setOverlayOpen: (isOverlayOpen) => set({ isOverlayOpen }),
}));
