import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
	return await prisma.propertyTags.create({ data });
};