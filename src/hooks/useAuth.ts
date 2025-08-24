import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'corretor' | 'suporte';

export interface User {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Usuários mockados conforme PRD
const MOCK_USERS = [
  {
    id: '1',
    nome: 'Administrador Efika',
    email: 'admin@efika.com.br',
    password: 'admin123',
    role: 'admin' as UserRole
  },
  {
    id: '2',
    nome: 'Maria Corretor',
    email: 'maria@efika.com.br',
    password: 'maria123',
    role: 'corretor' as UserRole
  },
  {
    id: '3',
    nome: 'Suporte Efika',
    email: 'suporte@efika.com.br',
    password: 'suporte123',
    role: 'suporte' as UserRole
  }
];

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        const mockUser = MOCK_USERS.find(
          user => user.email === email && user.password === password
        );
        
        if (mockUser) {
          const { password: _, ...userWithoutPassword } = mockUser;
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true 
          });
          return true;
        }
        
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'efika-auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);