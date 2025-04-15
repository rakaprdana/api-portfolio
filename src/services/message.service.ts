import { IMessage } from "../interfaces/message";
import { Message } from "../models/message.model";

export class MessageService {
  static createMessage = async (data: IMessage) => {
    const newItem = new Message(data);
    return await newItem.save();
  };
  static getMessage = async () => {
    const items = await Message.find({ is_deleted: false }); //show data except is_deleted: true
    return items;
  };
  static getMessageById = async (id: string) => {
    const item = await Message.findById(id);
    return item;
  };
  static deletedMessage = async (id: string) => {
    const deleted = await Message.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );
    return deleted;
  };
}
