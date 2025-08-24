import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Car, Heart, Coins, GitCompare, ArrowRight, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EfikaPessoaFisica = () => {
  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>([]);
  const [comparativo, setComparativo] = useState<any>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const produtos = [
    {
      id: 'auto',
      icon: Car,
      nome: 'Seguro Auto',
      descricao: 'Proteção completa para seu veículo',
      valorMedio: 'R$ 150/mês',
      beneficios: ['Cobertura nacional', 'Assistência 24h', 'Carro reserva'],
      color: 'bg-blue-500'
    },
    {
      id: 'vida',
      icon: Heart,
      nome: 'Seguro Vida',
      descricao: 'Tranquilidade para toda família',
      valorMedio: 'R$ 45/mês',
      beneficios: ['Cobertura até R$ 500k', 'Assistência funeral', 'Renda mensal'],
      color: 'bg-red-500'
    },
    {
      id: 'residencial',
      icon: Home,
      nome: 'Seguro Residencial',
      descricao: 'Seu lar sempre protegido',
      valorMedio: 'R$ 80/mês',
      beneficios: ['Cobertura estrutural', 'Responsabilidade civil', 'Assistência 24h'],
      color: 'bg-green-500'
    },
    {
      id: 'consorcio',
      icon: Coins,
      nome: 'Consórcio',
      descricao: 'Realize seus sonhos sem juros',
      valorMedio: 'R$ 280/mês',
      beneficios: ['Sem juros', 'Taxa de administração baixa', 'Contemplação garantida'],
      color: 'bg-yellow-500'
    }
  ];

  const handleProdutoToggle = (produtoId: string) => {
    setProdutosSelecionados(prev => 
      prev.includes(produtoId) 
        ? prev.filter(id => id !== produtoId)
        : [...prev, produtoId]
    );
  };

  const handleComparar = () => {
    if (produtosSelecionados.length === 0) return;

    const produtosSelecionadosData = produtos.filter(p => produtosSelecionados.includes(p.id));
    const valorTotal = produtosSelecionados.reduce((total, id) => {
      const produto = produtos.find(p => p.id === id);
      const valor = parseInt(produto?.valorMedio.replace(/\D/g, '') || '0');
      return total + valor;
    }, 0);

    const descontoMultiproduto = produtosSelecionados.length > 1 ? Math.round(valorTotal * 0.15) : 0;
    const valorFinal = valorTotal - descontoMultiproduto;

    setComparativo({
      produtos: produtosSelecionadosData,
      valorTotal,
      desconto: descontoMultiproduto,
      valorFinal,
      economia: descontoMultiproduto
    });
  };

  const vantagens = [
    {
      icon: Star,
      titulo: "Proteção Personalizada",
      descricao: "Cada família é única. Criamos soluções sob medida para seu perfil específico."
    },
    {
      icon: CheckCircle,
      titulo: "Parcelamento Facilitado",
      descricao: "Divida em até 12x sem juros no cartão ou débito automático com desconto."
    },
    {
      icon: GitCompare,
      titulo: "Comparativo Transparente",
      descricao: "Compare todas as opções lado a lado e escolha a melhor para você."
    }
  ];

  return (
    <section id="pessoa-fisica" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6" variants={itemVariants}>
            <Home className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Pessoa Física</span>
          </motion.div>

          <motion.h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
            Proteção Completa para sua <span className="text-primary">Família</span>
          </motion.h2>
          
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
            Auto, vida, residencial e consórcio em um só lugar. Economize combinando produtos.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Left - Produtos */}
          <motion.div 
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h3 className="text-2xl font-bold text-gray-900 mb-8" variants={itemVariants}>
              Escolha os produtos que precisa:
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {produtos.map((produto, index) => (
                <motion.div 
                  key={produto.id}
                  className={`bg-white rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                    produtosSelecionados.includes(produto.id) 
                      ? 'border-primary shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                  }`}
                  variants={itemVariants}
                  onClick={() => handleProdutoToggle(produto.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${produto.color} flex items-center justify-center`}>
                      <produto.icon className="w-6 h-6 text-white" />
                    </div>
                    <Checkbox 
                      checked={produtosSelecionados.includes(produto.id)}
                      onCheckedChange={() => handleProdutoToggle(produto.id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {produto.nome}
                  </h4>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {produto.descricao}
                  </p>

                  <div className="text-xl font-bold text-primary mb-4">
                    {produto.valorMedio}
                  </div>

                  <div className="space-y-2">
                    {produto.beneficios.map((beneficio, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{beneficio}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="text-center" variants={itemVariants}>
              <Button 
                onClick={handleComparar}
                disabled={produtosSelecionados.length === 0}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary group px-8 py-3"
                size="lg"
              >
                <GitCompare className="mr-2 w-5 h-5" />
                Comparar Opções Selecionadas
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - Vantagens */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h3 className="text-xl font-bold text-gray-900 mb-6" variants={itemVariants}>
              Por que escolher múltiplos produtos?
            </motion.h3>

            <div className="space-y-6">
              {vantagens.map((vantagem, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  variants={itemVariants}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <vantagem.icon className="w-5 h-5 text-primary" />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {vantagem.titulo}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {vantagem.descricao}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20" variants={itemVariants}>
              <h4 className="font-semibold text-primary mb-3">
                💰 Desconto Multi-produto
              </h4>
              <p className="text-gray-700 text-sm mb-4">
                Combine 2 ou mais produtos e ganhe até <strong>15% de desconto</strong> no valor total.
              </p>
              <div className="text-xs text-gray-500">
                *Desconto aplicado automaticamente na contratação
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Comparativo Results */}
        {comparativo && (
          <motion.div
            className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Sua Proteção Personalizada
              </h3>
              <p className="text-gray-600">
                Comparativo dos produtos selecionados
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {comparativo.produtos.map((produto: any, index: number) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className={`w-8 h-8 rounded ${produto.color} flex items-center justify-center mb-3`}>
                    <produto.icon className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{produto.nome}</h4>
                  <div className="text-primary font-bold">{produto.valorMedio}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    R$ {comparativo.valorTotal}
                  </div>
                  <div className="text-sm text-gray-500">Valor Original</div>
                </div>
                
                {comparativo.desconto > 0 && (
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      - R$ {comparativo.desconto}
                    </div>
                    <div className="text-sm text-gray-500">Desconto Multi-produto</div>
                  </div>
                )}
                
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    R$ {comparativo.valorFinal}
                  </div>
                  <div className="text-sm text-gray-500">Valor Final/mês</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 group">
                  Contratar Agora
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button size="lg" variant="outline">
                  Falar com Consultor
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EfikaPessoaFisica;