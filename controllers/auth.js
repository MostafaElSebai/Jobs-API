import { StatusCodes } from "http-status-codes";
import userSchema from "../models/User.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

export const register = async (req, res) => {


    const user = await userSchema.create({ ...req.body })

    const token = user.createJWT();


    res.status(StatusCodes.CREATED).json({ user: { name: user.name, id: user._id }, token: `Bearer ${token}` })
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("please provide email and password");
    }

    const user = await userSchema.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError("Invalid credentials")
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Wrong password, Please provide a valid password");

    }

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({ user: { name: user.name, id: user._id }, token: `Bearer ${token}` });
}