import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Shield, Users, TrendingUp, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EfikaPessoaJuridica = () => {
  const [simuladorPJ, setSimuladorPJ] = useState({
    funcionarios: "",
    setor: "",
    faixaEtaria: ""
  });

  const [resultadoSimulacao, setResultadoSimulacao] = useState<any>(null);

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

  const handleSimularPJ = () => {
    const funcionarios = parseInt(simuladorPJ.funcionarios);
    const multiplicador = simuladorPJ.setor === 'tecnologia' ? 1.2 : 
                         simuladorPJ.setor === 'industrial' ? 1.1 : 1.0;
    
    const valorBase = funcionarios < 10 ? 150 : funcionarios < 50 ? 120 : 100;
    const valorTotal = Math.round(valorBase * funcionarios * multiplicador);

    setResultadoSimulacao({
      valorMensal: valorTotal,
      valorAnual: valorTotal * 12,
      economia: Math.round(valorTotal * 0.25),
      planos: [
        { nome: 'Executivo', cobertura: 'Nacional', valor: Math.round(valorTotal * 1.2) },
        { nome: 'Premium', cobertura: 'Regional + Telemedicina', valor: valorTotal },
        { nome: 'Essencial', cobertura: 'Regional', valor: Math.round(valorTotal * 0.8) }
      ]
    });
  };

  const produtosPJ = [
    {
      icon: Shield,
      titulo: "Seguros Empresariais Completos",
      descricao: "Proteção total para sua empresa: responsabilidade civil, patrimonial, cyber seguro e muito mais.",
      beneficios: ["Cobertura 24/7", "Suporte jurídico", "Indenização rápida"]
    },
    {
      icon: Users,
      titulo: "Planos Coletivos a partir de 2 vidas",
      descricao: "Saúde e odontológico para sua equipe com condições especiais e rede credenciada premium.",
      beneficios: ["Sem carência", "Rede nacional", "Gestão online"]
    },
    {
      icon: TrendingUp,
      titulo: "Consultoria Gratuita de Riscos",
      descricao: "Análise completa dos riscos do seu negócio com especialistas em seguros empresariais.",
      beneficios: ["Avaliação gratuita", "Plano personalizado", "Acompanhamento contínuo"]
    },
    {
      icon: Building2,
      titulo: "Soluções por Setor",
      descricao: "Produtos específicos para cada área: tecnologia, saúde, indústria, comércio e serviços.",
      beneficios: ["Especialização setorial", "Coberturas específicas", "Preços competitivos"]
    }
  ];

  return (
    <section id="pessoa-juridica" className="py-20 bg-gradient-to-br from-gray-900 via-primary to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6" variants={itemVariants}>
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">Soluções Empresariais</span>
          </motion.div>

          <motion.h2 className="text-3xl sm:text-4xl font-bold mb-4" variants={itemVariants}>
            Proteção Empresarial <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Sob Medida</span>
          </motion.h2>
          
          <motion.p className="text-xl text-gray-200 max-w-3xl mx-auto" variants={itemVariants}>
            Soluções completas para proteger seu negócio e cuidar da sua equipe com as melhores condições do mercado.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          
          {/* Left Side - Produtos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="space-y-8"
          >
            {produtosPJ.map((produto, index) => (
              <motion.div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                variants={itemVariants}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                    <produto.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                      {produto.titulo}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {produto.descricao}
                    </p>

                    <div className="space-y-2">
                      {produto.beneficios.map((beneficio, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-gray-300">{beneficio}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side - Simulador */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <Card className="bg-white shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Simulador Planos Coletivos
                </CardTitle>
                <p className="text-blue-100 text-sm">
                  Descubra o investimento ideal para sua equipe
                </p>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6 text-gray-900">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Número de funcionários
                  </label>
                  <Select value={simuladorPJ.funcionarios} onValueChange={(value) => setSimuladorPJ({ ...simuladorPJ, funcionarios: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-5">2 a 5 funcionários</SelectItem>
                      <SelectItem value="6-10">6 a 10 funcionários</SelectItem>
                      <SelectItem value="11-30">11 a 30 funcionários</SelectItem>
                      <SelectItem value="31-100">31 a 100 funcionários</SelectItem>
                      <SelectItem value="100+">Mais de 100 funcionários</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Setor da empresa
                  </label>
                  <Select value={simuladorPJ.setor} onValueChange={(value) => setSimuladorPJ({ ...simuladorPJ, setor: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o setor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="saude">Saúde</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                      <SelectItem value="comercio">Comércio</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="servicos">Serviços</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Faixa etária predominante
                  </label>
                  <Select value={simuladorPJ.faixaEtaria} onValueChange={(value) => setSimuladorPJ({ ...simuladorPJ, faixaEtaria: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-30">18 a 30 anos</SelectItem>
                      <SelectItem value="31-45">31 a 45 anos</SelectItem>
                      <SelectItem value="46-60">46 a 60 anos</SelectItem>
                      <SelectItem value="mista">Faixa mista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleSimularPJ}
                  disabled={!simuladorPJ.funcionarios || !simuladorPJ.setor || !simuladorPJ.faixaEtaria}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary group"
                >
                  Simular Planos Coletivos
                  <Calculator className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                </Button>

                {resultadoSimulacao && (
                  <motion.div 
                    className="space-y-4 pt-4 border-t"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">
                        💰 Economia de até R$ {resultadoSimulacao.economia}/mês
                      </h4>
                      <p className="text-green-700 text-sm">
                        Em comparação com planos individuais
                      </p>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900">
                      Opções de planos disponíveis:
                    </h4>
                    
                    {resultadoSimulacao.planos.map((plano: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">{plano.nome}</div>
                            <div className="text-xs text-gray-500">{plano.cobertura}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              R$ {plano.valor}
                            </div>
                            <div className="text-xs text-gray-500">/mês total</div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button className="w-full" variant="outline">
                      <Building2 className="mr-2 w-4 h-4" />
                      Solicitar Proposta Detalhada
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-2xl font-bold mb-4" variants={itemVariants}>
            Pronto para proteger seu negócio?
          </motion.h3>
          
          <motion.p className="text-gray-200 mb-8 max-w-2xl mx-auto" variants={itemVariants}>
            Fale com nossos especialistas em seguros empresariais e descubra a solução ideal para sua empresa.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 group">
              <Building2 className="mr-2 w-5 h-5" />
              Agendar Consultoria Gratuita
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary group">
              📞 (11) 99999-9999
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EfikaPessoaJuridica;