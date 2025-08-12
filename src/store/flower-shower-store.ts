
import { create } from 'zustand';

interface FlowerShowerState {
  showFlowerPreview: boolean;
  setShowFlowerPreview: (show: boolean) => void;
}

export const useFlowerShowerStore = create<FlowerShowerState>((set) => ({
  showFlowerPreview: false,
  setShowFlowerPreview: (show) => set({ showFlowerPreview: show }),
}));
