
import { TaskCard, TaskProps } from "../tasks/TaskCard";

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: TaskProps[];
  provided: any;
}

export function KanbanColumn({ id, title, tasks, provided }: KanbanColumnProps) {
  // Determine the header background color based on column id
  const getHeaderColor = () => {
    switch(id) {
      case "pendente":
        return "bg-yellow-50 border-yellow-300";
      case "em_progresso":
        return "bg-blue-50 border-blue-300";
      case "revisao":
        return "bg-purple-50 border-purple-300";
      case "concluido":
        return "bg-green-50 border-green-300";
      default:
        return "bg-gray-50 border-gray-300";
    }
  };

  return (
    <div className="bg-gray-50 rounded-md flex flex-col h-full border border-gray-200">
      <div className={`p-3 border-b font-medium ${getHeaderColor()}`}>
        <div className="flex justify-between items-center">
          <h3>{title}</h3>
          <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-normal">
            {tasks.length}
          </span>
        </div>
      </div>
      <div 
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="p-2 flex-1 overflow-y-auto"
      >
        {tasks.map((task, index) => (
          <TaskCard key={task.id} {...task} index={index} />
        ))}
        {provided.placeholder}
      </div>
    </div>
  );
}
