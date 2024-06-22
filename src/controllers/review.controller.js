import { ReviewService } from '@/services';

export const createReview = async (req, res) => {
  try {
    // const reviewAlreadyDoneByUser = await ReviewService.findByUserId(
    //   req.body.userId
    // );

    // if (reviewAlreadyDoneByUser) {
    //   return res.status(409).json({
    //     message: 'review already exists',
    //     status: 409,
    //     success: false,
    //   });
    // }

    const newReview = await ReviewService.create(req.body);
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

export const getReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ReviewService.findById(id);
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

export const updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    // const { userId, ...data } = req.body

    const existingReview = await ReviewService.findById(id);
    if (!existingReview) {
      throw new Error('No review with this ID');
    }

    // if (userId != existingReview.userId) {
    // 	throw new Error("You can only edit your own reviews");
    // }

    const result = await ReviewService.update(id, req.body);
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

export const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ReviewService.remove(id);

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
