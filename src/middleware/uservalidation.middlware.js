import { UserValidation } from "@/validations";

export const validateCreateUser = (req, res, next) => {

    const { error } = UserValidation.userRegistrationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
export const validateLogin = (req, res, next) => {

    const { error } = UserValidation.userLoginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details });
    }
    next();
} 