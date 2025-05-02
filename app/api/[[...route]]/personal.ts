import { getPersonalTrainerById } from "@/actions/personal";
import prisma from "@/lib/db";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { calculateDuration } from "@/lib/utils";
import { NewStudentSchema } from "@/lib/validations";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { clerkClient } from "@clerk/nextjs/server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import {
  DifficultyLevel,
  FitnessGoal,
  Prisma,
  TrainingFormat,
} from "@prisma/client";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get("genders", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        { success: false, message: "Usuário não autenticado", data: null },
        401
      );
    }

    try {
      const personalTrainer = await getPersonalTrainerById(auth.userId);

      const genderCount = await prisma.student.groupBy({
        by: ["gender"],
        where: {
          personalTrainerId: personalTrainer?.id,
        },
        _count: {
          gender: true,
        },
      });

      const result = {
        MALE: genderCount.find((g) => g.gender === "MALE")?._count.gender || 0,
        FEMALE:
          genderCount.find((g) => g.gender === "FEMALE")?._count.gender || 0,
      };

      return c.json({
        success: true,
        message: null,
        data: result,
      });
    } catch (error: any) {
      console.log(error);

      return c.json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  })
  .get("birthdate", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        { success: false, message: "Usuário não autenticado", data: null },
        401
      );
    }

    try {
      const today = new Date();
      const month = today.getMonth() + 1; // getMonth() retorna 0-11
      const day = today.getDate();

      const students = await prisma.student.findMany({
        where: {
          birthDate: {
            not: null,
          },
        },
        include: {
          user: true,
        },
      });

      const birthdayUsers = students
        .filter((student) => {
          if (!student.birthDate) return false;
          const birthDate = new Date(student.birthDate);
          return (
            birthDate.getDate() === day && birthDate.getMonth() + 1 === month
          );
        })
        .map((student) => student.user);

      return c.json({
        success: true,
        message: null,
        data: birthdayUsers,
      });
    } catch (error: any) {
      console.log(error);
      return c.json({
        success: false,
        message: `Houve um erro, ${error.message}`,
        data: null,
      });
    }
  })
  .get("status", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        { success: false, message: "Usuário não autenticado", data: null },
        401
      );
    }

    try {
      const personalTrainerId = await getPersonalTrainerById(auth.userId);

      const statusCounts = await prisma.student.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
        where: {
          personalTrainerId: personalTrainerId?.id,
        },
      });

      const result = statusCounts.map(({ status, _count }, index) => ({
        name: EnumTranslations.Status[status],
        count: _count.status,
        fill: `var(--chart-${index + 1})`,
      }));

      return c.json({
        success: true,
        message: "Status retornado com sucesso",
        data: result,
      });
    } catch (error: any) {
      console.error(error);

      return c.json({
        success: false,
        message:
          error.message || "Houve um erro ao buscar estudantes por status",
        data: null,
      });
    }
  })
  .get("duration", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        { success: false, message: "Usuário não autenticado", data: null },
        401
      );
    }

    try {
      const personalTrainer = await getPersonalTrainerById(auth.userId);

      const students = await prisma.student.findMany({
        where: {
          personalTrainer: {
            id: personalTrainer?.id,
          },
        },
        orderBy: {
          createdAt: "asc",
        },
        include: {
          user: true,
        },
      });

      const studentsWithDuration = students.map((student, index) => ({
        name: student.user.name,
        durationAsStudent: calculateDuration(student.createdAt),
      }));

      return c.json({
        success: true,
        message: null,
        data: studentsWithDuration,
      });
    } catch (error: any) {
      console.error(error);
      return c.json({
        success: false,
        message: `Houve um erro, ${error.message}`,
        data: null,
      });
    }
  })
  .get("last-students", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        { success: false, message: "Usuário não autenticado", data: null },
        401
      );
    }

    try {
      const personalTrainer = await getPersonalTrainerById(auth.userId);

      const data = await prisma.student.findMany({
        where: {
          personalTrainerId: personalTrainer?.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              name: true,
              avatarUrl: true,
              phone: true,
            },
          },
        },
        take: 5,
      });

      return c.json({
        success: true,
        message: null,
        data: data,
      });
    } catch (error: any) {
      console.error(error);

      return c.json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  })
  .get("top-exercises", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        { success: false, message: "Usuário não autenticado", data: null },
        401
      );
    }

    try {
      const personalTrainer = await getPersonalTrainerById(auth.userId);

      const topExercises = await prisma.exerciseInWorkout.groupBy({
        by: ["exerciseId"], // Agrupa pelo ID do exercício
        _count: {
          exerciseId: true, // Conta quantas vezes o exercício aparece em workouts
        },
        where: {
          exercise: {
            personalTrainerId: personalTrainer?.id, // Filtra apenas exercícios do personal trainer
          },
        },
        orderBy: {
          _count: {
            exerciseId: "desc", // Ordena do mais usado para o menos usado
          },
        },
        take: 5, // Pega os 5 mais frequentes
      });

      // Busca apenas os nomes dos exercícios
      const exercisesWithNames = await prisma.exercise.findMany({
        where: {
          id: {
            in: topExercises.map((e) => e.exerciseId), // Filtra pelos IDs dos top 5
          },
        },
        select: {
          id: true,
          name: true, // Seleciona apenas o nome
        },
      });

      // Combina os dados: nome do exercício + contagem
      const result = topExercises.map((exercise) => {
        const exerciseName =
          exercisesWithNames.find((e) => e.id === exercise.exerciseId)?.name ||
          "Unknown";
        return {
          name: exerciseName,
          count: exercise._count.exerciseId,
        };
      });

      return c.json({
        success: true,
        message: null,
        data: result,
      });
    } catch (error: any) {
      console.error(error);

      return c.json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  })
  .get("format", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        { success: false, message: "Usuário não autenticado", data: null },
        401
      );
    }

    try {
      const personalTrainer = await getPersonalTrainerById(auth.userId);

      const formatsCount = await prisma.student.groupBy({
        by: ["trainingFormat"],
        where: {
          personalTrainerId: personalTrainer?.id,
        },
        _count: {
          trainingFormat: true,
        },
      });

      const allFormats = Object.values(TrainingFormat);
      const result = allFormats.map((format, i) => {
        const found = formatsCount.find(
          (item) => item.trainingFormat === format
        );

        return {
          name: EnumTranslations.TrainingFormat[format],
          count: found?._count?.trainingFormat || 0,
          fill: `var(--chart-${i + 1})`,
        };
      });

      return c.json({
        success: true,
        message: null,
        data: result,
      });
    } catch (error: any) {
      console.error(error);

      return c.json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  })
  .get("workouts", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    const { goal, difficulty } = c.req.query();

    if (!auth?.userId) {
      return c.json(
        { success: false, message: "Usuário não autenticado", data: null },
        401
      );
    }

    try {
      const personalTrainer = await getPersonalTrainerById(auth.userId);

      const workouts = await prisma.workoutTemplate.findMany({
        where: {
          trainerId: personalTrainer?.id,
          isReusable: true,
          ...(goal && {
            defaultGoal: {
              has: goal as FitnessGoal,
            },
          }),
          ...(difficulty && {
            defaultLevel: difficulty as DifficultyLevel,
          }),
        },
        include: {
          assignedInstances: true,
          creator: {
            include: {
              user: true,
            },
          },
          days: {
            include: {
              exerciseInWorkout: true,
              exercises: true,
              template: true,
            },
          },
          session: true,
          student: true,
        },
      });

      return c.json({
        success: true,
        message: null,
        data: workouts,
      });
    } catch (error: any) {
      console.error(error);

      return c.json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  })
  .get("students/:param", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    const param = c.req.param("param");

    if (!auth?.userId) {
      return c.json(
        { success: false, message: "Usuário não autenticado", data: null },
        401
      );
    }

    try {
      const personalTrainer = await getPersonalTrainerById(auth.userId);

      if (!personalTrainer?.id) {
        return c.json({
          success: false,
          message: "Nenhum personal trainer encontrado!",
          data: null,
        });
      }

      const baseQuery = {
        where: { personalTrainerId: personalTrainer.id },
        include: { user: true },
      };

      const students =
        param === "user"
          ? await prisma.student.findMany({
              ...baseQuery,
              include: {
                workoutTemplate: true,
                ...baseQuery.include,
              },
            })
          : await prisma.student.findMany({
              ...baseQuery,
              include: {
                ...baseQuery.include,
                diet: true,
                AssignedWorkoutTemplate: true,
                exercise: true,
                goal: true,
                injuries: true,
                personalTrainer: true,
                progressPhoto: true,
                session: true,
                workoutTemplate: true,
              },
            });

      return c.json({
        success: true,
        message: null,
        data: students,
      });
    } catch (error: any) {
      console.error(error);

      return c.json(
        {
          success: false,
          message: "Houve um erro ao buscar seus estudantes!",
          data: null,
        },
        401
      );
    }
  })
  .get("student/:id", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    const id = c.req.param("id");

    if (!auth?.userId) {
      return c.json(
        { success: false, message: "Usuário não autenticado", data: null },
        401
      );
    }

    if (!id) {
      return c.json(
        { success: false, message: "Usuário não encontrado", data: null },
        401
      );
    }

    try {
      const student = await prisma.user.findFirst({
        where: {
          id: id,
        },
        include: {
          student: {
            include: {
              diet: true,
              injuries: true,
              goal: true,
              progressPhoto: true,
              workoutTemplate: {
                include: {
                  assignedInstances: {
                    include: {
                      template: true,
                    },
                  },
                  days: {
                    include: {
                      exercises: true,
                      exerciseInWorkout: true,
                    },
                  },
                },
              },
              session: true,
            },
          },
        },
      });

      return c.json({
        success: true,
        message: null,
        data: student,
      });
    } catch (error: any) {
      console.error(error);
      return c.json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  })
  .get("students-session", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        { success: false, message: "Usuário não autenticado", data: null },
        401
      );
    }

    try {
      const personalTrainer = await getPersonalTrainerById(auth.userId);

      const students = await prisma.student.findMany({
        where: {
          personalTrainerId: personalTrainer?.id,
          workoutTemplate: {
            some: {},
          },
          AssignedWorkoutTemplate: {
            some: {},
          },
        },
        select: {
          id: true,
          user: {
            select: {
              name: true,
            },
          },
          workoutTemplate: {
            select: {
              id: true,
            },
          },
          AssignedWorkoutTemplate: {
            select: {
              id: true,
            },
          },
        },
      });

      return c.json({
        success: true,
        message: null,
        data: students,
      });
    } catch (error: any) {
      console.error(error);
      return c.json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  })
  .post(
    "new-student",
    clerkMiddleware(),
    zValidator(
      "json",
      NewStudentSchema.pick({
        birthDate: true,
        email: true,
        injuries: true,
        name: true,
        phone: true,
        role: true,
        status: true,
        trainingFormat: true,
        password: true,
        gender: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const validated = c.req.valid("json");

      if (!auth?.userId) {
        return c.json(
          { success: false, message: "Usuário não autenticado" },
          401
        );
      }

      try {
        const client = await clerkClient();

        const [personalTrainer, clerkUser] = await Promise.all([
          getPersonalTrainerById(auth.userId),
          client.users.createUser({
            firstName: validated.name,
            lastName: "",
            emailAddress: [validated.email],
            password: validated.password,
          }),
        ]);

        if (!personalTrainer) {
          throw new Error(`Personal trainer não encontrado`);
        }

        const newStudent = await prisma.$transaction([
          prisma.user.create({
            data: {
              id: clerkUser.id,
              email: validated.email,
              name: validated.name,
              phone: validated.phone,
              role: "STUDENT",
              avatarUrl: clerkUser.imageUrl,
            },
          }),
          prisma.student.create({
            data: {
              personalTrainerId: personalTrainer.id,
              userId: clerkUser.id,
              status: validated.status || "ACTIVE",
              trainingFormat: validated.trainingFormat,
              createdAt: new Date(),
              updatedAt: new Date(),
              gender: validated.gender,
              birthDate: validated.birthDate
                ? new Date(validated.birthDate)
                : null,
              ...(validated.injuries &&
                Array.isArray(validated.injuries) && {
                  injuries: {
                    create: validated.injuries.map((injury) => ({
                      description: injury,
                      dateOccurred: null,
                      recovered: false,
                    })),
                  },
                }),
            },
          }),
        ]);

        return c.json({
          success: true,
          message: "Estudante criado com sucesso",
          data: newStudent,
        });
      } catch (err: any) {
        console.error("Erro na criação do estudante:", err);

        let errorMessage = "Houve um erro ao processar sua requisição";

        if (isClerkAPIResponseError(err)) {
          errorMessage = err.errors?.[0]?.message || errorMessage;
          if (err.errors?.[0]?.code === "form_password_pwned") {
            errorMessage = "Senha comprometida: escolha uma senha mais segura";
          }
        } else if (err.message.includes("Unique constraint")) {
          errorMessage = "Email já está em uso";
        }

        return c.json({ success: false, message: errorMessage }, 400);
      }
    }
  )
  .post(
    "workout",
    clerkMiddleware(),
    zValidator("json", z.any()),
    async (c) => {
      const auth = getAuth(c);
      const json = c.req.valid("json");

      if (!auth?.userId) {
        return c.json(
          { success: false, message: "Usuário não autenticado", data: null },
          401
        );
      }

      try {
        const personalTrainer = await getPersonalTrainerById(auth.userId);
        if (!personalTrainer) {
          throw new Error("Personal trainer não encontrado");
        }

        const baseData = {
          trainerId: personalTrainer.id,
          name: json.name,
          description: json.description,
          isReusable: json.isReusable,
          isPublic: json.isPublic,
          defaultGoal: json.config.goals,
          defaultLevel: json.config.level,
          defaultTags: json.config.tags,
        };

        const nonReusableData = !json.isReusable
          ? {
              studentId: json.assigned.studentId,
              assignedInstances: {
                create: {
                  trainerId: personalTrainer.id,
                  studentId: json.assigned.studentId,
                  startDate: json.assigned.startDate,
                  endDate: json.assigned.endDate,
                  isActive: json.assigned.isActive,
                  notes: json.assigned.notes || "",
                  customGoal: json.config.goals,
                  customLevel: json.config.level,
                  customTags: json.config.tags || [],
                },
              },
            }
          : {};

        const workout = await prisma.workoutTemplate.create({
          data: {
            ...baseData,
            ...nonReusableData,
            days: {
              create: json.days.map((day: any) => ({
                name: day.name,
                dayOfWeek: day.dayOfWeek,
                focusMuscle: day.focusMuscle,
                order: 0,
                exercises: {
                  create: day.exercises.map((ex: any) => ({
                    name: ex.exerciseId,
                    equipment: ex.equipment || "",
                    difficulty: ex.difficulty || "",
                    instructions: ex.instructions || "",
                    muscle: ex.muscle || "",
                    type: ex.type || "",
                    personalTrainerId: personalTrainer.id,
                    studentId: !json.isReusable
                      ? json.assigned?.studentId
                      : undefined,
                  })),
                },
                exerciseInWorkout: {
                  create: day.exercises.map((ex: any) => ({
                    exercise: {
                      connect: {
                        name_personalTrainerId: {
                          name: ex.exerciseId,
                          personalTrainerId: personalTrainer.id,
                        },
                      },
                    },
                    order: ex.order || 0,
                    sets: ex.sets,
                    reps: ex.reps,
                    rest: ex.rest,
                  })),
                },
              })),
            },
          },
          include: {
            days: {
              include: {
                exercises: true,
                exerciseInWorkout: {
                  include: {
                    exercise: true,
                  },
                },
              },
            },
            assignedInstances: true,
          },
        });

        return c.json({
          success: true,
          message: "Treino criado com sucesso",
          data: workout,
        });
      } catch (error: any) {
        console.error("Erro ao criar template:", error);
        return c.json(
          {
            success: false,
            message: error.message || "Erro ao criar template de treino",
            data: null,
          },
          500
        );
      }
    }
  )
  .delete(
    "delete-student/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!auth?.userId) {
        return c.json(
          { success: false, message: "Usuário não autenticado" },
          401
        );
      }

      if (!id) {
        return c.json({ success: false, message: "Id não encontrado" }, 400);
      }

      try {
        const client = await clerkClient();

        await prisma.user.delete({
          where: {
            id: id,
          },
        });

        await client.users.deleteUser(id);

        return c.json({
          success: true,
          message: "Estudante deletado com sucesso",
        });
      } catch (error: any) {
        console.log(error);

        return c.json({
          success: false,
          message: "Houve um erro ao deletar estudante, tente novamente!",
        });
      }
    }
  )
  .delete(
    "delete-workout/:id",
    clerkMiddleware(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!auth?.userId) {
        return c.json(
          { success: false, message: "Usuário não autenticado" },
          401
        );
      }

      if (!id) {
        return c.json({ success: false, message: "Id não encontrado" }, 400);
      }

      try {
        await prisma.workoutTemplate.delete({
          where: {
            id: id,
          },
        });

        return c.json({
          success: true,
          message: "Template deletado com sucesso",
        });
      } catch (error: any) {
        console.log(error);

        return c.json({
          success: false,
          message: "Houve um erro ao deletar Template, tente novamente!",
        });
      }
    }
  );

export default app;
