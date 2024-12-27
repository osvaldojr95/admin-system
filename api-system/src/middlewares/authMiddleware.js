import { validateAuth } from "../utils/validate.js";

export async function authValidate(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        throw { status: 422 };
    }

    const auth = { email, password };

    const { isValid, errors } = validateAuth(auth);
    console.log(errors);
    if (!isValid) {
        throw { text: JSON.stringify(errors), status: 422 };
    }

    next();
}
