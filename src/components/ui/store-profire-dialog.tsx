import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";

import * as z from "zod";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

const StoreProfileSchema = z.object({
  name: z.string().min(3),
  description: z.string().nullable(),
});

type StoreProfileSchema = z.infer<typeof StoreProfileSchema>;

const StoreProfireDialog = () => {
  const queryClient = useQueryClient();

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

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData(["managed-restaurant"]);

    if (cached) {
      queryClient.setQueryData(["managed-restaurant"], {
        ...cached,
        name,
        description,
      });
    }

    return { cached };
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description });

      return { previousProfile: cached as StoreProfileSchema };
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(
          context.previousProfile as StoreProfileSchema
        );
      }
    },
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
          <Button variant="default" type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default StoreProfireDialog;
