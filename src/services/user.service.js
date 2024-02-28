import { PrismaClient } from '@prisma/client';
import { config } from '@/config';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const create = async (user) => {
  return prisma.user.create({ data: user });
};

export const findById = (id) => {
  return prisma.user.findUnique({
   where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      properties: true,
      reviews:true
    }
  });
};

export const findByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findByPhone = (phone) => {
  return prisma.user.findUnique({ where: { phone } });
};

export const findByCredentials = async (email, password) => {
  const user = await findByEmail(email)
  if (!user) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return null;
  }

  return user;
};


export const hashPassword = async (password) => {
  const salt = await await bcrypt.genSalt(Number(config.SALT));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};