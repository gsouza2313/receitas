import { recipes as seedRecipes, type Recipe } from "@/lib/data";

let recipes: Recipe[] = [...seedRecipes];

export function getRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}

export function createRecipe(data: Omit<Recipe, "id">): Recipe {
  const recipe: Recipe = { ...data, id: crypto.randomUUID() };
  recipes = [recipe, ...recipes];
  return recipe;
}

export function updateRecipe(
  id: string,
  data: Omit<Recipe, "id">
): Recipe | undefined {
  let updated: Recipe | undefined;
  recipes = recipes.map((recipe) => {
    if (recipe.id !== id) return recipe;
    updated = { ...data, id };
    return updated;
  });
  return updated;
}

export function deleteRecipe(id: string): boolean {
  const lengthBefore = recipes.length;
  recipes = recipes.filter((recipe) => recipe.id !== id);
  return recipes.length < lengthBefore;
}
