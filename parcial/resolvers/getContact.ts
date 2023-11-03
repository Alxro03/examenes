import { Request, Response } from "npm:express@4.18.2";
import contactoModel from "../db/contact.ts";
import { getLocation } from "./getLocation.ts";
import { getWeather } from "./getweather.ts";

const getContact = async (req: Request, res: Response) => {
  try {
    const { DNI } = req.params;
    const contact = await contactoModel.findOne({ DNI }).exec();
    const location = await getLocation(contact.codigo_postal, contact.codigo_ISO);
    const weather = await  getWeather(location);
    
    if (!contact) {
      res.status(404).send("No contacts found");
      return;
    }
    
    res.status(200).send({
        
            DNI: contact.DNI,
            nombre: contact.nombre,
            eMail: contact.eMail,
            codigo_postal: contact.codigo_postal,
            weather
        });
      

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getContact;