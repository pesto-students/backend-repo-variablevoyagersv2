import { FileUploadService, PropertyService } from '@/services';

export const createProperty = async (req, res) => {
	const { captions, ...rest } = req.body;
	const imgArr = [];
	if (req.files) {
		const fileUploadPromises = req.files.map(async (imgFile, idx) => {
			const imgRes = await FileUploadService.fileUpload(imgFile, 'property');
			imgArr.push({ imgUrl: imgRes.url, caption: captions[idx] });
		});

		await Promise.all(fileUploadPromises);
	}

	try {
		const newProperty = await PropertyService.create(rest, imgArr);
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
export const getProperties = async (req, res) => {
	try {
		const result = await PropertyService.findMany();
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
export const getAllOwnerProperty = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await PropertyService.findManyById(id);
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
