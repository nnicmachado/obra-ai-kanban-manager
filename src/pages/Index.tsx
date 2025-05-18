
import { Header } from "../components/layout/Header";
import { KanbanBoard } from "../components/kanban/KanbanBoard";
import { ReportGenerator } from "../components/reports/ReportGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <h2 className="font-medium text-lg">Quadro de Tarefas</h2>
        <ReportGenerator />
      </div>
      <KanbanBoard />
    </div>
  );
};

export default Index;
