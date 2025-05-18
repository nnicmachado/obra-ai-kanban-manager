
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { DialogClose } from "@/components/ui/dialog";

export function RegisterForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Senhas diferentes",
        description: "As senhas informadas não conferem.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    // Simulate registration API call
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: "Cadastro realizado",
        description: "Sua conta foi criada com sucesso! Você já pode fazer login.",
      });
      
      // Close dialog
      document.querySelector('[role="dialog"] button[aria-label="Close"]')?.click();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input
          id="name"
          name="name"
          placeholder="Digite seu nome"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      
      <div className="flex justify-between pt-2">
        <DialogClose asChild>
          <Button variant="outline" type="button">Cancelar</Button>
        </DialogClose>
        <Button type="submit" className="bg-brand-red hover:bg-red-600" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}
