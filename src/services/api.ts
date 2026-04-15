const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Instruction {
  step: number;
  text: string;
}

export interface Recipe {
  _id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  cookingTime: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  aiMetadata: {
    textModel: string;
    imageModel: string;
    generationPrompt: string;
  };
  imagePrompts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RecipeWithImages extends Recipe {
  images: {
    hero: string;
    steps: string[];
  };
}

export interface GeneratedRecipeResponse {
  recipe: Recipe;
  images: {
    hero: string;
    steps: string[];
  };
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 60000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export async function generateRecipe(prompt: string): Promise<GeneratedRecipeResponse> {
  return fetchWithTimeout(`${API_URL}/api/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
}

export async function getRecipes(): Promise<Recipe[]> {
  return fetchWithTimeout(`${API_URL}/api/recipes`);
}

export async function getRecipe(id: string): Promise<Recipe> {
  return fetchWithTimeout(`${API_URL}/api/recipes/${id}`);
}

export async function deleteRecipe(id: string): Promise<void> {
  return fetchWithTimeout(`${API_URL}/api/recipes/${id}`, {
    method: 'DELETE'
  });
}

export async function regenerateImages(id: string): Promise<{ images: { hero: string; steps: string[] } }> {
  return fetchWithTimeout(`${API_URL}/api/recipes/${id}/regenerate-images`, {
    method: 'POST'
  });
}

export interface Preference {
  _id: string;
  deviceId: string;
  favoriteRecipeIds: string[];
  createdAt: string;
  lastActive: string;
}

export async function getPreferences(deviceId: string): Promise<Preference> {
  return fetchWithTimeout(`${API_URL}/api/preferences/${deviceId}`);
}

export async function addFavorite(deviceId: string, recipeId: string): Promise<Preference> {
  return fetchWithTimeout(`${API_URL}/api/preferences/${deviceId}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipeId })
  });
}

export async function removeFavorite(deviceId: string, recipeId: string): Promise<Preference> {
  return fetchWithTimeout(`${API_URL}/api/preferences/${deviceId}/favorites/${recipeId}`, {
    method: 'DELETE'
  });
}