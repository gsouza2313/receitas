import { NextResponse } from "next/server";
import { deleteRecipe, getRecipeById, updateRecipe } from "@/lib/recipesStore";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) {
    return NextResponse.json(
      { message: "Receita não encontrada." },
      { status: 404 }
    );
  }

  return NextResponse.json(recipe);
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const recipe = updateRecipe(id, body);

  if (!recipe) {
    return NextResponse.json(
      { message: "Receita não encontrada." },
      { status: 404 }
    );
  }

  return NextResponse.json(recipe);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const deleted = deleteRecipe(id);

  if (!deleted) {
    return NextResponse.json(
      { message: "Receita não encontrada." },
      { status: 404 }
    );
  }

  return new NextResponse(null, { status: 204 });
}
