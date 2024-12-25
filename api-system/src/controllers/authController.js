import authServices from "../services/authServices.js";

export async function signIn(req, res) {
    const { email, password } = req.body;
    const token = await authServices.signIn(email, password);
    res.send(token);
}