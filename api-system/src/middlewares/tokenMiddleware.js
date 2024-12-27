import authServices from "../services/authServices.js";

export async function tokenValidadion(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();

  if (!token) {
    throw { text: "tokenNotFound", status: 401 };
  }

  await authServices.verifyToken(token);
  next();
}
