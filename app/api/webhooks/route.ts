import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: evt.data.email_addresses[0].email_address,
        },
      });

      if (existingUser) {
        return new Response("Email já está em uso", { status: 400 });
      }

      await prisma.$transaction(async (tx) => {
        const client = await clerkClient();

        const user = await tx.user.create({
          data: {
            id: id,
            email: evt.data.email_addresses[0].email_address,
            name:
              evt.data.first_name ||
              evt.data.username ||
              (evt.data.last_name as string),
            avatarUrl: evt.data.image_url,
            role: "PERSONAL_TRAINER",
          },
        });

        const personalTrainer = await tx.personalTrainer.create({
          data: {
            userId: user.id,
          },
        });

        await client.users.updateUserMetadata(id as string, {
          publicMetadata: {
            role: "PERSONAL_TRAINER",
          },
          privateMetadata: {
            personalTrainerId: personalTrainer.id,
          },
        });
      });

      return new Response("Usuário criado com sucesso", { status: 200 });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return new Response("Erro ao criar usuário", { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
      return new Response("Usuário deletado com sucesso", { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return new Response("Usuário não encontrado (já deletado?)", {
            status: 200,
          });
        }
      }

      console.error("Erro ao deletar usuário:", error);
      return new Response("Erro ao deletar usuário", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
