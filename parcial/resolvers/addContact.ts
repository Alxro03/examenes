import { Request, Response } from "npm:express@4.18.2";
import contactoModel from "../db/contact.ts";

const addContact = async (req: Request, res: Response) => {
  try {
    const { DNI, nombre, eMail, codigo_postal, codigo_ISO } = req.body;
    
    if (!DNI || !nombre || !eMail || !codigo_postal || !codigo_ISO) {
      res.status(400).send("Data required!");
      return;
    }

    const alreadyExists = await contactoModel.findOne({ DNI }).exec();
    if (alreadyExists) {
      res.status(400).send("Contact already exists");
      return;
    }

    const newContact = new contactoModel({DNI, nombre, eMail, codigo_postal, codigo_ISO});
    await newContact.save();

    res.status(200).send({
    DNI: newContact.DNI,
    nombre: newContact.nombre,
    eMail: newContact.eMail,
    codigo_postal: newContact.codigo_postal,
    codigo_ISO: newContact.codigo_ISO,

    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addContact;