import { ICertificate } from "../interfaces/certificate";
import { Certificate } from "../models/certificate.model";

export class CertificateService {
  static createCertifacte = async (data: ICertificate) => {
    const newItem = new Certificate(data);
    return await newItem.save();
  };
  static getCertificate = async () => {
    const items = await Certificate.find();
    return items;
  };
  static updateCertificate = async (
    id: string,
    updatedData: Partial<ICertificate>
  ) => {
    const updated = await Certificate.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updated;
  };
  static deleteCertificate = async (id: string) => {
    const deleted = await Certificate.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );
    return deleted;
  };
}
