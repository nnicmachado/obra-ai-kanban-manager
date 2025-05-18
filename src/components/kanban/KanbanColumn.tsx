
import { TaskCard, TaskProps } from "../tasks/TaskCard";

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: TaskProps[];
  provided: any;
}

export function KanbanColumn({ id, title, tasks, provided }: KanbanColumnProps) {
  // Determine the header background color based on column id - now all use light red
  const getHeaderColor = () => {
    return "bg-red-100 border-red-300";
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
