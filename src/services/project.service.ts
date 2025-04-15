import { IProject } from "../interfaces/project";
import { Project } from "../models/project.model";

export class ProjectService {
  static createProject = async (data: IProject, imagePath: string[]) => {
    const newItem = new Project({ ...data, image: imagePath });
    return await newItem.save();
  };

  static getProject = async () => {
    const items = await Project.find();
    return items;
  };

  static updateProject = async (id: string, updatedData: Partial<IProject>) => {
    const updated = await Project.findByIdAndUpdate(id, updatedData, {
      new: true, //mengembalikan data yang telah diperbarui
    });
    return updated;
  };

  static deleteProject = async (id: string) => {
    const deleted = await Project.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );
    return deleted;
  };
}
