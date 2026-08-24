import { NextResponse } from "next/server";
import { createRecipe, getRecipes } from "@/lib/recipesStore";

export async function GET() {
  return NextResponse.json(getRecipes());
}

export async function POST(request: Request) {
  const body = await request.json();
  const recipe = createRecipe(body);
  return NextResponse.json(recipe, { status: 201 });
}
