import { useAuth } from "@/hooks/useAuth";
import { useLeadStore, Lead } from "@/hooks/useLeadStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, User, Phone, Calendar, DollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Schema para validação do formulário
const newLeadSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  whatsapp: z.string().min(10, "WhatsApp deve ter pelo menos 10 dígitos"),
  interesse: z.string().min(1, "Selecione um tipo de interesse")
});

type NewLeadForm = z.infer<typeof newLeadSchema>;

const CorretorPipeline = () => {
  const { user } = useAuth();
  const { getLeadsByCorretorId, addLead } = useLeadStore();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Busca os leads do corretor logado
  const leads = user ? getLeadsByCorretorId(user.id) : [];
  
  // Calcula estatísticas dinâmicas
  const leadsAtivos = leads.filter(lead => !['Vendido', 'Perdido'].includes(lead.status)).length;
  const propostasEnviadas = leads.filter(lead => lead.status === 'Proposta Enviada').length;
  const faturamentoPotencial = leads
    .filter(lead => lead.valor && !['Perdido'].includes(lead.status))
    .reduce((total, lead) => {
      const value = lead.valor?.replace(/[R$\s.]/g, '').replace(',', '.');
      return total + (parseFloat(value) || 0);
    }, 0);

  // Formulário para novo lead
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<NewLeadForm>({
    resolver: zodResolver(newLeadSchema)
  });

  const onSubmit = (data: NewLeadForm) => {
    if (!user) return;
    
    addLead({
      ...data,
      status: 'Novo' as const,
      corretorId: user.id
    });
    
    reset();
    setDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Novo": "bg-green-100 text-green-800",
      "Contato Realizado": "bg-blue-100 text-blue-800", 
      "Proposta Enviada": "bg-yellow-100 text-yellow-800",
      "Vendido": "bg-emerald-100 text-emerald-800",
      "Perdido": "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Meu Pipeline
          </h1>
          <p className="text-gray-600 mt-1">
            Olá, {user?.nome}! Gerencie seus leads e oportunidades
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Lead</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  {...register("nome")}
                  placeholder="Nome do lead"
                />
                {errors.nome && (
                  <p className="text-sm text-red-500 mt-1">{errors.nome.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  {...register("whatsapp")}
                  placeholder="(11) 99999-9999"
                />
                {errors.whatsapp && (
                  <p className="text-sm text-red-500 mt-1">{errors.whatsapp.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="interesse">Tipo de Interesse</Label>
                <Select onValueChange={(value) => setValue("interesse", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de interesse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Plano de Saúde">Plano de Saúde</SelectItem>
                    <SelectItem value="Seguro Auto">Seguro Auto</SelectItem>
                    <SelectItem value="Seguro Vida">Seguro Vida</SelectItem>
                    <SelectItem value="Seguro Residencial">Seguro Residencial</SelectItem>
                    <SelectItem value="Plano Empresarial">Plano Empresarial</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
                {errors.interesse && (
                  <p className="text-sm text-red-500 mt-1">{errors.interesse.message}</p>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Salvar Lead
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadsAtivos}</div>
            <p className="text-xs text-muted-foreground">
              {leads.length > 0 ? `${leads.length} leads total` : 'Nenhum lead ainda'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Propostas Enviadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propostasEnviadas}</div>
            <p className="text-xs text-muted-foreground">
              Aguardando retorno
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Potencial</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {faturamentoPotencial.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              Potencial este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Leads Recentes</CardTitle>
          <CardDescription>
            Seus leads mais recentes e suas situações atuais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <User className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-lg font-medium mb-2">Nenhum lead encontrado</p>
                <p className="text-sm">Comece adicionando seu primeiro lead usando o botão "Novo Lead" acima.</p>
              </div>
            ) : (
              leads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{lead.nome}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {lead.whatsapp}
                        </span>
                        <span>{lead.interesse}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{lead.valor}</div>
                      <div className="text-sm text-gray-500">{lead.dataContato}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorretorPipeline;