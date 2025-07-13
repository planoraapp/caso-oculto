
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PaymentService } from '../../services/paymentService';
import { useToast } from '../use-toast';

export const useUserPurchases = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['user-purchases', userId],
    queryFn: () => userId ? PaymentService.getUserPurchases(userId) : Promise.resolve([]),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minuto para dados de pagamento
  });
};

export const useAllPurchases = () => {
  return useQuery({
    queryKey: ['all-purchases'],
    queryFn: PaymentService.getAllPurchases,
    staleTime: 30 * 1000, // 30 segundos para admin
  });
};

export const useCreatePayment = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PaymentService.createStripeSession,
    onSuccess: () => {
      // Invalidar cache relacionado
      queryClient.invalidateQueries({ queryKey: ['user-purchases'] });
      toast({
        title: "Pagamento iniciado",
        description: "Redirecionando para o checkout...",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro no pagamento",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};
