import * as yup from "yup";

export const recipeFormSchema = yup.object({
  title: yup.string().trim().required("Informe o título da receita."),
  description: yup
    .string()
    .trim()
    .required("Informe uma descrição para a receita."),
  image: yup.string().trim().required("Informe o caminho da imagem."),
  category: yup.string().trim().required("Informe a categoria da receita."),
  prepTime: yup.string().trim().required("Informe o tempo de preparo."),
  cookTime: yup.string().trim().required("Informe o tempo de cozimento."),
  servings: yup
    .number()
    .typeError("Informe um número de porções válido.")
    .required("Informe o número de porções.")
    .min(1, "A receita deve servir pelo menos 1 porção."),
  ingredients: yup
    .array(
      yup.object({
        value: yup.string().trim().required("O ingrediente não pode ficar vazio."),
      })
    )
    .min(1, "Adicione pelo menos um ingrediente."),
  instructions: yup
    .array(
      yup.object({
        value: yup.string().trim().required("O passo não pode ficar vazio."),
      })
    )
    .min(1, "Adicione pelo menos um passo de preparo."),
});

export type RecipeFormValues = yup.InferType<typeof recipeFormSchema>;
