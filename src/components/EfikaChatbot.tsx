import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: string[];
}

const EfikaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Oi! Sou a Efi, sua assistente virtual da Efika Corretora. Como posso te ajudar hoje? 😊',
      sender: 'bot',
      timestamp: new Date(),
      options: [
        '🏥 Plano de Saúde',
        '🚗 Seguro Auto',
        '🏠 Seguro Residencial',
        '👤 Seguro Vida',
        '💰 Consórcio',
        '👨‍💼 Falar com Humano'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000 + Math.random() * 1000);
  };

  const addMessage = (text: string, sender: 'user' | 'bot', options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    addMessage(message, 'user');
    setInputMessage('');

    // Simulate bot response
    simulateTyping(() => {
      const responses = getBotResponse(message);
      responses.forEach((response, index) => {
        setTimeout(() => {
          addMessage(response.text, 'bot', response.options);
        }, index * 1000);
      });
    });
  };

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('plano') || msg.includes('saúde') || msg.includes('🏥')) {
      return [
        {
          text: 'Ótima escolha! Planos de Saúde são nossa especialidade. Para qual situação você precisa?',
          options: [
            'Individual (só para mim)',
            'Familiar (2-3 pessoas)', 
            'Coletivo (4+ pessoas)',
            'Empresarial'
          ]
        }
      ];
    }
    
    if (msg.includes('auto') || msg.includes('carro') || msg.includes('🚗')) {
      return [
        {
          text: 'Perfeito! Vou te ajudar com o Seguro Auto. Me conta:',
          options: [
            'Carro novo (0km)',
            'Carro usado',
            'Renovação de seguro',
            'Primeira vez'
          ]
        }
      ];
    }
    
    if (msg.includes('residencial') || msg.includes('casa') || msg.includes('🏠')) {
      return [
        {
          text: 'Proteção residencial é fundamental! Sua casa é:',
          options: [
            'Casa própria',
            'Apartamento próprio',
            'Casa alugada',
            'Apartamento alugado'
          ]
        }
      ];
    }
    
    if (msg.includes('vida') || msg.includes('👤')) {
      return [
        {
          text: 'Seguro de Vida é um ato de amor pela família. Você está procurando:',
          options: [
            'Proteção individual',
            'Proteção familiar',
            'Seguro empresarial',
            'Previdência privada'
          ]
        }
      ];
    }
    
    if (msg.includes('consórcio') || msg.includes('💰')) {
      return [
        {
          text: 'Consórcio é uma excelente forma de realizar sonhos! Qual seu objetivo?',
          options: [
            '🏠 Casa própria',
            '🚗 Carro novo',
            '🏍️ Moto',
            '💎 Outros bens'
          ]
        }
      ];
    }
    
    if (msg.includes('humano') || msg.includes('atendente') || msg.includes('👨‍💼')) {
      return [
        {
          text: 'Claro! Vou conectar você com um de nossos especialistas. Qual o melhor horário para te ligar?',
          options: [
            '📞 Agora mesmo',
            '🌅 Manhã (8h-12h)',
            '🌇 Tarde (13h-18h)',
            '💬 Prefiro WhatsApp'
          ]
        }
      ];
    }
    
    // Resposta padrão
    return [
      {
        text: 'Entendi! Para te ajudar melhor, escolha uma das opções abaixo ou digite sua dúvida:',
        options: [
          '🏥 Plano de Saúde',
          '🚗 Seguro Auto',
          '🏠 Seguro Residencial',
          '👤 Seguro Vida',
          '💰 Consórcio',
          '👨‍💼 Falar com Humano'
        ]
      }
    ];
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </Button>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      </motion.div>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Efi - Assistente Virtual</h3>
                  <p className="text-xs text-blue-100">Efika Corretora</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-white rounded-br-sm' 
                          : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                      }`}>
                        <div className="flex items-start gap-2">
                          {message.sender === 'bot' && (
                            <Bot className="w-4 h-4 mt-0.5 text-primary" />
                          )}
                          {message.sender === 'user' && (
                            <User className="w-4 h-4 mt-0.5 text-white" />
                          )}
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Options */}
                    {message.options && message.sender === 'bot' && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="block w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-primary/20"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2">
                      <div className="flex items-center gap-1">
                        <Bot className="w-4 h-4 text-primary" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-100" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim()}
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EfikaChatbot;