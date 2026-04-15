import { create } from 'zustand';

interface ImageStore {
  recipeImages: Map<string, { hero: string; steps: string[] }>;
  setRecipeImage: (recipeId: string, images: { hero: string; steps: string[] }) => void;
  getRecipeImage: (recipeId: string) => { hero: string; steps: string[] } | undefined;
  clearImages: () => void;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  recipeImages: new Map(),
  
  setRecipeImage: (recipeId, images) => {
    set((state) => {
      const newMap = new Map(state.recipeImages);
      newMap.set(recipeId, images);
      return { recipeImages: newMap };
    });
  },
  
  getRecipeImage: (recipeId) => {
    return get().recipeImages.get(recipeId);
  },
  
  clearImages: () => {
    set({ recipeImages: new Map() });
  }
}));