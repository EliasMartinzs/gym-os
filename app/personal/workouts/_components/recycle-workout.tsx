import { ResponsiveModal } from "@/components/reusable/responsive-modal";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getStudents } from "@/features/personal/student/api/get-students";
import { postWorkoutAssinged } from "@/features/personal/student/api/post-workout-assigned";
import client from "@/lib/client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { InferResponseType } from "hono";
import { Check, ChevronsUpDown, Recycle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ApiResponse = InferResponseType<typeof client.api.personal.workouts.$get>;

export type SingleWorkout = NonNullable<ApiResponse["data"]>[number];

export type Props = {
  workout: SingleWorkout;
};

const StudentSchema = z.object({
  studentId: z.string().min(1, {
    message: "Selecione o estudante",
  }),
});

export const RecycleWorkout = ({ workout }: Props) => {
  const [open, setOpen] = useState(false);
  const { data } = getStudents("user");
  const { mutate } = postWorkoutAssinged();

  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      studentId: "",
    },
  });

  if (!data) {
    return <>Nenhum estudante criado até o momento!</>;
  }

  function onSubmit(values: z.infer<typeof StudentSchema>) {
    const { studentId } = values;

    const data = {
      studentId: studentId,
      templateId: workout.id,
    };

    mutate(data);
  }

  return (
    <ResponsiveModal
      open={open}
      setOpen={setOpen}
      trigger={<Recycle />}
      key="RecycleWorkout"
      title="Reutilização de Templates de Treino"
      description="Esta funcionalidade permite reaproveitar templates de treino previamente criados, agilizando a criação de planos personalizados sem perder a consistência metodológica."
      className="xl:max-w-2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem className="w-full mt-5">
                <FormLabel className="w-full flex justify-center mb-5 text-lg">
                  Seleione o aluno que irá receber o treino
                </FormLabel>
                <FormControl>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between h-auto",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <div className="flex items-center gap-x-5">
                            {field.value && (
                              <Image
                                src={
                                  data.find(
                                    (student) => student.id === field.value
                                  )?.user.avatarUrl || "/no-user.png"
                                }
                                alt=""
                                width={48}
                                height={48}
                                className="rounded-2xl"
                              />
                            )}
                            {field.value
                              ? data.find(
                                  (student) => student.id === field.value
                                )?.user.name
                              : "Selecione o aluno"}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Busque por alunos..." />
                        <CommandList>
                          <CommandEmpty>Nenhum aluno encontrado</CommandEmpty>
                          <CommandGroup>
                            {data.map((student) => (
                              <CommandItem
                                value={student.user.id}
                                key={student.user.id}
                                onSelect={() => {
                                  form.setValue("studentId", student.id);
                                }}
                              >
                                <Image
                                  src={student.user.avatarUrl as string}
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="rounded-2xl"
                                />
                                {student.user.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    student.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" size="full" variant="primary">
            Salvar
          </Button>
        </form>
      </Form>
    </ResponsiveModal>
  );
};
