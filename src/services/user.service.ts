import { IProfile } from "../interfaces/user";
import { User } from "../models/user.model";

export class UserService {
  static getProfile = async (data: IProfile) => {
    const profile = await User.find(data);
    return profile;
  };
  static updateProfile = async (id: string, updatedData: Partial<IProfile>) => {
    const updated = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updated;
  };
}
