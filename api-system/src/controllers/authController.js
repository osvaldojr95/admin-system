import authServices from "../services/authServices.js";

async function signIn(req, res) {
    const { email, password } = req.body;
    const token = await authServices.signIn(email, password);
    return res.send(token);
}

export default {
    signIn,
}