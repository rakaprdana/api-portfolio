import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/user";
import { User } from "../models/user.model";
import { generateToken } from "../utils/generateToken";

export class AuthService {
  static signUp = async (data: IUser) => {
    const { username, email, password } = data;

    const userIsExist = await User.findOne({ username });

    if (userIsExist) {
      return { error: "USER_EXIST", userIsExist };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return { error: "CREATED_FAILED" };
    }

    return {
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken(newUser.id),
    };
  };

  static signIn = async (data: IUser) => {
    const { username, password } = data;
    const user = await User.findOne({ username });
    if (!user || !user.password) return { error: "INVALID_SIGNIN" };

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) return { error: "INVALID_PASSWORD" };

    return {
      _id: user.id,
      username: user.username,
      token: generateToken(user.id),
    };
  };
}
