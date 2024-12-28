import { signIn } from "@/api/sign-in.ts";
import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof schema>;

export function SignIn() {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignInForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function onSubmit(data: SignInForm) {
    try {
      await authenticate({ email: data.email });
      toast.success("Enviamos um link de autenticação para seu email!", {
        action: {
          label: "Reenviar",
          onClick: () => {
            onSubmit(data);
          },
        },
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao tentar acessar sua conta!");
    }
  }
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8 ">
        <Button variant="secondary" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Crie uma conta</Link>
        </Button>
        <div className="w-[450px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold -tracking-tight">
              Acessar painel
            </h1>
            <p>Acompanhe suas vendas pelo painel do parceiro!</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
