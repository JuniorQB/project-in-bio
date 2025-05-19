export default function Faq() {
  const faqItems = [

    {

      title: "Como funciona a criação de portfólio e links com Project in Bio",
      description: "Com Project in Bio, você pode criar um portfólio profissional e uma página de links em poucos minutos. Nossa plataforma oferece templates personalizados",
    },
    {
      title: "Há um período de teste gratuito?",
      description: "Sim! Oferecemos un teste gratuito de 3 dias, sem compromisso. Isso permite que você explore todas as funcionalidades da nossa plataforma antes de assinar",
    }, {
      title: "Posso personalizar o design do meu portfólio?",
      description: "Sim! Com Project in Bio, você pode personalizar cores, fontes e o layout do seu portfólio, garantindo que ele reflita a sua marca pessoal.",
    }, {
      title: "Preciso de habilidades técnicas para usar a plataforma?",
      description: "Não! Nossa plataforma foi desenvolvida para ser simples e intuitiva, então não é necessário conhecimento técnico. Você pode criar e personalizar",
    }, {
      title: "O que acontece se eu cancelar minha assinatura?",
      description: "Você pode cancelar sua assinatura a qualquer momento. Seu portfólio e página de links ficarão disponíveis até o final do período pago, mas após será excluído",
    }, {
      title: "Posso compartilhar meu portfólio em redes sociais?",
      description: "Sim! Você pode facilmente compartilhar seu portfólio e página de links em suas redes sociais através de um link personalizado.",
    }
  ]
  return (
    <div className="flex flex-col items-center gap-16 my-20">
      <h3 className="text-4xl font-bold text-white">Dúvidas Frequentes</h3>
      <div className="flex gap-3">
        <div className="flex flex-col gap-3">
          {
            faqItems.slice(0, Math.ceil(faqItems.length / 2)).map((item) => (
              <FAQItem key={item.title} titulo={item.title} descricao={item.description} />
            ))
          }
        </div>
        <div className="flex flex-col gap-3">
          {
            faqItems.slice(Math.ceil(faqItems.length / 2)).map((item) => (
              <FAQItem key={item.title} titulo={item.title} descricao={item.description} />
            ))
          }
        </div>

      </div>

    </div>
  );
}

function FAQItem({ titulo, descricao }: { titulo: string, descricao: string }) {
  return (
    <div className="w-[351px] h-min flex flex-col gap-3 p-5 rounded-2xl border border-border-primary bg-background-primary">
      <p className="font-bold text-white">{titulo}</p>
      <p className="font-bold text-content-body">{descricao}</p>
    </div>
  )
}