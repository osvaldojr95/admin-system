import Joi from "joi";

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export async function authValidate(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw { status: 422 };
  }

  const auth = { email, password };
  const validation = authSchema.validate(auth, { abortEarly: false });
  if (validation.error) {
    throw { status: 422 };
  }

  next();
}
