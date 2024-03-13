import { TagService } from "@/services";



export const createTag = async (req, res) => {
	try {
		const newTag = await TagService.create(req.body);
		return res.status(201).json({
			message: 'success',
			data: newTag,
			status: 201,
			success: true,
		});
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};

export const getTagById = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await TagService.findById(id);
		if (result) {
			return res.status(200).json({
				message: 'success',
				data: result,
				status: 200,
				success: true,
			});
		}
		return res.status(409).json({
			message: 'Not found',
			data: null,
			status: 409,
			success: true,
		});
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

export const deleteTag = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await TagService.remove(id);

		return res.status(200).json({
			message: 'success',
			data: result,
			status: 200,
			success: true,
		});
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};
