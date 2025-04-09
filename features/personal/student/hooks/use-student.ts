import { create } from "zustand";

type Student = {
  open: boolean;
  setOpen: (state: boolean) => void;
  setClose: () => void;
};

export const useStudent = create<Student>((set) => ({
  open: false,
  setOpen: (state) => set({ open: state }),
  setClose: () => set({ open: false }),
}));
