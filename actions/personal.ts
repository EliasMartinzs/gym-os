"use server";

export const getPersonalTrainerById = async (userId: string) => {
  try {
    const personalTrainerId = await prisma.personalTrainer.findUnique({
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    return personalTrainerId;
  } catch (error: any) {}
};
