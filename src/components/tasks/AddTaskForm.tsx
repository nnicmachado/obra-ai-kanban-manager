
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function AddTaskForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Tarefa adicionada",
        description: "A tarefa foi adicionada com sucesso.",
      });
      
      // Close the dialog by dispatching a custom event
      document.dispatchEvent(new CustomEvent('closeAddTaskDialog'));
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" placeholder="Título da tarefa" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" placeholder="Descrição detalhada da tarefa" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="project">Obra</Label>
        <Select defaultValue="projeto-1">
          <SelectTrigger>
            <SelectValue placeholder="Selecione a obra" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="projeto-1">Edifício Aurora</SelectItem>
            <SelectItem value="projeto-2">Condomínio Villa Nova</SelectItem>
            <SelectItem value="projeto-3">Centro Comercial Planalto</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select defaultValue="pendente">
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="em_progresso">Em Progresso</SelectItem>
            <SelectItem value="revisao">Revisão</SelectItem>
            <SelectItem value="concluido">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="responsible">Responsável</Label>
        <Input id="responsible" placeholder="Nome do responsável" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp para notificações</Label>
        <Input id="whatsapp" placeholder="+55 (00) 00000-0000" type="tel" />
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" type="button" onClick={() => document.dispatchEvent(new CustomEvent('closeAddTaskDialog'))}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-brand-red hover:bg-red-600" disabled={isLoading}>
          {isLoading ? "Adicionando..." : "Adicionar Tarefa"}
        </Button>
      </div>
    </form>
  );
}
