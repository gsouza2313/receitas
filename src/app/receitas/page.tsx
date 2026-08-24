"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { toast } from "sonner";

import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import RecipeCard from "@/components/RecipeCard";
import RecipeFormModal from "@/components/RecipeFormModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import type { Recipe } from "@/lib/data";

export default function ReceitasPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const { data } = await api.get<Recipe[]>("/receitas");
                setRecipes(data);
            } catch {
                toast.error("Não foi possível carregar as receitas.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const filteredRecipes = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return recipes;
        return recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(term)
        );
    }, [recipes, searchTerm]);

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

    const handleSaveRecipe = async (recipeData: Omit<Recipe, "id"> | Recipe) => {
        try {
            if (modalMode === "create") {
                const { data: newRecipe } = await api.post<Recipe>(
                    "/receitas",
                    recipeData
                );
                setRecipes((current) => [newRecipe, ...current]);
                toast.success("Receita criada com sucesso.");
            } else {
                const updatedRecipe = recipeData as Recipe;
                const { data } = await api.put<Recipe>(
                    `/receitas/${updatedRecipe.id}`,
                    updatedRecipe
                );
                setRecipes((current) =>
                    current.map((recipe) => (recipe.id === data.id ? data : recipe))
                );
                toast.success("Receita atualizada com sucesso.");
            }
            handleCloseFormModal();
        } catch {
            toast.error("Não foi possível salvar a receita.");
        }
    };

    const handleOpenDeleteModal = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedRecipe(undefined);
    };

    const handleDeleteRecipe = async () => {
        if (!selectedRecipe) return;
        try {
            await api.delete(`/receitas/${selectedRecipe.id}`);
            setRecipes((current) =>
                current.filter((recipe) => recipe.id !== selectedRecipe.id)
            );
            toast.success("Receita excluída com sucesso.");
        } catch {
            toast.error("Não foi possível excluir a receita.");
        } finally {
            handleCloseDeleteModal();
        }
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

                <div className="relative mt-6 max-w-sm">
                    <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar receita pelo nome..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {isLoading ? (
                    <p className="mt-8 text-muted-foreground">Carregando receitas...</p>
                ) : filteredRecipes.length === 0 ? (
                    <p className="mt-8 text-muted-foreground">
                        Nenhuma receita encontrada.
                    </p>
                ) : (
                    <div className="grid grid-cols-3 gap-8 nt-8 py-8">
                        {filteredRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onEdit={() => handleOpenEditModal(recipe)}
                                onDelete={() => handleOpenDeleteModal(recipe)}
                            />
                        ))}
                    </div>
                )}
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
