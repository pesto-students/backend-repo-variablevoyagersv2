import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
    return await prisma.tag.create({ data });
};

export const update = async (id, data) => {
    return await prisma.tag.update({
        where: {
            id,
        },
        data,
    });
};

export const remove = async (id) => {
    return await prisma.tag.delete({
        where: {
            id,
        },
    });
};

export const findById = async (id) => {
    return await prisma.tag.findUnique({
        where: { id },
        include: {
            propertyTags: {
                select: {
                    property: {
                        select: {
                            propertyName: true
                        }
                    }
                }
            }
        }
    });
};