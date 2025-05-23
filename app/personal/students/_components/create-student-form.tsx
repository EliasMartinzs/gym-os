"use client";

import { CreateButton } from "@/components/reusable/create-button";
import { Tooltip } from "@/components/reusable/tootip";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postStudent } from "@/features/personal/student/api/post-student";
import { SelectOptions } from "@/lib/enum-tranlations";
import { cn, parseDateString } from "@/lib/utils";
import { NewStudenFormValues, NewStudentSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "@react-input/mask";
import { Eye, EyeClosed, HelpCircle, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type Props = {
  setClose: () => void;
};

export const CreateStudenForm = ({ setClose }: Props) => {
  const [showPassword, setShowPassword] = useState<"password" | "text">(
    "password"
  );
  const [error, setError] = useState("");
  const form = useForm<NewStudenFormValues>({
    resolver: zodResolver(NewStudentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: undefined,
      trainingFormat: "HYBRID",
      injuries: [],
      role: "STUDENT",
      status: "ACTIVE",
      password: "",
      gender: "MALE",
    },
  });

  const { fields, append, remove } = useFieldArray<NewStudenFormValues>({
    control: form.control,
    name: "injuries" as never,
  });

  const mutation = postStudent();

  function onSubmit(values: NewStudenFormValues) {
    mutation.mutate(values, {
      onSuccess: (data) => {
        if (data.success) {
          form.reset();
          setClose();
        } else {
          setError(data.message);
        }

        return;
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 overflow-y-auto no-scrollbar"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Nome"
                  {...field}
                  disabled={mutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="E-Mail"
                  type="email"
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Senha"
                    type={showPassword}
                    {...field}
                    disabled={mutation.isPending}
                  />
                  <button
                    onClick={() =>
                      setShowPassword((prevState) =>
                        prevState === "password" ? "text" : "password"
                      )
                    }
                    className="absolute top-3 right-3 transition-all cursor-pointer"
                    type="button"
                  >
                    {showPassword === "password" ? (
                      <EyeClosed className="text-muted-foreground" />
                    ) : (
                      <Eye className="text-muted-foreground" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMask
                  {...field}
                  mask="+55 (__) _____-____"
                  placeholder="Telefone"
                  replacement={{ _: /\d/ }}
                  disabled={mutation.isPending}
                  className={cn(
                    "file:text-foreground placeholder:text-muted-foreground border-input flex h-12 w-full min-w-0 focus:border-primary border-b bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputMask
                  mask="__/__/____"
                  onChange={(e) => {
                    field.onChange(parseDateString(e.target.value));
                  }}
                  placeholder="Data de nascimento"
                  replacement={{ _: /\d/ }}
                  disabled={mutation.isPending}
                  className={cn(
                    "file:text-foreground placeholder:text-muted-foreground border-input flex h-12 w-full min-w-0 focus:border-primary border-b bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center justify-start"
                  disabled={mutation.isPending}
                >
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="MALE" />
                    </FormControl>
                    <FormLabel className="font-normal">Masculino</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center">
                    <FormControl>
                      <RadioGroupItem value="FEMALE" />
                    </FormControl>
                    <FormLabel className="font-normal">Feminino</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 w-full">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`injuries.${index}`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex: Lesão no joelho, Hérnia de disco..."
                        disabled={mutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex items-center gap-x-3 w-full">
            <Button type="button" variant="outline" onClick={() => append("")}>
              Adicionar Lesão/Problema
            </Button>
            <Tooltip
              trigger={<HelpCircle className="size-5 text-muted-foreground" />}
              text={
                <div className="space-y-4">
                  <p className="font-medium">
                    Aqui você pode adicionar as lesões, limitações físicas ou
                    condições de saúde dos seus alunos. Isso ajuda a:
                  </p>

                  <p>Lesões antigas (ex.: lombar, joelho, ombro).</p>
                  <p>Problemas crônicos (ex.: hérnia de disco, tendinite).</p>
                  <p>Restrições médicas (ex.: não pode fazer impacto).</p>
                </div>
              }
            />
          </div>
        </div>

        <div className="flex items-start gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={mutation.isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {SelectOptions.Status.map((status) => (
                        <SelectItem value={status.value} key={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trainingFormat"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Formato</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={mutation.isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {SelectOptions.TrainingFormat.map((status) => (
                        <SelectItem value={status.value} key={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="p-2 text-center text-destructive">{error}</div>

        <CreateButton isPending={mutation.isPending} label="Criar novo aluno" />
      </form>
    </Form>
  );
};
