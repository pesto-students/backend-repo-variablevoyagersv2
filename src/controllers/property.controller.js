import { PropertyService } from '@/services';

export const createProperty = async (req, res) => {
	try {
		const newProperty = await PropertyService.create(req.body);
		return res.status(201).json({
			message: 'success',
			data: newProperty,
			status: 201,
			success: true,
		});
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};
export const getPropertyById = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await PropertyService.findById(id);
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
export const updateProperty = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await PropertyService.update(id, req.body);
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
export const deleteProperty = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await PropertyService.remove(id);

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
