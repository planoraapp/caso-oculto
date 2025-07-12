
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Crown, CheckCircle } from 'lucide-react';

interface CompleteAccessBlockProps {
  message?: string;
}

const CompleteAccessBlock: React.FC<CompleteAccessBlockProps> = ({ 
  message = "Você já possui Acesso Total" 
}) => {
  return (
    <Card className="bg-gradient-to-br from-green-800/20 to-green-900/20 border-green-500/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className="bg-green-500 text-white w-fit">ATIVO</Badge>
          <Crown className="h-6 w-6 text-green-500" />
        </div>
        <CardTitle className="text-case-white flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Acesso Total
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-case-white/80">{message}</p>
          <div className="flex items-center text-green-400 text-sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Todos os 15 packs disponíveis</span>
          </div>
          <div className="flex items-center text-green-400 text-sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Acesso vitalício garantido</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompleteAccessBlock;
