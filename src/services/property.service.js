import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data, imgData) => {
	let { propertyName, description, capacity, price, checkInTime, checkOutTime, address, city, country, pincode, lat, lng, extraInfo, ownerId } = data;
	const propertyTags = JSON.parse(data.propertyTags);
	let Amenities = [];
	if (data.Amenities) {
		Amenities = JSON.parse(data.Amenities);
	}

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
				create: [...Amenities],
			},
			propertyTags: {
				create: propertyTags.map((tag) => ({
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
				},
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

	const propertyTagsWithNames = propertyWithTags.propertyTags.map((propertyTag) => propertyTag.tag.tagName);
	const amenitiesNames = propertyWithTags.Amenities.map((amenity) => amenity.amenityName);

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

export const update = async (id, reqObj) => {
	const { allImages, parsedPropertyTags, parsedAmenities, lat, lan, ...rest } = reqObj;
	return await prisma.property.update({
		where: {
			id,
		},
		data: {
			...rest,

			propertyImages: {
				deleteMany: {},
				create: [...allImages],
			},

			Amenities: {
				deleteMany: {},
				create: [...parsedAmenities],
			},
			propertyTags: {
				deleteMany: {},
				create: parsedPropertyTags.map((tag) => ({
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

export const remove = async (id) => {
	return await prisma.property.update({
		where: {
			id,
		},
		data: { isDeleted: true },
	});
};
