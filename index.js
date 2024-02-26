import { UserService } from '@/services';

export const findUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserService.findById(id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password, fullname, phone, role, avatar } = req.body;
    
    // Check if email already exists
    const existingEmailUser = await UserService.findByEmail(email);
    if (existingEmailUser) {
      return res.status(409).json({
        message: "Email already exists",
        status: 409,
        success: false
      });
    }

    // Check if phone already exists
    if (phone) {
      const existingPhoneUser = await UserService.findByPhone(phone);
      if (existingPhoneUser) {
        return res.status(409).json({
          message: "Phone already exists",
          status: 409,
          success: false
        });
      }
    }

    // Hash the password
    const hashedPassword = await UserService.hashPassword(password);

    // Create the user
    const user = await UserService.create({ email, password: hashedPassword, fullname, phone, role, avatar });

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};



////////////////////////////////////////


import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const create = async (user) => {
  return prisma.user.create({ data: user });
};

export const findById = (id) => {
  return prisma.user.findUnique({ where: { id } });
};

export const findByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findByPhone = (phone) => {
  return prisma.user.findUnique({ where: { phone } });
};

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
