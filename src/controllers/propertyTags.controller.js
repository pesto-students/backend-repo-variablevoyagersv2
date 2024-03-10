import { PropertyTagsService } from "@/services";


export const createPropertyTags = async (req, res) => {
	try {
		const newPropertyTags = await PropertyTagsService.create(req.body);
		return res.status(201).json({
			message: 'success',
			data: newPropertyTags,
			status: 201,
			success: true,
		});
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};