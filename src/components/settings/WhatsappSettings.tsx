
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { configureWhatsappService } from "@/lib/whatsapp";

export function WhatsappSettings() {
  const [apiKey, setApiKey] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      configureWhatsappService(apiKey, phoneNumber);
      
      toast({
        title: "Configuração salva",
        description: "As configurações de WhatsApp foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as configurações de WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de WhatsApp</CardTitle>
        <CardDescription>
          Configure as credenciais para notificações por WhatsApp quando o status das tarefas for alterado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Chave de API</Label>
            <Input 
              id="apiKey" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Insira sua chave de API do WhatsApp Business"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Número de Telefone Padrão</Label>
            <Input 
              id="phoneNumber" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+55 (00) 00000-0000"
              type="tel"
            />
            <p className="text-xs text-gray-500">
              Este número será usado para enviar notificações padrão quando não houver um número específico na tarefa.
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-brand-red hover:bg-red-600"
              disabled={isSaving}
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
