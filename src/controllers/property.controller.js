import { PropertyService } from "@/services";

export const createProperty= async (req, res) => {
  try {
    console.log(req.body)
    const newProperty = await PropertyService.create(req.body);
    return res.status(201).json({
      message: "success",
      data: newProperty,
      status: 201,
      success: true
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};