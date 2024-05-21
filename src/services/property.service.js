import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data, imgData) => {
	// console.log(data, imgData);
	// return;
	const {
		propertyName,
		description,
		capacity,
		price,
		checkInTime,
		checkOutTime,
		address,
		city,
		country,
		pincode,
		lat,
		lng,
		extraInfo,
		ownerId,
		propertyTags,
		Amenities,
	} = data;
	const propertyTagsArr = Array.isArray(propertyTags) ? propertyTags : [propertyTags];
	const amenitiesArr = Array.isArray(Amenities) ? Amenities : [Amenities];
	let a = amenitiesArr.map((amenity) => ({ amenityName: amenity }));
	let t = propertyTagsArr.map((tag, idx) => ({
		tagName: tag,
		id: idx.toString(),
	}));

	return await prisma.property.create({
		data: {
			propertyName,
			description,
			capacity,
			price,
			checkInTime,
			checkOutTime,
			address,
			city,
			country,
			pincode,
			lat,
			lng,
			extraInfo,
			ownerId,
			propertyImages: {
				create: [...imgData],
			},

			Amenities: {
				create: [...a],
			},
			propertyTags: {
				create: t.map((tag) => ({
					tag: {
						connectOrCreate: {
							where: { id: tag.id },
							create: { tagName: tag.tagName, id: tag.id },
						},
					},
				})),
			},
		},
		include: {
			propertyTags: true,
			Amenities: true,
			propertyImages: true,
		},
	});
};

export const findById = async (id) => {
	const propertyWithTags = await prisma.property.findUnique({
		where: { id },

		include: {
			reviews: true,
			propertyImages: true,
			owner: {
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
					phone: true,
					avatar: true,
				}
			},
			propertyImages: true,
			Amenities: {
				select: {
					amenityName: true,
				},
			},
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
	const amenitiesNames = propertyWithTags.Amenities.map((amenity) => amenity.amenityName);

	// Return the result with propertyTags as an array of tag names
	return {
		...propertyWithTags,
		propertyTags: propertyTagsWithNames,
		Amenities: amenitiesNames,
	};
};

// get all propertie
export const findMany = async (filters = {}) => {
	return await prisma.property.findMany({
		where: filters,
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

