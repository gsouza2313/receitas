import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ReceitaPage() {
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
                        src={""}
                        fill
                        alt="Título da receita">

                        </Image>
                    </div>
                    <div>
                        {/* Descrição da receita */}
                        <h1>Título da receita</h1>
                        <p>Descrição da receita</p>
                        {/* Infos de preparo */}
                        <div>
                            {/* TODO: componentes de info*/}
                        </div>
                        <div>
                            {/* colunas */}
                        </div>
                            <div>
                                {/* colunas dos ingredientes */}
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