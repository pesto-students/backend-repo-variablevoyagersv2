import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
	return await prisma.review.create({ data });
};

export const findById = (id) => {
	return prisma.review.findUnique({
		where: { id },
	});
}

export const findByUserId = (userId) => {
    return prisma.review.findFirst({
        where: {
            userId: userId,
        },
    });
};

export const update = async (id, data) => {
	return await prisma.review.update({
		where: {
			id,
		},
		data,
	});
};

export const remove = async (id) => {

	return await prisma.review.delete({
		where: {
			id,
		},
	});
};