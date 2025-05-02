import { ReactNode } from "react";
import { create } from "zustand";

type State = {
  open: boolean;
  component: ReactNode | null;
};

type Action = {
  openPanel: (compoent: ReactNode) => void;
  closePanel: () => void;
};

const initialState: State = {
  open: false,
  component: null,
};

export const usePanelSlice = create<State & Action>()((set, get) => ({
  ...initialState,
  openPanel: (component: ReactNode) => {
    set({ open: true, component });
  },
  closePanel: () => set(initialState),
}));
