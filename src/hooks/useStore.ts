import { create } from "zustand";

interface StatusState {
  ready: boolean;
  isReady: () => void;
}

const useStore = create<StatusState>()((set) => ({
    ready: false,
    isReady: () => set({ ready: true }),
}));


export { useStore };