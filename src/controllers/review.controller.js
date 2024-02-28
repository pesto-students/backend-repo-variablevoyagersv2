import { ReviewService } from "@/services";

export const createReview =async (req, res) => {
	try {
		const newReview =  await ReviewService.create(req.body);
		return res.status(201).json({
			message: 'success',
			data: newReview,
			status: 201,
			success: true,
		});
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};
