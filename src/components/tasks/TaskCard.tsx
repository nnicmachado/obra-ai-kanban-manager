
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TaskDetails } from "./TaskDetails";
import { Draggable } from "react-beautiful-dnd";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  project: string;
  responsible: string;
  priority: "baixa" | "media" | "alta";
  dueDate?: string;
  index: number;
}

export function TaskCard({ id, title, description, project, responsible, priority, dueDate, index }: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);

  const priorityColors = {
    baixa: "bg-green-100 text-green-800",
    media: "bg-yellow-100 text-yellow-800",
    alta: "bg-red-100 text-red-800"
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Card className="p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-sm truncate">{title}</h3>
                    <Badge variant="outline" className={priorityColors[priority]}>
                      {priority === "baixa" ? "Baixa" : priority === "media" ? "Média" : "Alta"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-medium">{project}</span>
                    <span className="text-xs">{responsible}</span>
                  </div>
                  {dueDate && (
                    <div className="text-xs text-gray-500 mt-1">
                      Prazo: {new Date(dueDate).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Detalhes da Tarefa</DialogTitle>
              </DialogHeader>
              <TaskDetails 
                id={id} 
                title={title} 
                description={description}
                project={project}
                responsible={responsible}
                priority={priority}
                dueDate={dueDate}
                onClose={() => setIsOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Draggable>
  );
}
