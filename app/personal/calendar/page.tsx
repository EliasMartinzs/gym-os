import { Main } from "@/components/reusable/main";
import { CreateSession } from "./_components/create-session";
import { HelpCircle } from "lucide-react";
import { Tooltip } from "@/components/reusable/tootip";
import { Sessions } from "./_components/sessions";

export default function Calendar() {
  return (
    <Main className="space-y-8">
      <div className="space-y-4">
        <div className="w-full flex items-center justify-between gap-x-6">
          <div className="flex gap-x-5 items-center">
            <h2 className="text-xl lg:text-3xl font-medium italic">
              Minhas seções
            </h2>
            <Tooltip
              text={
                <div className="flex flex-col mx-auto max-w-sm gap-y-2 text-start">
                  <p className="font-medium">
                    Como Funcionam os Agendamentos Recorrentes
                  </p>

                  <p>
                    Os agendamentos recorrentes permitem que você programe
                    sessões com seus alunos de forma automática e organizada.
                  </p>

                  <p>
                    Recorrência Flexível: Crie sessões diárias, semanais,
                    quinzenais ou mensais com apenas alguns cliques.
                  </p>
                  <p>
                    Duração Personalizável: Defina o tempo de cada sessão (de 30
                    minutos a 3 horas) conforme a necessidade do treino.
                  </p>
                  <p>
                    Ajustes Fáceis: Adicione exceções para feriados, folgas ou
                    imprevistos sem perder a programação original.
                  </p>
                  <p>
                    Visualização Clara: Acompanhe toda a sua agenda de forma
                    intuitiva, com destaque para as sessões agendadas.
                  </p>
                  <p>
                    💡 Dica: Use o modo Personalizado para criar intervalos
                    específicos entre as sessões, como treinos a cada 3 dias ou
                    a cada 2 semanas.
                  </p>
                </div>
              }
              trigger={<HelpCircle className="size-5" />}
            />
          </div>

          <CreateSession />
        </div>
      </div>

      <Sessions />
    </Main>
  );
}
