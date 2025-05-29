import type { User } from "@prisma/client";
import { client } from "..";

export const createUser = async ({
  name,
  email,
  password,
  provider = "credentials",
}: {
  name: string;
  email: string;
  password?: string;
  provider?: string;
}) => {
  const newUser = await client.user.create({
    data: {
      name,
      email,
      password,
      provider,
    },
  });

  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const existingUser = await client.user.findUnique({
    where: { email },
  });

  return existingUser;
};

export const getUserById = async (id: string) => {
  const existingUser = await client.user.findUnique({
    where: { id },
  });

  return existingUser;
};

export const updateUserById = async (id: string, name: string) => {
  const updatedUser = await client.user.update({
    where: { id },
    data: { name },
  });

  return updatedUser;
};
