
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TaskDetails } from "./TaskDetails";

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  project: string;
  responsible: string;
  priority: "baixa" | "media" | "alta";
  dueDate?: string;
  index: number; // Make sure index is included in the interface
}

export function TaskCard(props: TaskProps) {
  const { id, title, description, project, responsible, priority, index } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getPriorityColor = () => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800 border-red-200";
      case "media":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "baixa":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="mb-3"
            onClick={() => setIsDialogOpen(true)}
          >
            <Card className="p-3 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <h3 className="font-medium mb-1">{title}</h3>
                <Badge variant="outline" className={`${getPriorityColor()} ml-2 text-xs`}>
                  {priority === "alta" ? "Alta" : priority === "media" ? "Média" : "Baixa"}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">{description}</p>
              <div className="text-xs text-gray-500 mt-2">
                <div className="flex justify-between">
                  <span>{project}</span>
                  <span>{responsible}</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Draggable>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <TaskDetails
            id={id}
            title={title}
            description={description}
            project={project}
            responsible={responsible}
            priority={priority}
            dueDate={props.dueDate || ""}
            index={index}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
