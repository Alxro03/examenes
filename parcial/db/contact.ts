import mongoose from "npm:mongoose@7.6.3";
import { contacto } from "../types.ts";

const Schema = mongoose.Schema;

const contactoSchema = new Schema(
  {
    DNI: { type: String, required: true },
    nombre: { type: String, required: true },
    eMail: { type: String, required: true },
    codigo_postal: { type: String, required: true },
    codigo_ISO: { type: String, required: true },
  },
  { timestamps: true }
);

export type contactoModelType = mongoose.Document & Omit<contacto, "id">;

export default mongoose.model<contactoModelType>("contacto", contactoSchema);