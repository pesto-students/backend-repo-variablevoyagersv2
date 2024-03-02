import { FileUploadService, UserService } from '@/services';

export const findUserById = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await UserService.findById(id);
		return res.status(200).json({
			message: 'success',
			data: user,
			status: 200,
			success: true,
		});
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const id = req.params.id;
		let dataToUpdate = req.body;
		if (dataToUpdate.phone) {
			const existingPhone = await UserService.findByPhone(dataToUpdate.phone);
			if (existingPhone) {
				return res.status(409).json({
					message: 'Phone number already exists',
					status: 409,
					success: false,
				});
			}
		}
		if (req.file) {
			const imgRes = await FileUploadService.fileUpload(req.file, 'avatar');
			if (imgRes) {
				dataToUpdate.avatar = imgRes.url;
			}
		}

		const result = await UserService.update(id, dataToUpdate);

		return res.status(200).json({
			message: 'success',
			data: result,
			status: 200,
			success: true,
		});
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};
export const deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await UserService.remove(id);

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
