
import { Button } from "@/components/ui/button";
import { WhatsappSettings } from "@/components/settings/WhatsappSettings";
import { Header } from "@/components/layout/Header";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Configurações</h1>
        </div>
        
        <div className="grid gap-6">
          <WhatsappSettings />
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-medium mb-4">Relatórios de IA</h2>
            <p className="text-gray-600 mb-4">
              Configure as preferências para os relatórios diários gerados pela inteligência artificial.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Relatórios diários</h3>
                  <p className="text-sm text-gray-500">Receba relatórios diários das obras que você acompanha</p>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notificações por e-mail</h3>
                  <p className="text-sm text-gray-500">Receba os relatórios por e-mail</p>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
