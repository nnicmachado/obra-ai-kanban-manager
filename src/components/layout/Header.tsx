import { Bell, Calendar, LogIn, PlusCircle, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTaskForm } from "../tasks/AddTaskForm";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { LoginForm } from "../auth/LoginForm";
import { RegisterForm } from "../auth/RegisterForm";

export function Header() {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleReportClick = () => {
    toast({
      title: "Relatório Diário",
      description: "Gerando relatório de atividades... Você receberá uma notificação em breve.",
    });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Login realizado com sucesso",
      description: "Bem-vindo ao sistema de gerenciamento de obras.",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema com sucesso.",
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

        {/* User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2 rounded-full border">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {isLoggedIn ? (
              <>
                <div className="px-3 py-2 text-sm font-medium">
                  <p>João Silva</p>
                  <p className="text-xs text-gray-500">joao.silva@obra.ai</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onSelect={() => toast({ title: "Perfil", description: "Acessando perfil do usuário" })}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600" onSelect={handleLogout}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Login</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Fazer Login</DialogTitle>
                    </DialogHeader>
                    <LoginForm onLogin={handleLogin} />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Cadastrar</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
                    </DialogHeader>
                    <RegisterForm />
                  </DialogContent>
                </Dialog>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="ml-4 font-bold text-xl text-brand-red">OBRA.AI</div>
      </div>
    </header>
  );
}
