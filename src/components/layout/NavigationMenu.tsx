
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  NavigationMenu as NavMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ChevronDown, Settings, Kanban, ChartBar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const constructionProjects = [
  { id: "1", name: "Residencial Vila Nova" },
  { id: "2", name: "Edifício Imperial" },
  { id: "3", name: "Centro Comercial Plaza" },
];

export function NavigationMenu() {
  const [selectedProject, setSelectedProject] = useState(constructionProjects[0].id);

  return (
    <div className="bg-white border-b border-gray-200 py-2 px-4">
      <div className="container mx-auto flex items-center">
        <div className="mr-10 font-bold flex items-center">
          <Kanban className="h-5 w-5 mr-2 text-brand-red" />
          <span>OBRA.AI</span>
        </div>
        
        <NavMenu className="flex-1">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-1">
                <Kanban className="h-4 w-4 mr-1" />
                Gerenciamento de Obra
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Selecione a Obra</h4>
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
                  <Link 
                    to="/"
                    className="block p-2 hover:bg-gray-100 rounded-md"
                    onClick={() => {
                      // In a real app, we would apply the selected project filter
                      console.log("Selected project:", selectedProject);
                    }}
                  >
                    Ver Kanban
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/progress">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <ChartBar className="h-4 w-4 mr-1" />
                  Progresso da Obra
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/settings">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Settings className="h-4 w-4 mr-1" />
                  Configurações
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavMenu>
      </div>
    </div>
  );
}
