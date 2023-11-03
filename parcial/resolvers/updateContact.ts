import { Request, Response } from "npm:express@4.18.2";
import contactoModel from "../db/contact.ts";

const updateContact = async (req: Request, res: Response) => {
  try {
    const { DNI } = req.params;
    const { nombre, eMail, codigo_postal, codigo_ISO } = req.body;
    if (!nombre || !eMail || !codigo_postal || !codigo_ISO ) {
      res.status(400).send(" Error ");
      return;
    }

    const updatedContact = await contactoModel.findOneAndUpdate(
      { DNI },
      { nombre, eMail, codigo_postal, codigo_ISO },
      { new: true }
    ).exec();

    if (!updatedContact) {
      res.status(404).send("Contact not found");
      return;
    }

    res.status(200).send({
            DNI: updatedContact.DNI,
            nombre: updatedContact.nombre,
            eMail: updatedContact.eMail,
            codigo_postal: updatedContact.codigo_postal,
            codigo_ISO: updatedContact.codigo_ISO,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateContact;