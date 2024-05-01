import { create } from "zustand";
import { User } from "@/types";

interface  useMeStore {
  organizationId: any;
  meData: User | null;
  setMeData: (user: User | null) => void;

  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useMeStore = create<useMeStore>((set) => ({
  organizationId: null, // Add the organizationId property
  meData: null,
  setMeData: (meData) => set({ meData }),

  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useMeStore;