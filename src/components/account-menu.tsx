import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx";
import { Button } from "./ui/button.tsx";
import { Building, ChevronDown, Divide, LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProfileUser } from "@/api/get-profile-user.ts";
import { getManagedRestaurant } from "@/api/get-managed-restaurant.ts";
import { Skeleton } from "./ui/skeleton.tsx";

const AccountMenu = () => {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileUser,
  });
  const { data: managed, isLoading: isLoadingManaged } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 select-none"
        >
          {isLoadingManaged ? <Skeleton className="h-4 w-40" /> : managed?.name}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="e-56">
        <DropdownMenuLabel className="flex flex-col gap-1">
          {isLoadingProfile ? (
            <div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          ) : (
            <>
              <span>{profile?.name}</span>
              <span className="text-sm forn-normal text-muted">
                {profile?.email}
              </span>
            </>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Building className="w-4 h-4 mr-2" />
          <span>Perfil da loja</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="text-rose-500 dark:text-rose-400" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
