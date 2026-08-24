import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/lib/data";
import { Edit, Trash2 } from "lucide-react";
import type { MouseEvent } from "react";

interface RecipeCardProps {
    recipe: Recipe
    onEdit?: () => void
    onDelete?: () => void
}

export default function RecipeCard({ recipe, onEdit, onDelete }: RecipeCardProps) {
    const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit?.();
    };

    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete?.();
    };

    return (
        <Link href={`/receitas/${recipe.id}`}>
            <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                    <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover">
                    </Image>
                </div>
                <div className="flex flex-col p-4 gap-6">
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold hover:text-orange-500 transition-colors">{recipe.title}</h3>
                        <p>{recipe.description}</p>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {recipe.category}
                        </span>

                        {(onEdit || onDelete) && (
                            <div className="flex gap-2">
                                {onEdit && (
                                    <button
                                        type="button"
                                        onClick={handleEdit}
                                        aria-label="Editar receita"
                                        className="p-2 border border-gray-200 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        <Edit size={16} />
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        aria-label="Excluir receita"
                                        className="p-2 border border-gray-200 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}