import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, User, Phone, Calendar, DollarSign } from "lucide-react";

const CorretorPipeline = () => {
  const { user } = useAuth();

  const leads = [
    {
      id: 1,
      nome: "Carlos Silva",
      telefone: "(11) 99999-1234",
      interesse: "Plano de Saúde",
      valor: "R$ 450/mês",
      status: "Proposta Enviada",
      dataContato: "Hoje"
    },
    {
      id: 2,
      nome: "Ana Santos",
      telefone: "(11) 99999-5678",
      interesse: "Seguro Auto",
      valor: "R$ 1.200/ano",
      status: "Aguardando Documentos",
      dataContato: "Ontem"
    },
    {
      id: 3,
      nome: "João Costa",
      telefone: "(11) 99999-9012",
      interesse: "Seguro Vida",
      valor: "R$ 89/mês",
      status: "Primeiro Contato",
      dataContato: "2 dias atrás"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      "Proposta Enviada": "bg-blue-100 text-blue-800",
      "Aguardando Documentos": "bg-yellow-100 text-yellow-800",
      "Primeiro Contato": "bg-green-100 text-green-800"
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
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Lead
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +5 novos esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Propostas Enviadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
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
            <div className="text-2xl font-bold">R$ 12.450</div>
            <p className="text-xs text-muted-foreground">
              Este mês
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
            {leads.map((lead) => (
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
                        {lead.telefone}
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorretorPipeline;