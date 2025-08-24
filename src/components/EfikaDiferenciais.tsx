import { motion } from "framer-motion";
import { Clock, Users, DollarSign, CheckCircle } from "lucide-react";

const EfikaDiferenciais = () => {
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

  const diferenciais = [
    {
      icon: Clock,
      titulo: "Atendimento humanizado 24/7",
      descricao: "Suporte completo a qualquer hora, com pessoas reais prontas para ajudar você.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Users,
      titulo: "Consultoria gratuita personalizada",
      descricao: "Análise completa do seu perfil para encontrar a proteção ideal para sua família.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: DollarSign,
      titulo: "Sem taxa de corretagem oculta",
      descricao: "Transparência total. Você paga apenas o que foi acordado, sem surpresas.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: CheckCircle,
      titulo: "Aprovação em até 24h",
      descricao: "Processo agilizado com nossas seguradoras parceiras para você ter proteção rapidamente.",
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
            Por que escolher a <span className="text-primary">Efika</span>?
          </motion.h2>
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
            Mais de 10 anos no mercado, cuidando do que realmente importa: sua tranquilidade e proteção.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {diferenciais.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-primary/20"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {item.titulo}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.descricao}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 bg-white rounded-2xl shadow-lg p-8 lg:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Números que falam por si só
            </h3>
            <p className="text-gray-600">
              A confiança de milhares de famílias brasileiras
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { numero: "50+", texto: "Seguradoras Parceiras" },
              { numero: "15k+", texto: "Famílias Protegidas" },
              { numero: "24h", texto: "Tempo de Aprovação" },
              { numero: "99%", texto: "Satisfação dos Clientes" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center group"
                variants={itemVariants}
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.numero}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.texto}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EfikaDiferenciais;