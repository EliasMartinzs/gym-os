import { prisma } from "@/lib/db";
import { NewStudentSchema } from "@/lib/validations";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { clerkClient } from "@clerk/nextjs/server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get(
    "/analytics",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        dataType: z
          .enum(["all", "birthdays", "counts"])
          .optional()
          .default("all"),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { dataType } = c.req.valid("param");

      if (!auth?.userId) {
        return c.json(
          {
            success: false,
            data: null,
            message: "Usuário não autenticado",
          },
          401
        );
      }

      try {
        if (dataType === "birthdays") {
          const today = new Date();

          const users = await prisma.user.findMany({
            select: {
              name: true,
              avatarUrl: true,
              student: {
                select: {
                  birthDate: true,
                },
              },
            },
            where: {
              student: {
                birthDate: {
                  not: null,
                  equals: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  ),
                },
              },
            },
          });

          return c.json({
            success: true,
            message: null,
            data: users,
          });
        }

        if (dataType === "counts") {
          const counts = await prisma.user.groupBy({
            by: ["role"],
            _count: true,
          });

          return c.json({
            success: true,
            message: null,
            data: counts,
          });
        }

        const personalTrainer = await prisma.personalTrainer.findFirst({
          select: {
            id: true,
          },
          where: {
            userId: auth.userId,
          },
        });

        const users = await prisma.user.findMany({
          where: {
            personalTrainer: {
              id: personalTrainer?.id,
            },
          },
        });

        return c.json({
          success: true,
          message: null,
          data: users,
        });
      } catch (err: any) {
        console.error(err);
        return c.json({
          success: false,
          data: null,
          message: "Houve um erro ao buscar os dados",
        });
      }
    }
  )
  .post(
    "/new-student",
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
          prisma.personalTrainer.findUnique({
            where: { userId: auth.userId },
            select: { id: true },
          }),
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

        await prisma.$transaction([
          prisma.user.create({
            data: {
              id: clerkUser.id,
              email: validated.email,
              name: validated.name,
              phone: validated.phone,
              role: "STUDENT",
            },
          }),
          prisma.student.create({
            data: {
              personalTrainerId: personalTrainer.id,
              userId: clerkUser.id,
              status: validated.status || "ACTIVE",
              trainingFormat: validated.trainingFormat,
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
  );

export default app;
