"use client";

import { useState } from "react";

import RecipeCard from "@/components/RecipeCard";
import RecipeFormModal from "@/components/recipe-form-modal";
import { Button } from "@/components/ui/button";
import { recipes as initialRecipes, type Recipe } from "@/lib/data";

export default function ReceitasPage() {
    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const handleCreateRecipe = (recipe: Recipe) => {
        setRecipes((current) => [recipe, ...current]);
    };

    return (
        <main className="grow py-8">
            <div className="container mx-auto py-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Todas as receitas</h1>
                    <Button onClick={() => setIsFormModalOpen(true)}>
                        Nova receita
                    </Button>
                </div>
                <div className="grid grid-cols-3 gap-8 nt-8 py-8">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>

            <RecipeFormModal
                open={isFormModalOpen}
                onOpenChange={setIsFormModalOpen}
                onCreateRecipe={handleCreateRecipe}
            />
        </main>
    )
}