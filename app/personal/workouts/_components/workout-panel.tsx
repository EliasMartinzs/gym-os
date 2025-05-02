import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { formatDate } from "@/lib/utils";
import { DayOfWeek } from "@prisma/client";
import { motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { WorkoutProps } from "./workout";
import { Button } from "@/components/ui/button";
import { DeleteWorkout } from "./delete-workout";

interface Props extends WorkoutProps {
  closePanel: () => void;
}

export const WorkoutPanel = ({ closePanel, workout }: Props) => {
  const {
    createdAt,
    creator,
    days,
    defaultGoal,
    defaultLevel,
    defaultTags,
    description,
    isPublic,
    name,
  } = workout;
  return (
    <Card className="max-w-[90vw] xl:min-w-6xl relative max-h-[75vh] overflow-auto">
      <CardHeader className="space-y-4">
        <CardTitle className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-y-2 gap-x-8">
          <h6 className="capitalize text-xl">{name}</h6>

          <p className="font-light">{isPublic ? "Público" : "Privado"}</p>
        </CardTitle>
        <CardDescription
          dangerouslySetInnerHTML={{ __html: description ?? "" }}
        />
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {defaultGoal && (
            <div>
              <p className="font-medium">Objetivos</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {defaultGoal.map((item) => (
                  <p
                    className="border-b border-primary p-2 font-light"
                    key={item}
                  >
                    {EnumTranslations.FitnessGoal[item]}
                  </p>
                ))}
              </div>
            </div>
          )}

          {defaultLevel !== null && (
            <div>
              <p className="font-medium">Dificuldade</p>

              <div className="flex flex-wrap gap-2 mt-2">
                <p className="border-b border-primary p-2 font-light">
                  {EnumTranslations.DifficultyLevel[defaultLevel]}
                </p>
              </div>
            </div>
          )}

          {defaultTags.length !== 0 && (
            <div>
              <p className="font-medium">Tags</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {defaultTags.map((item) => (
                  <small
                    className="border-b border-primary p-2 font-light"
                    key={item}
                  >
                    {item}
                  </small>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <h6 className="font-bold text-lg">Ficha de treino</h6>

          <div className="w-full flex gap-2 flex-col">
            {days.map((day) => (
              <div
                key={day.id}
                className="p-4 space-y-2 bg-background rounded-lg border
                md:min-w-fullmd:mb-4"
              >
                {/* Cabeçalho do Dia */}
                <div className="sticky top-0 bg-background pb-2 z-10">
                  <h6 className="font-extrabold text-xl">
                    {EnumTranslations.DayOfWeek[day.dayOfWeek as DayOfWeek]}
                  </h6>
                  <h5 className="font-medium text-lg">{day.name}</h5>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">Músculos alvo:</span>
                    <div className="flex flex-wrap gap-2">
                      {day.focusMuscle.map((muscle) => (
                        <span
                          key={muscle}
                          className="bg-muted px-2 py-1 rounded-full"
                        >
                          {EnumTranslations.MuscleGroup[muscle]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lista de Exercícios */}
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pb-4 md:max-h-none">
                  {day.exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className="p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <p className="text-lg font-semibold mb-2">
                        Exercício {index + 1}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium block">Exercício: </span>
                          <span className="text-muted-foreground">
                            {exercise.name}
                          </span>
                        </div>

                        <div>
                          <span className="font-medium block">Tipo: </span>
                          <span className="text-muted-foreground">
                            {exercise.type}
                          </span>
                        </div>

                        <div>
                          <span className="font-medium block">Músculo: </span>
                          <span className="text-muted-foreground">
                            {exercise.muscle}
                          </span>
                        </div>

                        <div>
                          <span className="font-medium block">
                            Equipamento:{" "}
                          </span>
                          <span className="text-muted-foreground">
                            {exercise.equipment}
                          </span>
                        </div>

                        <div>
                          <span className="font-medium block">
                            Dificuldade:{" "}
                          </span>
                          <span className="text-muted-foreground">
                            {exercise.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="font-medium block">Instruções: </span>
                        <p className="text-muted-foreground text-sm mt-1">
                          {exercise.instructions}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-centet justify-between gap-5 px-0">
        <div>
          <p>Criador: {creator.user.name ?? ""}</p>
          <p className="font-light">Criado em: {formatDate(createdAt)}</p>
        </div>
      </CardFooter>
      <motion.button
        className="absolute top-5 right-5 z-50 hover:text-primary cursor-pointer"
        onClick={closePanel}
        whileTap={{ y: 1 }}
      >
        <X />
      </motion.button>
    </Card>
  );
};
