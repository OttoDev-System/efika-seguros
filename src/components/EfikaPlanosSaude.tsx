import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, MapPin, Calculator, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EfikaPlanosSaude = () => {
  const [calculadora, setCalculadora] = useState({
    idade: "",
    dependentes: "0",
    regiao: ""
  });

  const [simulacao, setSimulacao] = useState<any>(null);

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

  const handleSimular = () => {
    // Simulação básica baseada na idade
    const idade = parseInt(calculadora.idade);
    const deps = parseInt(calculadora.dependentes);
    
    const valorBase = idade < 30 ? 180 : idade < 50 ? 320 : 450;
    const valorDependentes = deps * (idade < 30 ? 120 : idade < 50 ? 200 : 280);
    const total = valorBase + valorDependentes;

    setSimulacao({
      valorMinimo: Math.round(total * 0.8),
      valorMaximo: Math.round(total * 1.4),
      planos: [
        { nome: "Básico", valor: Math.round(total * 0.8), rede: "Regional" },
        { nome: "Premium", valor: Math.round(total * 1.1), rede: "Nacional" },
        { nome: "Master", valor: Math.round(total * 1.4), rede: "Nacional + Internacional" }
      ]
    });
  };

  const beneficios = [
    "Até 40% mais barato que contratar direto",
    "Sem carência para urgência/emergência", 
    "Cobertura nacional completa",
    "Planos coletivos a partir de 2 vidas",
    "Rede credenciada premium",
    "Consultoria gratuita personalizada"
  ];

  return (
    <section id="planos-saude" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6" variants={itemVariants}>
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Produto em Destaque</span>
          </motion.div>

          <motion.h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
            Planos de Saúde com as <span className="text-primary">Melhores Condições</span>
          </motion.h2>
          
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
            Cuidar da sua saúde não deveria ser um luxo. Encontre o plano ideal para você e sua família.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Side - Benefícios */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h3 className="text-2xl font-bold text-gray-900 mb-8" variants={itemVariants}>
              Por que nossos planos são diferentes?
            </motion.h3>

            <motion.div className="space-y-4 mb-8" variants={itemVariants}>
              {beneficios.map((beneficio, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-green-200 transition-colors">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {beneficio}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100" variants={itemVariants}>
              <h4 className="font-semibold text-gray-900 mb-4">
                🏥 Rede Credenciada Premium
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Acesso aos melhores hospitais e clínicas do Brasil, incluindo Hospital Albert Einstein, 
                Sírio-Libanês, Hospital das Clínicas e muito mais.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Ver Rede Credenciada
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Calculadora */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Calculadora de Planos de Saúde
                </CardTitle>
                <p className="text-blue-100 text-sm">
                  Simule gratuitamente e encontre o plano ideal
                </p>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Sua idade
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 35"
                    value={calculadora.idade}
                    onChange={(e) => setCalculadora({ ...calculadora, idade: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Número de dependentes
                  </label>
                  <Select value={calculadora.dependentes} onValueChange={(value) => setCalculadora({ ...calculadora, dependentes: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Apenas eu</SelectItem>
                      <SelectItem value="1">1 dependente</SelectItem>
                      <SelectItem value="2">2 dependentes</SelectItem>
                      <SelectItem value="3">3 dependentes</SelectItem>
                      <SelectItem value="4">4+ dependentes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Sua região
                  </label>
                  <Select value={calculadora.regiao} onValueChange={(value) => setCalculadora({ ...calculadora, regiao: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="outros">Outros estados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleSimular}
                  disabled={!calculadora.idade || !calculadora.dependentes || !calculadora.regiao}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary group"
                >
                  Simular Planos
                  <Calculator className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                </Button>

                {simulacao && (
                  <motion.div 
                    className="space-y-4 pt-4 border-t"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h4 className="font-semibold text-gray-900">
                      Opções encontradas para você:
                    </h4>
                    
                    {simulacao.planos.map((plano: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">{plano.nome}</div>
                            <div className="text-xs text-gray-500">{plano.rede}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              R$ {plano.valor}
                            </div>
                            <div className="text-xs text-gray-500">/mês</div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button className="w-full" variant="outline">
                      <Users className="mr-2 w-4 h-4" />
                      Falar com Especialista
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EfikaPlanosSaude;