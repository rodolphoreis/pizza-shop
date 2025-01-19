import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import * as z from "zod";

const schema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof schema>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignUpForm>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createRegisterRestaurant } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function onSubmit(data: SignUpForm) {
    try {
      await createRegisterRestaurant({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      });
      toast.success("Restaurante cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () => {
            navigate(`/sign-in?email=${data.email}`);
          },
        },
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastrar sua conta!");
    }
  }
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="secondary" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="w-[450px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold -tracking-tight">
              Criar conta grátis
            </h1>
            <p>Seja um parceiro e comece suas vendas!</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 mb-4">
              <label
                htmlFor="restaurantName"
                className="block text-sm font-medium text-gray-700"
              >
                Nome do estabelecimento
              </label>
              <input
                id="restaurantName"
                {...register("restaurantName")}
                type="text"
                placeholder="Digite o nome do seu restaurante"
                className="block w-full px-4 py-2 text-gray-700 rounded-md border placeholder:text-gray-300"
              />
              {errors.restaurantName && (
                <span>Digite o nome do seu restaurante!</span>
              )}
            </div>
            <div className="space-y-2 mb-4">
              <label
                htmlFor="managerName"
                className="block text-sm font-medium text-gray-700"
              >
                Seu nome
              </label>
              <input
                id="managerName"
                {...register("managerName")}
                type="text"
                placeholder="Digite o seu nome"
                className="block w-full px-4 py-2 text-gray-700 rounded-md border placeholder:text-gray-300"
              />
              {errors.managerName && <span>Digite o seu nome</span>}
            </div>
            <div className="space-y-2 mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Número de telefone
              </label>
              <input
                id="phone"
                {...register("phone")}
                type="tel"
                placeholder="Digite seu número de telefone"
                className="block w-full px-4 py-2 text-gray-700 rounded-md border placeholder:text-gray-300"
              />
              {errors.phone && <span>Digite seu número de telefone</span>}
            </div>
            <div className="space-y-2 mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Digite seu email"
                className="block w-full px-4 py-2 text-gray-700 rounded-md border placeholder:text-gray-300"
              />
              {errors.email && <span>Digite seu email</span>}
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full">
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <a href="#" className="underline underline-offset-4">
                Termos de Serviços
              </a>{" "}
              e{" "}
              <a href="#" className="underline underline-offset-4">
                politicas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
