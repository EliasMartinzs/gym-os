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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import client from "@/lib/client";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { cn } from "@/lib/utils";
import { FullSessionFormValues } from "@/validations/session";
import { LocationType, PriorityLevel, SessionStatus } from "@prisma/client";
import { InferResponseType } from "hono";
import { UseFormReturn } from "react-hook-form";

type Students = InferResponseType<
  (typeof client.api.personal)["students-session"]["$get"]
>["data"];

type Props = {
  form: UseFormReturn<FullSessionFormValues>;
  students: Students;
  isLoading: boolean;
};

export const Step1FormSession = ({ form, students, isLoading }: Props) => {
  const { control, setValue } = form;

  const location = form.watch("session.locationType");

  return (
    <div className="space-y-6 overflow-hidden">
      <FormField
        control={form.control}
        name="session.studentId"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Popover modal>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start">
                    {students?.find((item) => item.id === field.value)?.user
                      .name || <p>Selecione um aluno</p>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="z-50"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  {isLoading ? (
                    <p className="text-center">Carregando alunos...</p>
                  ) : (
                    <Command>
                      <CommandInput placeholder="Selecione um aluno" />
                      <CommandList>
                        <CommandEmpty>Nenhum aluno encontrado</CommandEmpty>
                        <CommandGroup>
                          {students?.map((item) => (
                            <CommandItem
                              key={item.id}
                              value={item.id}
                              onSelect={() => {
                                setValue("session.studentId", item.id);
                                setValue(
                                  "session.workoutTemplateId",
                                  item.workoutTemplate[0].id
                                );
                                setValue(
                                  "session.assignedWorkoutTemplateId",
                                  item.AssignedWorkoutTemplate[0].id
                                );
                              }}
                            >
                              {item.user.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  )}
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="session.locationType"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-wrap gap-4"
              >
                {Object.values(LocationType).map((item) => (
                  <FormItem
                    key={item}
                    className="flex items-center space-x-2 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={item} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {EnumTranslations.LocationType[item]}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className={cn("space-y-5", location === "ONLINE" && "hidden")}>
        <div className="flex gap-5">
          <FormField
            control={control}
            name="session.street"
            render={({ field }) => (
              <FormItem className={cn("flex-1")}>
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Augusto letreiro benz" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="session.number"
            render={({ field }) => (
              <FormItem className={cn("w-20")}>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="58" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-5">
          <FormField
            control={control}
            name="session.neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Centro" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="session.postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="00000-000" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="session.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Londrina" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-start flex-wrap gap-6">
        <FormField
          control={form.control}
          name="session.status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start">
                      {EnumTranslations.SessionStatus[field.value] || (
                        <p>Selecione um status</p>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="z-50"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <Command>
                      <CommandInput placeholder="Selecione um aluno" />
                      <CommandList>
                        <CommandEmpty>Nenhum status encontrado</CommandEmpty>
                        <CommandGroup>
                          {Object.values(SessionStatus)?.map((item) => (
                            <CommandItem
                              key={item}
                              value={item}
                              onSelect={() => {
                                setValue("session.status", item);
                              }}
                            >
                              {EnumTranslations.SessionStatus[item]}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="session.priority"
          render={({ field }) => (
            <FormItem className="flex=1">
              <FormControl>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start">
                      {EnumTranslations.PriorityLevel[field.value] || (
                        <p>Selecione a prioridade</p>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="z-50"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <Command>
                      <CommandInput placeholder="Selecione um aluno" />
                      <CommandList>
                        <CommandEmpty>
                          Nenhuma prioridade encontrada
                        </CommandEmpty>
                        <CommandGroup>
                          {Object.values(PriorityLevel)?.map((item) => (
                            <CommandItem
                              key={item}
                              value={item}
                              onSelect={() => {
                                setValue("session.priority", item);
                              }}
                            >
                              {EnumTranslations.PriorityLevel[item]}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="session.observations"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                rows={6}
                placeholder="Observações"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
