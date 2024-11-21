import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof schema>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: SignInForm) {
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
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

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
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
