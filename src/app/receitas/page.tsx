"use client";

import { useState } from "react";

import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import RecipeCard from "@/components/RecipeCard";
import RecipeFormModal from "@/components/RecipeFormModal";
import { Button } from "@/components/ui/button";
import { recipes as initialRecipes, type Recipe } from "@/lib/data";

export default function ReceitasPage() {
    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);

    const handleOpenCreateModal = () => {
        setModalMode("create");
        setSelectedRecipe(undefined);
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (recipe: Recipe) => {
        setModalMode("edit");
        setSelectedRecipe(recipe);
        setIsFormModalOpen(true);
    };

    const handleCloseFormModal = () => {
        setIsFormModalOpen(false);
    };

    const handleSaveRecipe = (recipeData: Omit<Recipe, "id"> | Recipe) => {
        if (modalMode === "create") {
            const newRecipe: Recipe = {
                ...recipeData,
                id: crypto.randomUUID(),
            };
            setRecipes((current) => [newRecipe, ...current]);
        } else {
            const updatedRecipe = recipeData as Recipe;
            setRecipes((current) =>
                current.map((recipe) =>
                    recipe.id === updatedRecipe.id ? updatedRecipe : recipe
                )
            );
        }
        handleCloseFormModal();
    };

    const handleOpenDeleteModal = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedRecipe(undefined);
    };

    const handleDeleteRecipe = () => {
        if (!selectedRecipe) return;
        setRecipes((current) =>
            current.filter((recipe) => recipe.id !== selectedRecipe.id)
        );
        handleCloseDeleteModal();
    };

    return (
        <main className="grow py-8">
            <div className="container mx-auto py-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Todas as receitas</h1>
                    <Button onClick={handleOpenCreateModal}>
                        Nova receita
                    </Button>
                </div>
                <div className="grid grid-cols-3 gap-8 nt-8 py-8">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onEdit={() => handleOpenEditModal(recipe)}
                            onDelete={() => handleOpenDeleteModal(recipe)}
                        />
                    ))}
                </div>
            </div>

            <RecipeFormModal
                isOpen={isFormModalOpen}
                onClose={handleCloseFormModal}
                onSave={handleSaveRecipe}
                mode={modalMode}
                recipe={selectedRecipe}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteRecipe}
                recipe={selectedRecipe}
            />
        </main>
    )
}