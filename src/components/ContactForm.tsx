
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { X, Mail, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const subject = encodeURIComponent('Contato - CASO OCULTO');
      const body = encodeURIComponent(
        `Nome: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Telefone: ${formData.phone}\n\n` +
        `Mensagem:\n${formData.message}`
      );
      
      window.open(`mailto:conectawebapps@outlook.com?subject=${subject}&body=${body}`);
      
      toast({
        title: "Email preparado!",
        description: "Seu cliente de email foi aberto com a mensagem pronta para envio.",
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao preparar email de contato",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-noir-dark border-noir-medium">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-case-white">Entre em Contato</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-case-white hover:bg-noir-medium"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-noir-medium rounded-lg">
            <div className="flex items-center gap-2 text-case-white/80 text-sm">
              <Mail className="h-4 w-4" />
              <span>conectawebapps@outlook.com</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-case-white">Nome</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="bg-noir-medium border-noir-light text-case-white"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-case-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="bg-noir-medium border-noir-light text-case-white"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-case-white">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-noir-medium border-noir-light text-case-white"
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="text-case-white">Mensagem</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows={4}
                className="bg-noir-medium border-noir-light text-case-white"
                placeholder="Descreva sua dúvida ou solicitação..."
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-case-red hover:bg-red-600 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? 'Preparando...' : 'Enviar Contato'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
