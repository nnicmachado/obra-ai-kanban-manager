
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data - in a real app this would come from a database
const constructionProjects = [
  { id: "1", name: "Residencial Vila Nova", progress: 65 },
  { id: "2", name: "Edifício Imperial", progress: 32 },
  { id: "3", name: "Centro Comercial Plaza", progress: 78 },
];

const phaseData = [
  {
    name: "Fundação",
    concluido: 100,
    emProgresso: 0,
    pendente: 0,
  },
  {
    name: "Estrutura",
    concluido: 85,
    emProgresso: 15,
    pendente: 0,
  },
  {
    name: "Alvenaria",
    concluido: 72,
    emProgresso: 18,
    pendente: 10,
  },
  {
    name: "Instalações",
    concluido: 45,
    emProgresso: 25,
    pendente: 30,
  },
  {
    name: "Acabamento",
    concluido: 10,
    emProgresso: 20,
    pendente: 70,
  },
];

const chartConfig = {
  concluido: { label: "Concluído", color: "#4ade80" },
  emProgresso: { label: "Em Progresso", color: "#facc15" },
  pendente: { label: "Pendente", color: "#f87171" },
};

const Progress = () => {
  const [selectedProject, setSelectedProject] = useState(constructionProjects[0].id);
  const currentProject = constructionProjects.find(p => p.id === selectedProject) || constructionProjects[0];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Progresso da Obra</h1>
          
          <div className="w-full md:w-64">
            <Select 
              value={selectedProject}
              onValueChange={setSelectedProject}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma obra" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {constructionProjects.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Progresso Geral - {currentProject.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium">{currentProject.progress}% Concluído</span>
                  <span className="text-sm font-medium text-gray-500">{currentProject.progress}/100</span>
                </div>
                <Progress value={currentProject.progress} className="h-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Progresso por Fases</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart">
                <TabsList className="mb-4">
                  <TabsTrigger value="chart">Gráfico</TabsTrigger>
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                </TabsList>
                <TabsContent value="chart">
                  <div className="h-[400px] w-full">
                    <ChartContainer config={chartConfig}>
                      <BarChart data={phaseData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="concluido" stackId="a" fill="#4ade80" name="Concluído" />
                        <Bar dataKey="emProgresso" stackId="a" fill="#facc15" name="Em Progresso" />
                        <Bar dataKey="pendente" stackId="a" fill="#f87171" name="Pendente" />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </TabsContent>
                <TabsContent value="details">
                  <div className="space-y-6">
                    {phaseData.map((phase) => (
                      <div key={phase.name} className="space-y-2">
                        <h3 className="font-medium">{phase.name}</h3>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-sm">
                            <span>Concluído</span>
                            <span>{phase.concluido}%</span>
                          </div>
                          <Progress value={phase.concluido} className="h-2 bg-gray-100" />
                          
                          <div className="flex justify-between text-sm mt-1">
                            <span>Em Progresso</span>
                            <span>{phase.emProgresso}%</span>
                          </div>
                          <Progress value={phase.emProgresso} className="h-2 bg-gray-100" />
                          
                          <div className="flex justify-between text-sm mt-1">
                            <span>Pendente</span>
                            <span>{phase.pendente}%</span>
                          </div>
                          <Progress value={phase.pendente} className="h-2 bg-gray-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-6">
          <button 
            className="bg-brand-red hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => window.print()}
          >
            Imprimir Relatório
          </button>
        </div>
      </div>
    </div>
  );
};

export default Progress;
