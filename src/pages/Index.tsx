
import EfikaHero from '@/components/EfikaHero';
import EfikaDiferenciais from '@/components/EfikaDiferenciais';
import EfikaPlanosSaude from '@/components/EfikaPlanosSaude';
import EfikaPessoaJuridica from '@/components/EfikaPessoaJuridica';
import EfikaPessoaFisica from '@/components/EfikaPessoaFisica';
import EfikaChatbot from '@/components/EfikaChatbot';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <>
      <SEO 
        title="Efika Corretora - A corretora que cuida do que importa" 
        description="Proteção completa para você e sua família em todo o Brasil. Planos de saúde, seguros e consórcios com as melhores condições do mercado."
        keywords={['seguro de vida', 'plano de saúde', 'seguro auto', 'seguro residencial', 'consórcio', 'corretora de seguros']}
      />
      <main className="min-h-screen">
        <EfikaHero />
        <EfikaDiferenciais />
        <EfikaPlanosSaude />
        <EfikaPessoaJuridica />
        <EfikaPessoaFisica />
        <EfikaChatbot />
      </main>
    </>
  );
};

export default Index;
