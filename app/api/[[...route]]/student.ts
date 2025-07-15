import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Prisma } from "@prisma/client";
import { Hono } from "hono";
import prisma from "@/lib/db";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json(
      { success: false, message: "Usuário não autenticado", data: null },
      401
    );
  }

  try {
    const data = await prisma.user.findUnique({
      where: {
        id: auth.userId,
      },
      include: {
        student: {
          include: {
            workoutTemplate: {
              include: {
                days: {
                  include: {
                    exercises: true,
                    exerciseInWorkout: true,
                  },
                },
              },
            },
            diet: true,
            goal: true,
            injuries: true,
            personalTrainer: {
              select: {
                user: {
                  select: {
                    name: true,
                    phone: true,
                    email: true,
                    avatarUrl: true,
                  },
                },
              },
            },
            session: {
              include: {
                workoutTemplate: true,
                recurrence: true,
                student: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return c.json({
      success: true,
      message: null,
      data: data,
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return c.json(
        {
          success: false,
          message: error.message || "Erro no banco de dados",
          data: null,
        },
        500
      );
    }

    if (error instanceof Error) {
      return c.json(
        {
          success: false,
          message: error.message || "Erro no banco de dados",
          data: null,
        },
        500
      );
    }

    return c.json(
      {
        success: false,
        message: "Houve um erro interno, Tente novamente!",
        data: null,
      },
      500
    );
  }
});

export default app;
