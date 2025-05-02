import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const highlights = [
  "Planos de treino sob medida para seu biotipo",
  "Acompanhamento de evolução com métricas precisas",
  "Dietas integradas ao seu ritmo de vida",
  "Suporte de experts certificados",
];

const featureCards = [
  {
    title: "Treinos Personalizados",
    description:
      "Planos de treino adaptáveis ao seu nível e objetivos, com ajustes automáticos conforme seu progresso.",
    icon: "🏋️‍♂️",
  },
  {
    title: "Acompanhamento Nutricional",
    description:
      "Dietas flexíveis integradas ao seu treino e estilo de vida, com suporte de nutricionistas.",
    icon: "🥗",
  },
  {
    title: "Tecnologia Inteligente",
    description:
      "Nosso algoritmo aprende com seus resultados para sugerir os melhores exercícios e cargas.",
    icon: "🤖",
  },
];

export const Hero = () => {
  return (
    <section className="w-full space-y-6 lg:space-y-20">
      {/* Image Container */}
      <div className="w-full h-96 lg:h-[900px] relative flex items-center justify-center">
        <Image
          src="/background-2.jpg"
          fill
          alt="man"
          className="object-center object-cover opacity-45 border-t-4 border-b-4 border-black shadow sombra-mesclada"
          loading="lazy"
        />

        <div className="w-3/4 text-center space-y-8 z-50">
          <h1 className="text-lg lg:text-5xl font-black">
            Transforme Seu Corpo com Treinos Inteligentes
          </h1>

          <Link
            href="/login"
            className={cn(
              buttonVariants(),
              "bg-green-500 text-black hover:bg-green-600"
            )}
          >
            Começe agora
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-3">
        {highlights.map((item) => (
          <p key={item} className="max-lg:text-sm lg:text-lg">
            {item}
          </p>
        ))}
      </div>

      <FeatureCards />
    </section>
  );
};

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-12 max-w-6xl mx-auto">
      {featureCards.map((card, index) => (
        <Card key={index} className="bg-black border-zinc-500 shadow">
          <CardHeader className="p-6">
            <div className="text-4xl mb-4">{card.icon}</div>
            <CardTitle className="text-xl font-bold text-white mb-2">
              {card.title}
            </CardTitle>

            <p className="text-white">{card.description}</p>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
