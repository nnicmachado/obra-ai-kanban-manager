
import { Bell, Calendar, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTaskForm } from "../tasks/AddTaskForm";

export function Header() {
  const { toast } = useToast();
  
  const handleReportClick = () => {
    toast({
      title: "Relatório Diário",
      description: "Gerando relatório de atividades... Você receberá uma notificação em breve.",
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">Gerenciamento de Obras</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={handleReportClick}>
          <Calendar className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-brand-red hover:bg-red-600 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nova Tarefa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
            </DialogHeader>
            <AddTaskForm />
          </DialogContent>
        </Dialog>
        
        <div className="ml-4 font-bold text-xl text-brand-red">OBRA.AI</div>
      </div>
    </header>
  );
}
