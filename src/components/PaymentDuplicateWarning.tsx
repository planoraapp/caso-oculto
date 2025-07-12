import React from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Info, CheckCircle } from 'lucide-react';

interface PaymentDuplicateWarningProps {
  duplicates: string[];
  newPacks: string[];
  message: string;
  paymentType: 'individual' | 'combo' | 'complete';
  show: boolean;
}

const PaymentDuplicateWarning: React.FC<PaymentDuplicateWarningProps> = ({
  duplicates,
  newPacks,
  message,
  paymentType,
  show
}) => {
  if (!show || (duplicates.length === 0 && paymentType !== 'complete')) {
    return null;
  }

  const getAlertVariant = (): "default" | "destructive" => {
    return 'default';
  };

  const getIcon = () => {
    if (paymentType === 'complete') return <CheckCircle className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
  };

  return (
    <Alert variant={getAlertVariant()} className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
      <div className="flex items-start gap-2">
        <div className="text-blue-600 dark:text-blue-400 mt-1">
          {getIcon()}
        </div>
        <div className="flex-1">
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            {message}
          </AlertDescription>
          
          {duplicates.length > 0 && paymentType !== 'complete' && (
            <div className="mt-3 space-y-2">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                  Packs que você já possui:
                </p>
                <div className="flex flex-wrap gap-1">
                  {duplicates.map((packId) => (
                    <Badge key={packId} variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                      {packId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {newPacks.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                    Novos packs que serão adicionados:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {newPacks.map((packId) => (
                      <Badge key={packId} variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        {packId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Alert>
  );
};

export default PaymentDuplicateWarning;