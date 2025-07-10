
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const EmailConfirmed: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Email confirmado com sucesso!",
      description: "Sua conta foi ativada. Agora você pode acessar todos os recursos.",
    });
  }, [toast]);

  const handleContinue = () => {
    navigate('/packs');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md bg-noir-dark border-noir-medium p-8">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-case-white">
            Email Confirmado!
          </CardTitle>
          <CardDescription className="text-case-white/80">
            Sua conta foi ativada com sucesso. Agora você pode explorar nossos mistérios!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleContinue}
            className="w-full bg-case-red hover:bg-red-600 text-white"
          >
            Explorar Packs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfirmed;
