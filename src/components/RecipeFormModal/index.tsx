"use client";

import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  recipeFormSchema,
  type RecipeFormValues,
} from "@/lib/form-validation/recipes";
import type { Recipe } from "@/lib/data";

interface RecipeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Omit<Recipe, "id"> | Recipe) => void;
  mode: "create" | "edit";
  recipe?: Recipe;
}

const DEFAULT_VALUES: RecipeFormValues = {
  title: "",
  description: "",
  image: "",
  category: "",
  prepTime: "",
  cookTime: "",
  servings: 1,
  ingredients: [{ value: "" }],
  instructions: [{ value: "" }],
};

export default function RecipeFormModal({
  isOpen,
  onClose,
  onSave,
  mode,
  recipe,
}: RecipeFormModalProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormValues>({
    resolver: yupResolver(recipeFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const ingredientsFieldArray = useFieldArray({
    control,
    name: "ingredients",
  });

  const instructionsFieldArray = useFieldArray({
    control,
    name: "instructions",
  });

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && recipe) {
      reset({
        ...recipe,
        ingredients: recipe.ingredients.map((value) => ({ value })),
        instructions: recipe.instructions.map((value) => ({ value })),
      });
    } else {
      reset(DEFAULT_VALUES);
    }
  }, [mode, recipe, isOpen, reset]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<RecipeFormValues> = (data) => {
    const recipeData = {
      title: data.title,
      description: data.description,
      image: data.image,
      category: data.category,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      servings: data.servings,
      ingredients: (data.ingredients ?? []).map((ingredient) => ingredient.value),
      instructions: (data.instructions ?? []).map((instruction) => instruction.value),
    };

    onSave(
      mode === "edit" && recipe ? { ...recipeData, id: recipe.id } : recipeData
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Nova receita" : "Editar receita"}
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para {mode === "create" ? "adicionar uma nova" : "atualizar a"} receita.
          </DialogDescription>
        </DialogHeader>

        <form
          id="recipe-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 overflow-y-auto px-1 py-2"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ex: Torta de Limão"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva a receita brevemente"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="image">Imagem (caminho)</Label>
              <Input
                id="image"
                placeholder="/receitas/nome-da-imagem.jpg"
                {...register("image")}
              />
              {errors.image && (
                <p className="text-sm text-destructive">
                  {errors.image.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                placeholder="Ex: Sobremesas"
                {...register("category")}
              />
              {errors.category && (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="prepTime">Tempo de preparo</Label>
              <Input
                id="prepTime"
                placeholder="Ex: 20 minutos"
                {...register("prepTime")}
              />
              {errors.prepTime && (
                <p className="text-sm text-destructive">
                  {errors.prepTime.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cookTime">Tempo de cozimento</Label>
              <Input
                id="cookTime"
                placeholder="Ex: 15 minutos"
                {...register("cookTime")}
              />
              {errors.cookTime && (
                <p className="text-sm text-destructive">
                  {errors.cookTime.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="servings">Porções</Label>
              <Input
                id="servings"
                type="number"
                min={1}
                {...register("servings")}
              />
              {errors.servings && (
                <p className="text-sm text-destructive">
                  {errors.servings.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Ingredientes</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => ingredientsFieldArray.append({ value: "" })}
              >
                <PlusIcon />
                Adicionar ingrediente
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              {ingredientsFieldArray.fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={`Ingrediente ${index + 1}`}
                      {...register(`ingredients.${index}.value` as const)}
                    />
                    {ingredientsFieldArray.fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Remover ingrediente"
                        onClick={() => ingredientsFieldArray.remove(index)}
                      >
                        <Trash2Icon />
                      </Button>
                    )}
                  </div>
                  {errors.ingredients?.[index]?.value && (
                    <p className="text-sm text-destructive">
                      {errors.ingredients[index]?.value?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {errors.ingredients?.root && (
              <p className="text-sm text-destructive">
                {errors.ingredients.root.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Modo de preparo</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => instructionsFieldArray.append({ value: "" })}
              >
                <PlusIcon />
                Adicionar passo
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              {instructionsFieldArray.fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-1">
                  <div className="flex items-start gap-2">
                    <Textarea
                      placeholder={`Passo ${index + 1}`}
                      {...register(`instructions.${index}.value` as const)}
                    />
                    {instructionsFieldArray.fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Remover passo"
                        onClick={() => instructionsFieldArray.remove(index)}
                      >
                        <Trash2Icon />
                      </Button>
                    )}
                  </div>
                  {errors.instructions?.[index]?.value && (
                    <p className="text-sm text-destructive">
                      {errors.instructions[index]?.value?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {errors.instructions?.root && (
              <p className="text-sm text-destructive">
                {errors.instructions.root.message}
              </p>
            )}
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="recipe-form" disabled={isSubmitting}>
            {mode === "create" ? "Salvar receita" : "Salvar alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
