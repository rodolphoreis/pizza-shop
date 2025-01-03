import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./button.tsx";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog.tsx";
import { Input } from "./input.tsx";
import { Label } from "./label.tsx";
import { Textarea } from "./textarea.tsx";

import * as z from "zod";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getManagedRestaurant } from "@/api/get-managed-restaurant.ts";
import { useForm } from "react-hook-form";
import { updateProfile } from "@/api/update-profile.ts";
import { toast } from "sonner";

const StoreProfileSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
});

type StoreProfileSchema = z.infer<typeof StoreProfileSchema>;

const StoreProfireDialog = () => {
  const { data: managed } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(StoreProfileSchema),
    values: {
      name: managed?.name ?? "",
      description: managed?.description ?? "",
    },
  });

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
  });

  async function handleupdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });

      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      toast.error("Ocorreu um erro ao atualizar o perfil");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da Loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleupdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <Label className=" text-right" htmlFor="name">
              Nome
            </Label>
            <Input id="name" className="col-span-3" {...register("name")} />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label className=" text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              {...register("description")}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default StoreProfireDialog;
