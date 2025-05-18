
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PROJECTS = [
  "Edifício Aurora",
  "Condomínio Villa Nova",
  "Centro Comercial Planalto"
];

export function ReportGenerator() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportHtml, setReportHtml] = useState<string | null>(null);
  const { toast } = useToast();

  const handleProjectChange = (project: string) => {
    setSelectedProjects(prev => 
      prev.includes(project)
        ? prev.filter(p => p !== project)
        : [...prev, project]
    );
  };

  const generateReport = () => {
    if (selectedProjects.length === 0) {
      toast({
        title: "Nenhuma obra selecionada",
        description: "Por favor, selecione pelo menos uma obra para gerar o relatório.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI report generation
    setTimeout(() => {
      const reportDate = new Date().toLocaleDateString('pt-BR');
      
      const html = `
        <div class="report-container">
          <div class="report-header">
            <h1>Relatório Diário de Obras</h1>
            <div class="report-meta">
              <p><strong>Data:</strong> ${reportDate}</p>
              <p><strong>Obras:</strong> ${selectedProjects.join(', ')}</p>
            </div>
          </div>

          ${selectedProjects.map(project => `
            <div class="project-section">
              <h2>${project}</h2>
              
              <div class="summary-section">
                <h3>Resumo de Progresso</h3>
                <p>A obra ${project} apresentou avanço significativo hoje. Foram concluídas ${Math.floor(Math.random() * 3) + 1} tarefas e iniciadas ${Math.floor(Math.random() * 4) + 1} novas atividades.</p>
              </div>
              
              <div class="tasks-section">
                <h3>Atividades Concluídas</h3>
                <ul>
                  <li>Instalação de ${Math.floor(Math.random() * 100) + 1}% da alvenaria</li>
                  <li>Revisão das instalações elétricas do ${Math.floor(Math.random() * 5) + 1}º andar</li>
                  ${Math.random() > 0.5 ? '<li>Finalização da concretagem do bloco A</li>' : ''}
                </ul>
              </div>
              
              <div class="issues-section">
                <h3>Pontos de Atenção</h3>
                <ul>
                  ${Math.random() > 0.7 ? '<li>Atraso na entrega de materiais (previsão: 2 dias)</li>' : ''}
                  ${Math.random() > 0.5 ? '<li>Necessidade de revisão no projeto hidráulico</li>' : ''}
                </ul>
              </div>
              
              <div class="next-section">
                <h3>Próximos Passos</h3>
                <p>Para o próximo dia útil, estão programadas as seguintes atividades: instalação de esquadrias, continuação da pintura externa e início das instalações de gesso.</p>
              </div>
            </div>
          `).join('')}
          
          <div class="report-footer">
            <p>Relatório gerado automaticamente por OBRA.AI</p>
            <p class="timestamp">Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
        
        <style>
          .report-container {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .report-header {
            border-bottom: 2px solid #ea384c;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .report-header h1 {
            color: #333;
            margin-bottom: 10px;
          }
          .report-meta {
            color: #555;
            font-size: 14px;
          }
          .project-section {
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
          }
          .project-section h2 {
            color: #ea384c;
            margin-bottom: 15px;
          }
          .project-section h3 {
            font-size: 16px;
            margin: 15px 0 10px;
            color: #333;
          }
          .tasks-section ul,
          .issues-section ul {
            margin-left: 20px;
          }
          .tasks-section li,
          .issues-section li {
            margin-bottom: 5px;
          }
          .report-footer {
            margin-top: 40px;
            font-size: 12px;
            color: #777;
            text-align: center;
          }
          .timestamp {
            font-style: italic;
          }
          @media print {
            body {
              font-size: 12pt;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      `;

      setReportHtml(html);
      setIsGenerating(false);
      
      toast({
        title: "Relatório gerado",
        description: "O relatório foi gerado com sucesso. Você pode visualizá-lo e imprimi-lo agora."
      });
    }, 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && reportHtml) {
      printWindow.document.write(reportHtml);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white">
          Gerar Relatório
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gerar Relatório de Obras</DialogTitle>
        </DialogHeader>
        
        {!reportHtml ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Selecione as obras que você deseja incluir no relatório:
              </p>
              
              <div className="space-y-2">
                {PROJECTS.map((project) => (
                  <div key={project} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`project-${project}`} 
                      checked={selectedProjects.includes(project)}
                      onCheckedChange={() => handleProjectChange(project)}
                    />
                    <label 
                      htmlFor={`project-${project}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {project}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={generateReport} 
                className="bg-brand-red hover:bg-red-600"
                disabled={isGenerating}
              >
                {isGenerating ? "Gerando..." : "Gerar Relatório"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Relatório gerado com sucesso para {selectedProjects.length} {selectedProjects.length === 1 ? 'obra' : 'obras'}.
            </p>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setReportHtml(null)}
              >
                Voltar
              </Button>
              
              <Button 
                onClick={handlePrint}
                className="bg-brand-red hover:bg-red-600"
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimir Relatório
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
