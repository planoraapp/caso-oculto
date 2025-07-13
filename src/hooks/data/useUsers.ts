
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '../../services/userService';
import { useToast } from '../use-toast';

export const useAllUsers = () => {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: UserService.getAllUsers,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

export const useUserProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['user-profile', userId],
    queryFn: () => userId ? UserService.getUserProfile(userId) : Promise.resolve(null),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserPackAccess = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['user-pack-access', userId],
    queryFn: () => userId ? UserService.getUserPackAccess(userId) : Promise.resolve([]),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000,
  });
};

export const useGrantPackAccess = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, packId }: { userId: string; packId: string }) => 
      UserService.grantPackAccess(userId, packId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-pack-access'] });
      queryClient.invalidateQueries({ queryKey: ['user-packs'] });
      toast({
        title: "Sucesso",
        description: "Pack adicionado ao usuário!"
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao adicionar pack ao usuário",
        variant: "destructive"
      });
    }
  });
};

export const useRevokePackAccess = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accessId: string) => UserService.revokePackAccess(accessId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-pack-access'] });
      queryClient.invalidateQueries({ queryKey: ['user-packs'] });
      toast({
        title: "Sucesso",
        description: "Pack removido do usuário!"
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao remover pack do usuário",
        variant: "destructive"
      });
    }
  });
};
