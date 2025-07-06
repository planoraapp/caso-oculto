
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <AlertTriangle className="h-16 w-16 text-case-red mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-case-white mb-4">
              Ops! Algo deu errado
            </h2>
            <p className="text-case-white/80 mb-6">
              Encontramos um erro inesperado. Tente recarregar a página.
            </p>
            <Button 
              onClick={this.handleReload}
              className="bg-case-red hover:bg-red-600"
            >
              Tentar Novamente
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
