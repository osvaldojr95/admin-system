export function errorHandlerMiddleware(err, req, res, next) {
  console.log(err);
  return res.status(Number(err.status ?? 500)).send(err.text ?? "");
}
