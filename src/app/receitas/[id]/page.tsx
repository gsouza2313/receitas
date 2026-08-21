import { recipes } from "@/lib/data"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

interface RecipePageProps {
    params: {
        id: string;
    }
}

export default function ReceitaPage({ params }: RecipePageProps) {
    const recipe = recipes.find((recipe) => recipe.id === params.id)
    if (!recipe) {
        return notFound()
    }
    return (
        <main className="grow py-8">
            <div className="container mx-auto">
                <Link className=" flex text-orange-500 hover:text-orange-700" href="receitas">
                    <ChevronLeft />
                    Voltar para receitas
                </Link>

                <section>
                    {/* Imagens da capa da receita */}
                    <div className="relative h-96 w-full">
                        <Image
                            src={recipe.image}
                            fill
                            alt={recipe.title}>

                        </Image>
                    </div>
                    <div>
                        {/* Descrição da receita */}
                        <h1>{recipe.title}</h1>
                        <p>{recipe.description}</p>
                        {/* Infos de preparo */}
                        <div>
                            {/* TODO: componentes de info*/}
                        </div>
                        {/* colunas */}
                        <div>
                            <ul>{recipe.ingredients.map((ingredient) => (
                                <li>{ingredient}</li>
                            )
                            )
                            }
                            </ul>


                        </div>

                        <div>
                            {/* coluna do preparo */}
                        </div>
                        <div>
                            {/* TODO: componente de preparo */}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}