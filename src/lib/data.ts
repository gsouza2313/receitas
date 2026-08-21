export type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: string
  cookTime: string
  servings: number
  ingredients: string[]
  instructions: string[]
  category: string
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Torta de Limão",
    description: "Uma sobremesa refrescante com base crocante, recheio cremoso de limão e cobertura de merengue.",
    image: "/receitas/torta-limao.png",
    prepTime: "20 minutos",
    cookTime: "15 minutos",
    servings: 10,
    ingredients: [
      "200g de biscoito maisena",
      "100g de manteiga derretida",
      "1 lata de leite condensado",
      "1 lata de creme de leite",
      "Suco de 3 limões",
      "Raspas de limão para decorar",
      "3 claras de ovo",
      "6 colheres de sopa de açúcar",
    ],
    instructions: [
      "Triture os biscoitos até formar uma farofa fina.",
      "Misture com a manteiga derretida e pressione no fundo de uma forma para formar a base.",
      "Leve ao forno por 10 minutos a 180°C e deixe esfriar.",
      "Misture o leite condensado, creme de leite e suco de limão até obter um creme homogêneo.",
      "Despeje o creme sobre a base já fria.",
      "Bata as claras em neve e adicione o açúcar aos poucos até formar um merengue firme.",
      "Cubra a torta com o merengue e leve ao forno por 5 minutos para dourar.",
      "Decore com raspas de limão e leve à geladeira por 2 horas antes de servir.",
    ],
    category: "Sobremesas",
  },
  {
    id: "2",
    title: "Salmão Grelhado com Molho de Maracujá",
    description: "Um prato sofisticado e leve, com salmão grelhado acompanhado de molho agridoce de maracujá.",
    image: "/receitas/salmao-maracuja.png",
    prepTime: "15 minutos",
    cookTime: "20 minutos",
    servings: 4,
    ingredients: [
      "4 filés de salmão",
      "Suco de 2 maracujás",
      "1/2 xícara de creme de leite fresco",
      "2 colheres de sopa de manteiga",
      "1 colher de sopa de mel",
      "Sal e pimenta a gosto",
      "Azeite para grelhar",
    ],
    instructions: [
      "Tempere os filés de salmão com sal e pimenta.",
      "Aqueça uma frigideira com azeite e grelhe os filés por 3-4 minutos de cada lado.",
      "Retire e reserve.",
      "Na mesma frigideira, adicione a manteiga e o suco de maracujá.",
      "Misture o mel e deixe reduzir por alguns minutos.",
      "Adicione o creme de leite fresco e mexa até formar um molho cremoso.",
      "Sirva o salmão com o molho por cima.",
    ],
    category: "Pratos Principais",
  },
  {
    id: "3",
    title: "Blinis com Caviar",
    description: "Pequenas panquecas russas servidas com creme azedo e caviar, ideais como entrada sofisticada.",
    image: "/receitas/blinis-caviar.png",
    prepTime: "20 minutos",
    cookTime: "10 minutos",
    servings: 6,
    ingredients: [
      "1 xícara de farinha de trigo",
      "1/2 xícara de leite morno",
      "1 ovo",
      "1 colher de chá de fermento biológico seco",
      "2 colheres de sopa de manteiga derretida",
      "1 pitada de sal",
      "Creme azedo para servir",
      "Caviar para finalizar",
    ],
    instructions: [
      "Misture o fermento com o leite morno e deixe descansar por 5 minutos.",
      "Adicione a farinha, ovo, manteiga e sal, misturando até formar uma massa homogênea.",
      "Deixe a massa descansar por 30 minutos.",
      "Aqueça uma frigideira antiaderente e despeje pequenas porções da massa para formar os blinis.",
      "Cozinhe por 1-2 minutos de cada lado até dourar.",
      "Sirva os blinis com uma colher de creme azedo e finalize com caviar por cima.",
    ],
    category: "Entradas",
  },
]
