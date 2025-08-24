import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Ticket, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const SuporteTickets = () => {
  const { user } = useAuth();

  const tickets = [
    {
      id: "TK-001",
      cliente: "Maria Silva",
      assunto: "Dúvida sobre cobertura do plano",
      prioridade: "Alta",
      status: "Aberto",
      dataAbertura: "Hoje, 14:30",
      corretor: "João Santos"
    },
    {
      id: "TK-002",
      cliente: "Carlos Lima",
      assunto: "Problema com documentação",
      prioridade: "Média",
      status: "Em Andamento",
      dataAbertura: "Ontem, 16:45",
      corretor: "Ana Costa"
    },
    {
      id: "TK-003",
      cliente: "Empresa XYZ Ltda",
      assunto: "Solicitação de alteração de beneficiários",
      prioridade: "Baixa",
      status: "Resolvido",
      dataAbertura: "2 dias atrás",
      corretor: "Pedro Oliveira"
    },
    {
      id: "TK-004",
      cliente: "Roberto Alves",
      assunto: "Cancelamento de apólice",
      prioridade: "Alta",
      status: "Aguardando Cliente",
      dataAbertura: "3 dias atrás",
      corretor: "Maria Ferreira"
    }
  ];

  const getPrioridadeColor = (prioridade: string) => {
    const colors = {
      "Alta": "destructive",
      "Média": "default",
      "Baixa": "secondary"
    };
    return colors[prioridade as keyof typeof colors] || "default";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Aberto": "bg-red-100 text-red-800",
      "Em Andamento": "bg-blue-100 text-blue-800",
      "Aguardando Cliente": "bg-yellow-100 text-yellow-800",
      "Resolvido": "bg-green-100 text-green-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      "Aberto": AlertTriangle,
      "Em Andamento": Clock,
      "Aguardando Cliente": Clock,
      "Resolvido": CheckCircle
    };
    const Icon = icons[status as keyof typeof icons] || Ticket;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tickets de Suporte
          </h1>
          <p className="text-gray-600 mt-1">
            Bem-vindo, {user?.nome}! Gerencie as solicitações de suporte
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Ticket
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Abertos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              +3 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Sendo atendidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolvidos Hoje</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Meta: 10/dia
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h 15m</div>
            <p className="text-xs text-muted-foreground">
              Tempo de resolução
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets Recentes</CardTitle>
          <CardDescription>
            Lista dos tickets mais recentes e suas situações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-medium text-gray-900">{ticket.id}</h4>
                      <Badge variant={getPrioridadeColor(ticket.prioridade) as any}>
                        {ticket.prioridade}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{ticket.assunto}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Cliente: {ticket.cliente}</span>
                      <span>Corretor: {ticket.corretor}</span>
                      <span>{ticket.dataAbertura}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(ticket.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Atender
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

export default SuporteTickets;