import { getPersonalTrainerById } from "@/actions/personal";
import prisma from "@/lib/db";
import { EnumTranslations } from "@/lib/enum-tranlations";
import { calculateDuration } from "@/lib/utils";
import { FullSessionSchema, NewStudentSchema } from "@/lib/validations";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { clerkClient } from "@clerk/nextjs/server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import {
  DayOfWeek,
  DifficultyLevel,
  FitnessGoal,
  LocationType,
  Prisma,
  RecurrencePattern,
  ScheduleType,
  TrainingFormat,
} from "@prisma/client";
import { Hono } from "hono";
import { z } from "zod";

import { HTTPException } from "hono/http-exception";
import { ExerciseInput, WorkoutDayInput } from "@/lib/types";

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
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json(
          {
            success: false,
            message: "Erro no banco de dados",
            data: null,
          },
          500
        );
      }

      if (error instanceof Error) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      return c.json(
        {
          success: false,
          message: "Erro desconhecido",
          data: null,
        },
        500
      );
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
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json(
          {
            success: false,
            message: "Erro no banco de dados",
            data: null,
          },
          500
        );
      }

      if (error instanceof Error) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      return c.json(
        {
          success: false,
          message: "Erro desconhecido",
          data: null,
        },
        500
      );
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
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json(
          {
            success: false,
            message: "Erro no banco de dados",
            data: null,
          },
          500
        );
      }

      if (error instanceof Error) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      return c.json(
        {
          success: false,
          message: "Erro desconhecido",
          data: null,
        },
        500
      );
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

      const studentsWithDuration = students.map((student) => ({
        name: student.user.name,
        durationAsStudent: calculateDuration(student.createdAt),
      }));

      return c.json({
        success: true,
        message: null,
        data: studentsWithDuration,
      });
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json(
          {
            success: false,
            message: "Erro no banco de dados",
            data: null,
          },
          500
        );
      }

      if (error instanceof Error) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      return c.json(
        {
          success: false,
          message: "Erro desconhecido",
          data: null,
        },
        500
      );
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
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json({
          success: false,
          message: error.message,
          data: null,
        });
      }

      if (error instanceof HTTPException) {
        return c.json({
          success: false,
          message: error.message,
          data: null,
        });
      }

      if (error instanceof Error) {
        return c.json({
          success: false,
          message: error.message,
          data: null,
        });
      }

      return c.json({
        success: false,
        message: "Houve um erro",
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
        by: ["exerciseId"],
        _count: {
          exerciseId: true,
        },
        where: {
          exercise: {
            personalTrainerId: personalTrainer?.id,
          },
        },
        orderBy: {
          _count: {
            exerciseId: "desc",
          },
        },
        take: 5,
      });

      const exercisesWithNames = await prisma.exercise.findMany({
        where: {
          id: {
            in: topExercises.map((e) => e.exerciseId),
          },
        },
        select: {
          id: true,
          name: true,
        },
      });

      const result = topExercises.map((exercise, index) => {
        const exerciseName =
          exercisesWithNames.find((e) => e.id === exercise.exerciseId)?.name ||
          "Unknown";
        return {
          name: exerciseName,
          count: exercise._count.exerciseId,
          fill: `var(--chart-${index + 1})`,
        };
      });

      return c.json({
        success: true,
        message: null,
        data: result,
      });
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json(
          {
            success: false,
            message: "Erro no banco de dados",
            data: null,
          },
          500
        );
      }

      if (error instanceof HTTPException) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      if (error instanceof Error) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      return c.json(
        {
          success: false,
          message: "Erro desconhecido",
          data: null,
        },
        500
      );
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
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json(
          {
            success: false,
            message: "Erro no banco de dados",
            data: null,
          },
          500
        );
      }

      if (error instanceof Error) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      return c.json(
        {
          success: false,
          message: "Erro desconhecido",
          data: null,
        },
        500
      );
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
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json(
          {
            success: false,
            message: "Erro no banco de dados",
            data: null,
          },
          500
        );
      }

      if (error instanceof Error) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      return c.json(
        {
          success: false,
          message: "Erro desconhecido",
          data: null,
        },
        500
      );
    }
  })
  .get("sessions", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    const { repeat, daysOfWeek, scheduleType } = c.req.query();

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
          message: "Personal trainer não encontrado",
          data: null,
        });
      }

      const session = await prisma.session.findMany({
        where: {
          trainerId: personalTrainer.id,
          ...(repeat && {
            recurrence: {
              repeat: {
                equals: repeat as RecurrencePattern,
              },
            },
          }),
          ...(daysOfWeek && {
            recurrence: {
              daysOfWeek: {
                has: daysOfWeek as DayOfWeek,
              },
            },
          }),
          ...(scheduleType && {
            recurrence: {
              scheduleType: {
                equals: scheduleType as ScheduleType,
              },
            },
          }),
        },
        include: {
          workoutTemplate: true,
          recurrence: true,
          student: {
            include: {
              user: true,
            },
          },
        },
      });

      return c.json({
        success: true,
        message: null,
        data: session,
      });
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json(
          {
            success: false,
            message: "Erro no banco de dados",
            data: null,
          },
          500
        );
      }

      if (error instanceof Error) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      return c.json(
        {
          success: false,
          message: "Erro desconhecido",
          data: null,
        },
        500
      );
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
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json(
          {
            success: false,
            message: "Erro no banco de dados",
            data: null,
          },
          500
        );
      }

      if (error instanceof Error) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      return c.json(
        {
          success: false,
          message: "Erro desconhecido",
          data: null,
        },
        500
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
      const data = await prisma.user.findUnique({
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
              AssignedWorkoutTemplate: {
                select: {
                  templateId: true,
                },
              },
              session: true,
            },
          },
        },
      });

      const templateIds = data?.student?.AssignedWorkoutTemplate.map(
        (assignment) => assignment.templateId
      );

      const workoutTemplates = await prisma.workoutTemplate.findMany({
        where: {
          id: { in: templateIds },
        },
        include: {
          days: {
            include: {
              template: true,
              exercises: true,
              exerciseInWorkout: true,
            },
          },
        },
      });

      const response = {
        ...data,
        workoutTemplates: workoutTemplates.map((template) => ({
          ...template,
        })),
      };

      return c.json({
        success: true,
        message: null,
        data: response,
      });
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json(
          {
            success: false,
            message: "Erro no banco de dados",
            data: null,
          },
          500
        );
      }

      if (error instanceof Error) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      return c.json(
        {
          success: false,
          message: "Erro desconhecido",
          data: null,
        },
        500
      );
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
          session: {
            none: {},
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
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return c.json(
          {
            success: false,
            message: "Erro no banco de dados",
            data: null,
          },
          500
        );
      }

      if (error instanceof Error) {
        return c.json(
          {
            success: false,
            message: error.message,
            data: null,
          },
          500
        );
      }

      return c.json(
        {
          success: false,
          message: "Erro desconhecido",
          data: null,
        },
        500
      );
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

        const personalTrainer = await prisma.personalTrainer.findFirst({
          where: {
            userId: auth.userId,
          },
        });

        if (!personalTrainer) {
          throw new Error("Personal nao encontrado");
        }

        const [clerkUser] = await Promise.all([
          client.users.createUser({
            firstName: validated.name,
            lastName: "",
            emailAddress: [validated.email],
            password: validated.password,
            publicMetadata: {
              byPersonal: true,
            },
          }),
        ]);

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
      } catch (error: unknown) {
        console.error("Erro na criação do estudante:", error);

        let errorMessage = "Houve um erro ao processar sua requisição";

        // Verificação tipo-safe do erro
        if (isClerkAPIResponseError(error)) {
          errorMessage = error.errors?.[0]?.message || errorMessage;
          if (error.errors?.[0]?.code === "form_password_pwned") {
            errorMessage = "Senha comprometida: escolha uma senha mais segura";
          }
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            errorMessage = "Email já está em uso";
          }
        } else if (error instanceof Error) {
          if (error.message.includes("Unique constraint")) {
            errorMessage = "Email já está em uso";
          } else {
            errorMessage = error.message;
          }
        }

        return c.json({ success: false, message: errorMessage });
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
              create: json.days.map((day: WorkoutDayInput) => ({
                name: day.name,
                dayOfWeek: day.dayOfWeek,
                focusMuscle: day.focusMuscle,
                order: 0,
                exercises: {
                  create: day.exercises.map((ex: ExerciseInput) => ({
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
                  create: day.exercises.map((ex: ExerciseInput) => ({
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
      } catch (error: unknown) {
        console.error("Erro ao criar template:", error);

        let errorMessage = "Erro ao criar template de treino";

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            errorMessage = "Já existe um treino com este nome";
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        return c.json({
          success: false,
          message: errorMessage,
          data: null,
        });
      }
    }
  )
  .post(
    "assign-workout",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        templateId: z.string(),
        studentId: z.string(),
      })
    ),
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

        const template = await prisma.workoutTemplate.findUnique({
          where: {
            id: json.templateId,
            trainerId: personalTrainer.id,
          },
          include: {
            days: {
              include: {
                exerciseInWorkout: {
                  include: {
                    exercise: true,
                  },
                },
              },
            },
          },
        });

        if (!template) {
          throw new Error(
            "Template não encontrado ou não pertence ao personal"
          );
        }

        const workoutInstance = await prisma.assignedWorkoutTemplate.create({
          data: {
            templateId: json.templateId,
            startDate: new Date(),
            studentId: json.studentId,
            trainerId: personalTrainer.id,
          },
        });

        return c.json({
          success: true,
          message: null,
          data: workoutInstance,
        });
      } catch (error: unknown) {
        console.error("Erro ao atribuir treino:", error);

        let errorMessage = "Erro ao atribuir treino";

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          switch (error.code) {
            case "P2002":
              errorMessage = "Treino já atribuído a este aluno";
              break;
            case "P2025":
              errorMessage = "Template ou aluno não encontrado";
              break;
            default:
              errorMessage = `Erro no banco de dados: ${error.code}`;
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        return c.json({
          success: false,
          message: errorMessage,
          data: null,
        });
      }
    }
  )
  .post(
    "session",
    clerkMiddleware(),
    zValidator(
      "json",
      FullSessionSchema.pick({
        session: true,
        recurrence: true,
      })
    ),
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
          return c.json({
            success: false,
            message: "Personal trainer não encontrado",
            data: null,
          });
        }

        const result = await prisma.$transaction(async (prisma) => {
          // 1. Criar a sessão base
          const session = await prisma.session.create({
            data: {
              trainerId: personalTrainer.id,
              studentId: json.session.studentId,
              workoutTemplateId: json.session.workoutTemplateId,
              assignedWorkoutTemplateId: json.session.assignedWorkoutTemplateId,
              status: json.session.status,
              priority: json.session.priority,
              observations: json.session.observations,
              locationType: json.session.locationType,
              street:
                json.session.locationType === LocationType.ONLINE
                  ? null
                  : json.session.street,
              number:
                json.session.locationType === LocationType.ONLINE
                  ? null
                  : json.session.number,
              neighborhood:
                json.session.locationType === LocationType.ONLINE
                  ? null
                  : json.session.neighborhood,
              city:
                json.session.locationType === LocationType.ONLINE
                  ? null
                  : json.session.city,
              postalCode:
                json.session.locationType === LocationType.ONLINE
                  ? null
                  : json.session.postalCode,
            },
          });

          const recurrenceData = {
            startDate: json.recurrence.startDate,
            durationMinutes: json.recurrence.durationMinutes,
            endDate: json.recurrence.endDate,
            repeat: json.recurrence.repeat,
            sessionId: session.id,
            hours: "hours" in json.recurrence ? json.recurrence.hours : null,
            scheduleType:
              "scheduleType" in json.recurrence
                ? json.recurrence.scheduleType
                : null,
            occurrenceCount:
              "occurrenceCount" in json.recurrence
                ? json.recurrence.occurrenceCount
                : null,
            daysOfWeek:
              json.recurrence.repeat === RecurrencePattern.WEEKLY
                ? json.recurrence.daysOfWeek
                : [],
            dayOfMonth:
              json.recurrence.repeat === RecurrencePattern.MONTHLY
                ? json.recurrence.dayOfMonth
                : null,
          };

          const recurrence = await prisma.recurrence.create({
            data: recurrenceData,
          });

          return { session, recurrence };
        });

        return c.json({
          success: true,
          message: "Seçao criada com sucesso",
          data: result,
        });
      } catch (error: unknown) {
        console.error("Erro ao criar sessão:", error);

        let errorMessage = "Erro ao agendar sessão";

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          switch (error.code) {
            case "P2002":
              errorMessage = "Conflito de agendamento: horário já ocupado";
              break;
            case "P2003":
              errorMessage = "Aluno ou template de treino não encontrado";
              break;
            case "P2025":
              errorMessage = "Registro relacionado não encontrado";
              break;
            default:
              errorMessage = `Erro no banco de dados: ${error.message}`;
          }
        } else if (error instanceof z.ZodError) {
          return c.json({
            success: false,
            message:
              "Dados inválidos: " +
              error.errors.map((e) => e.message).join(", "),
            data: null,
          });
        }

        return c.json({
          success: false,
          message: errorMessage,
          data: null,
        });
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          // Erros do Prisma
          if ("code" in error && error.code === "P2025") {
            return c.json(
              { success: false, message: "Estudante não encontrado" },
              404
            );
          }

          // Erros do Clerk
          if (error.message.includes("Clerk error")) {
            return c.json(
              { success: false, message: "Erro ao deletar usuário no Clerk" },
              500
            );
          }
        }

        // Erro genérico (não identificado)
        return c.json(
          {
            success: false,
            message: "Houve um erro ao deletar estudante, tente novamente!",
          },
          500
        );
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          // Erros do Prisma
          if ("code" in error && error.code === "P2025") {
            return c.json(
              { success: false, message: "Treino não encontrado" },
              404
            );
          }
        }

        // Erro genérico (não identificado)
        return c.json(
          {
            success: false,
            message: "Houve um erro ao deletar treino, tente novamente!",
          },
          500
        );
      }
    }
  )
  .delete(
    "delete-session/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
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
        const session = await prisma.session.delete({
          where: {
            id: id,
          },
        });

        return c.json({
          success: true,
          message: null,
          data: session,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          // Erros do Prisma
          if ("code" in error && error.code === "P2025") {
            return c.json(
              { success: false, message: "Secao não encontrado" },
              404
            );
          }
        }

        // Erro genérico (não identificado)
        return c.json(
          {
            success: false,
            message: "Houve um erro ao deletar secao, tente novamente!",
          },
          500
        );
      }
    }
  );

export default app;
