import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data, imgData) => {
	return await prisma.property.create({
		data: {
			...data,
			propertyImages: {
				create: [...imgData],
			},
		},
	});
};

export const findById = async (id) => {
	const propertyWithTags = await prisma.property.findUnique({
		where: { id },
		include: {
			reviews: true,
			owner: {
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
					phone: true,
					avatar: true,
				},
			},
			propertyImages: true,
			propertyTags: {
				select: {
					tag: {
						select: {
							tagName: true,
						},
					},
				},
			},
		},
	});

	// Extract tag names from the result
	const propertyTagsWithNames = propertyWithTags.propertyTags.map((propertyTag) => propertyTag.tag.tagName);

	// Return the result with propertyTags as an array of tag names
	return {
		...propertyWithTags,
		propertyTags: propertyTagsWithNames,
	};
};

// get all propertie
export const findMany = async (id) => {
	return await prisma.property.findMany({
		include: {
			propertyImages: true,
		},
	});
};

export const findManyById = async (id) => {
	return await prisma.property.findMany({
		where: { ownerId: id },
		include: {
			propertyImages: true,
			propertyTags: {
				select: {
					tag: {
						select: {
							tagName: true,
						},
					},
				},
			},
		},
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
