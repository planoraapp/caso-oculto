
import { useQuery } from '@tanstack/react-query';
import { PackService } from '../../services/packService';

export const usePacks = () => {
  return useQuery({
    queryKey: ['packs'],
    queryFn: PackService.getAllPacks,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
};

export const usePack = (packId: string) => {
  return useQuery({
    queryKey: ['pack', packId],
    queryFn: () => PackService.getPackById(packId),
    enabled: !!packId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useUserPacks = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['user-packs', userId],
    queryFn: () => userId ? PackService.getUserPacks(userId) : Promise.resolve([]),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutos para dados do usuário
    refetchOnWindowFocus: true,
  });
};
