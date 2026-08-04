
import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const checkToken = async (req, res, next) => {
    const auth = req.headers.authorization

    if (!auth || !auth.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Please provide a user token")
    }

    const token = auth.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { userId: payload.userId, name: payload.name }
        next()

    } catch (error) {
        throw new UnauthenticatedError("Please provide a valid user token");

    }


}
export default checkToken