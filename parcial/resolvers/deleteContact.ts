import { Request, Response } from "npm:express@4.18.2";
import contactoModel from "../db/contact.ts";

const deleteContact = async (req: Request, res: Response) => {
  try {
    const { DNI } = req.params;
    const contact = await contactoModel.findOneAndDelete({ DNI }).exec();
    if (!contact) {
      res.status(404).send("Contact not found");
      return;
    }
    res.status(200).send("Contact deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteContact;