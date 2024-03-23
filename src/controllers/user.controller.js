import { FileUploadService, UserService } from '@/services';

export const findUserById = async (req, res) => {
	// console.log("findUserById");
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

export const getCurrentUser = async (req, res) => {
	// console.log("CU",req.user);
	const {isDeleted,iat,exp,...restdata} = req.user
	return res.status(200).json({
		message: 'success',
		data: restdata,
		status: 200,
		success: true,
	});
};

export const updateUser = async (req, res) => {
	try {
		// console.log("updateUser");
		const id = req.params.id;
		let dataToUpdate = req.body;

		// if (req.file) {
		// 	const imgRes = await FileUploadService.fileUpload(req.file, 'avatar');
		// 	if (imgRes) {
		// 		dataToUpdate.avatar = imgRes.url;
		// 	}
		// }

		const result = await UserService.update(id, dataToUpdate);
		delete result.password;
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
		// console.log("delete");
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
