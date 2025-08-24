import { useState } from "react";
import { ArrowRight, Shield, Clock, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const EfikaHero = () => {
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    interesse: ""
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead capturado:", formData);
    // Aqui será integrado com o backend
    alert(`Obrigado ${formData.nome}! Em breve entraremos em contato via WhatsApp.`);
  };

  const interestOptions = [
    "Plano de Saúde Individual",
    "Plano de Saúde Coletivo (2+ vidas)",
    "Seguro Auto",
    "Seguro Vida",
    "Seguro Residencial",
    "Seguro Empresarial",
    "Consórcio"
  ];

  return (
    <motion.div 
      className="relative w-full bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden"
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent)] bg-[length:100px_100px]" />
      </div>

      <div className="relative z-10 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Content */}
            <motion.div className="text-white" variants={itemVariants}>
              <motion.div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6" variants={itemVariants}>
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Mais de 50 seguradoras parceiras</span>
              </motion.div>

              <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" variants={itemVariants}>
                A corretora que cuida do que{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
                  importa
                </span>
              </motion.h1>

              <motion.p className="text-xl text-gray-200 mb-8 max-w-xl" variants={itemVariants}>
                Proteção completa para você e sua família em todo o Brasil. 
                Encontre o melhor seguro com quem entende do assunto.
              </motion.p>

              {/* Diferenciais */}
              <motion.div className="grid sm:grid-cols-2 gap-4 mb-8" variants={itemVariants}>
                {[
                  { icon: Clock, text: "Atendimento 24/7" },
                  { icon: Users, text: "Consultoria gratuita" },
                  { icon: CheckCircle, text: "Sem taxa oculta" },
                  { icon: Shield, text: "Aprovação em 24h" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div className="bg-white rounded-2xl shadow-2xl p-8" variants={itemVariants}>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Cotação Gratuita
                </h3>
                <p className="text-gray-600">
                  Preencha seus dados e receba as melhores opções
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-2 block">
                    Nome completo *
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                    className="w-full h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700 mb-2 block">
                    WhatsApp *
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    required
                    className="w-full h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="interesse" className="text-sm font-medium text-gray-700 mb-2 block">
                    Tipo de interesse *
                  </Label>
                  <Select value={formData.interesse} onValueChange={(value) => setFormData({ ...formData, interesse: value })}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Selecione o tipo de seguro" />
                    </SelectTrigger>
                    <SelectContent>
                      {interestOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  QUERO MINHA COTAÇÃO GRATUITA
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Ao clicar em "Quero minha cotação", você concorda com nossos{" "}
                  <a href="/privacy-policy" className="text-primary hover:underline">
                    termos de privacidade
                  </a>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EfikaHero;