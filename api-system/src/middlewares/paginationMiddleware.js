import { validatePagination } from "../utils/validate.js";

export async function paginationValidadion(req, res, next) {
    const { page, pageSize, orderBy, order } = req.query;

    const pagination = {
        page: Number(page),
        pageSize: Number(pageSize),
        orderBy: {
            name: orderBy.toString(),
            direction: order.toString(),
        }
    };

    const { isValid, errors } = validatePagination(pagination);
    if (!isValid) {
        res.locals.body = {
            pagination: {
                page: 1,
                pageSize: 10,
                orderBy: {
                    name: "name",
                    direction: "asc",
                }
            }
        };
    } else {
        res.locals.body = { pagination };
    }

    next();
}
