import { Tooltip } from "@/components/reusable/tootip";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { WorkoutTemplateSchema } from "@/lib/validations";
import { HelpCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { RichTextEditor } from "./rich-text-editor";

type Props = {
  form: UseFormReturn<z.infer<typeof WorkoutTemplateSchema>>;
};

export const Step1Form = ({ form }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium italic">Informações Básicas</h2>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Template</FormLabel>
            <FormControl>
              <Input placeholder="Meu Plano de Treino" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="xl:min-w-6xl">
            <FormLabel>Descrição (Opcional)</FormLabel>
            <FormControl>
              <RichTextEditor onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center gap-x-3">
        <FormField
          control={form.control}
          name="isReusable"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="flex items-center gap-x-3">
                Template Reutilizável
                <Tooltip
                  text={
                    <div className="flex flex-col mx-auto max-w-sm gap-y-2 text-start">
                      <p className="font-medium">
                        Marque esta opção para criar um template que pode ser
                        usado com vários alunos. Templates reutilizáveis
                        permitem que você:
                      </p>

                      <p>
                        - Salve configurações padrão (metas, nível de
                        dificuldade).
                      </p>
                      <p>
                        - Aplique o mesmo template a diferentes alunos - Faça
                        ajustes individuais para cada aluno quando necessário
                        Desmarque para criar um treino personalizado apenas para
                        um aluno específico.
                      </p>
                    </div>
                  }
                  trigger={<HelpCircle className="size-5" />}
                />
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="flex items-center gap-x-2">
                Template pubíco
                <Tooltip
                  text={
                    <div className="flex flex-col mx-auto max-w-sm gap-y-2 text-start">
                      <p className="font-medium">
                        Templates públicos ficam visíveis para:
                      </p>

                      <p>- Todos os professores do The Personal</p>
                      <p>
                        - Podem ser usados como base por outros profissionais.
                      </p>

                      <p>
                        Aparecem nos resultados de busca globais Deixe
                        desmarcado para manter seu template privado (visível
                        apenas para você).
                      </p>
                    </div>
                  }
                  trigger={<HelpCircle className="size-5" />}
                />
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
