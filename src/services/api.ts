const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  description: string;
}

export interface Instruction {
  step: number;
  title: string;
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
  heroImage: string | null;
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

export type RecipeEventHandler = {
  onRecipe: (recipe: Recipe) => void;
  onHeroImage: (image: string) => void;
  onStepImage: (index: number, image: string) => void;
  onComplete: (images: { hero: string; steps: string[] }) => void;
  onError: (error: string) => void;
};

export async function generateRecipeStream(
  prompt: string,
  handlers: RecipeEventHandler
): Promise<void> {
  const response = await fetch(`${API_URL}/api/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('Response body not available');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          switch (data.type) {
            case 'recipe':
              handlers.onRecipe(data.data);
              break;
            case 'hero':
              handlers.onHeroImage(data.data);
              break;
            case 'step':
              handlers.onStepImage(data.index, data.data);
              break;
            case 'complete':
              const images = { hero: '', steps: [] as string[] };
              handlers.onComplete(images);
              break;
            case 'error':
              handlers.onError(data.error);
              break;
          }
        } catch (e) {
          console.error('Failed to parse SSE data:', e);
        }
      }
    }
  }
}

export async function regenerateImagesStream(
  id: string,
  handlers: Pick<RecipeEventHandler, 'onHeroImage' | 'onStepImage' | 'onComplete' | 'onError'>
): Promise<void> {
  const response = await fetch(`${API_URL}/api/recipes/${id}/regenerate-images`, {
    method: 'POST'
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('Response body not available');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          switch (data.type) {
            case 'hero':
              handlers.onHeroImage(data.data);
              break;
            case 'step':
              handlers.onStepImage(data.index, data.data);
              break;
            case 'complete':
              handlers.onComplete({ hero: '', steps: [] });
              break;
            case 'error':
              handlers.onError(data.error);
              break;
          }
        } catch (e) {
          console.error('Failed to parse SSE data:', e);
        }
      }
    }
  }
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
  } catch (error: unknown) {
    clearTimeout(id);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw error;
    }
    throw new Error('An unknown error occurred');
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