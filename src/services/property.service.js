import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
	return await prisma.property.create({ data });
};

export const findById = async (id) => {
	return await prisma.property.findUnique({
		where: { id },
		include:{
			reviews:true,
		}
	});
};

export const update = async (id, data) => {
	return await prisma.property.update({
		where: {
			id,
		},
		data,
	});
};
export const remove = async (id) => {
	return await prisma.property.delete({
		where: {
			id,
		},
	});
};
