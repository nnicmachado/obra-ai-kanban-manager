
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TaskProps } from "./TaskCard";
import { sendWhatsappNotification } from "@/lib/whatsapp";

interface TaskDetailsProps extends TaskProps {
  onClose: () => void;
}

export function TaskDetails({
  id,
  title: initialTitle,
  description: initialDescription,
  project: initialProject,
  responsible: initialResponsible,
  priority: initialPriority,
  dueDate: initialDueDate,
  onClose
}: TaskDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("em_progresso");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: initialTitle,
    description: initialDescription,
    project: initialProject,
    responsible: initialResponsible,
    priority: initialPriority,
    dueDate: initialDueDate || "",
  });

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    try {
      await sendWhatsappNotification({
        task: formData.title,
        status: newStatus === "pendente" ? "Pendente" : 
               newStatus === "em_progresso" ? "Em Progresso" : 
               newStatus === "revisao" ? "Em Revisão" : "Concluído",
        project: formData.project,
        responsible: formData.responsible
      });
      
      toast({
        title: "Status atualizado",
        description: "Notificação enviada por WhatsApp.",
      });
    } catch (error) {
      console.error("Error sending notification:", error);
      toast({
        title: "Erro ao enviar notificação",
        description: "Não foi possível enviar a notificação por WhatsApp.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      
      toast({
        title: "Tarefa atualizada",
        description: "As alterações foram salvas com sucesso.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input 
              id="title" 
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project">Obra</Label>
              <Input 
                id="project" 
                value={formData.project}
                onChange={(e) => handleChange("project", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="responsible">Responsável</Label>
              <Input 
                id="responsible" 
                value={formData.responsible}
                onChange={(e) => handleChange("responsible", e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select 
                value={formData.priority}
                onValueChange={(value: "baixa" | "media" | "alta") => handleChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">Prazo</Label>
              <Input 
                id="dueDate" 
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{formData.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{formData.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Obra</p>
              <p className="text-sm">{formData.project}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500">Responsável</p>
              <p className="text-sm">{formData.responsible}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Prioridade</p>
              <p className="text-sm capitalize">{formData.priority}</p>
            </div>
            
            {formData.dueDate && (
              <div>
                <p className="text-xs text-gray-500">Prazo</p>
                <p className="text-sm">{new Date(formData.dueDate).toLocaleDateString('pt-BR')}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="border-t pt-4 mt-4">
        <p className="text-sm font-medium mb-2">Alterar Status:</p>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={status === "pendente" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleStatusChange("pendente")}
            className={status === "pendente" ? "bg-brand-red hover:bg-red-600" : ""}
          >
            Pendente
          </Button>
          <Button 
            variant={status === "em_progresso" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleStatusChange("em_progresso")}
            className={status === "em_progresso" ? "bg-brand-red hover:bg-red-600" : ""}
          >
            Em Progresso
          </Button>
          <Button 
            variant={status === "revisao" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleStatusChange("revisao")}
            className={status === "revisao" ? "bg-brand-red hover:bg-red-600" : ""}
          >
            Revisão
          </Button>
          <Button 
            variant={status === "concluido" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleStatusChange("concluido")}
            className={status === "concluido" ? "bg-brand-red hover:bg-red-600" : ""}
          >
            Concluído
          </Button>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave} 
              className="bg-brand-red hover:bg-red-600"
              disabled={isSaving}
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
