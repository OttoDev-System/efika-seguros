import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LeadStatus = 'Novo' | 'Contato Realizado' | 'Proposta Enviada' | 'Vendido' | 'Perdido';

export interface Lead {
  id: string;
  nome: string;
  whatsapp: string;
  interesse: string;
  status: LeadStatus;
  corretorId: string;
  valor?: string;
  dataContato?: string;
}

interface LeadState {
  leads: Lead[];
  getLeadsByCorretorId: (corretorId: string) => Lead[];
  addLead: (newLead: Omit<Lead, 'id'>) => void;
}

// Leads mockados - alguns associados ao corretor Maria (id: '2')
const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    nome: 'Carlos Silva',
    whatsapp: '(11) 99999-1234',
    interesse: 'Plano de Saúde',
    valor: 'R$ 450/mês',
    status: 'Proposta Enviada',
    dataContato: 'Hoje',
    corretorId: '2' // Maria Corretor
  },
  {
    id: '2',
    nome: 'Ana Santos',
    whatsapp: '(11) 99999-5678',
    interesse: 'Seguro Auto',
    valor: 'R$ 1.200/ano',
    status: 'Contato Realizado',
    dataContato: 'Ontem',
    corretorId: '2' // Maria Corretor
  },
  {
    id: '3',
    nome: 'João Costa',
    whatsapp: '(11) 99999-9012',
    interesse: 'Seguro Vida',
    valor: 'R$ 89/mês',
    status: 'Novo',
    dataContato: '2 dias atrás',
    corretorId: '2' // Maria Corretor
  },
  {
    id: '4',
    nome: 'Mariana Oliveira',
    whatsapp: '(11) 99999-3456',
    interesse: 'Plano Empresarial',
    valor: 'R$ 2.500/mês',
    status: 'Proposta Enviada',
    dataContato: '3 dias atrás',
    corretorId: '2' // Maria Corretor
  },
  {
    id: '5',
    nome: 'Pedro Almeida',
    whatsapp: '(11) 99999-7890',
    interesse: 'Seguro Residencial',
    valor: 'R$ 180/mês',
    status: 'Vendido',
    dataContato: '1 semana atrás',
    corretorId: '2' // Maria Corretor
  },
  {
    id: '6',
    nome: 'Lucas Fernandes',
    whatsapp: '(11) 99999-2468',
    interesse: 'Seguro Auto',
    valor: 'R$ 800/ano',
    status: 'Perdido',
    dataContato: '2 semanas atrás',
    corretorId: '3' // Outro corretor
  }
];

export const useLeadStore = create<LeadState>()(
  persist(
    (set, get) => ({
      leads: MOCK_LEADS,
      getLeadsByCorretorId: (corretorId: string) => {
        return get().leads.filter(lead => lead.corretorId === corretorId);
      },
      addLead: (newLead: Omit<Lead, 'id'>) => {
        const newId = `lead_${Date.now()}`;
        const leadWithId = {
          ...newLead,
          id: newId,
          dataContato: 'Hoje',
          status: 'Novo' as LeadStatus
        };
        set(state => ({
          leads: [...state.leads, leadWithId]
        }));
      }
    }),
    {
      name: 'efika-leads-storage'
    }
  )
);