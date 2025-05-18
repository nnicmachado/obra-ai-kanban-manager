
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useToast } from "@/hooks/use-toast";
import { KanbanColumn } from "./KanbanColumn";
import { TaskProps } from "../tasks/TaskCard";
import { sendWhatsappNotification } from "@/lib/whatsapp";

// Initial tasks data
const initialTasks: Record<string, TaskProps[]> = {
  pendente: [
    { 
      id: "task-1", 
      title: "Fundação Bloco A", 
      description: "Concretar a fundação do Bloco A conforme projeto", 
      project: "Edifício Aurora", 
      responsible: "Ricardo Silva",
      priority: "alta",
      dueDate: "2025-06-01",
      index: 0
    },
    { 
      id: "task-2", 
      title: "Instalações Elétricas 1° andar", 
      description: "Finalizar instalações elétricas do primeiro andar", 
      project: "Condomínio Villa Nova", 
      responsible: "Carlos Santos",
      priority: "media",
      dueDate: "2025-05-25",
      index: 1
    },
  ],
  em_progresso: [
    { 
      id: "task-3", 
      title: "Alvenaria Bloco B", 
      description: "Construção da alvenaria no bloco B", 
      project: "Edifício Aurora", 
      responsible: "Pedro Ferreira",
      priority: "media",
      dueDate: "2025-05-30",
      index: 0
    },
  ],
  revisao: [
    { 
      id: "task-4", 
      title: "Instalações Hidráulicas", 
      description: "Revisão das instalações hidráulicas do térreo", 
      project: "Centro Comercial Planalto", 
      responsible: "Ana Oliveira",
      priority: "baixa",
      index: 0
    },
  ],
  concluido: [
    { 
      id: "task-5", 
      title: "Terraplanagem", 
      description: "Preparação do terreno para início da obra", 
      project: "Condomínio Villa Nova", 
      responsible: "Marcos Ribeiro",
      priority: "alta",
      dueDate: "2025-05-10",
      index: 0
    },
  ],
};

// Column definitions
const columns = [
  { id: "pendente", title: "Pendente" },
  { id: "em_progresso", title: "Em Progresso" },
  { id: "revisao", title: "Revisão" },
  { id: "concluido", title: "Concluído" },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const { toast } = useToast();

  const handleDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a droppable area
    if (!destination) return;

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    // Find the task that was dragged
    const task = tasks[source.droppableId].find(t => t.id === draggableId);
    
    if (!task) return;

    // Create new tasks state
    const newTasks = { ...tasks };
    
    // Remove from source column
    newTasks[source.droppableId] = newTasks[source.droppableId].filter(
      t => t.id !== draggableId
    );
    
    // Add to destination column
    const destTasks = Array.from(newTasks[destination.droppableId]);
    destTasks.splice(destination.index, 0, { ...task, index: destination.index });
    
    // Update indexes for all tasks in destination column
    newTasks[destination.droppableId] = destTasks.map((t, index) => ({
      ...t, 
      index
    }));
    
    // Update state
    setTasks(newTasks);
    
    // If status changed, send notification
    if (source.droppableId !== destination.droppableId) {
      const statusMap: Record<string, string> = {
        pendente: "Pendente",
        em_progresso: "Em Progresso",
        revisao: "Em Revisão",
        concluido: "Concluído"
      };
      
      try {
        await sendWhatsappNotification({
          task: task.title,
          status: statusMap[destination.droppableId],
          project: task.project,
          responsible: task.responsible
        });
        
        toast({
          title: "Status atualizado",
          description: `Tarefa movida para ${statusMap[destination.droppableId]}. Notificação enviada por WhatsApp.`,
        });
      } catch (error) {
        console.error("Error sending notification:", error);
        toast({
          title: "Status atualizado",
          description: `Tarefa movida para ${statusMap[destination.droppableId]}.`,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4 h-[calc(100vh-5rem)] overflow-x-auto pb-10">
        {columns.map(column => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Droppable droppableId={column.id}>
              {(provided) => (
                <KanbanColumn
                  id={column.id}
                  title={column.title}
                  tasks={tasks[column.id] || []}
                  provided={provided}
                />
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
