import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";



import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import addContact from "./resolvers/addContact.ts";
import getContact from "./resolvers/getContact.ts";
import updateContact from "./resolvers/updateContact.ts";
import deleteContact from "./resolvers/deleteContact.ts";
import { getLocation } from "./resolvers/getLocation.ts";



const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .post("/addContact", addContact)
  .get("/getContact/:DNI", getContact)
  .put("/updateContact/:DNI", updateContact)
  .delete("/deleteContact/:DNI", deleteContact)
  .get(
    "/location/:countrycode/:zipcode",
    async (req: Request, res: Response) => {
      try {
        const zipcode = req.params.zipcode;
        const countrycode = req.params.countrycode;
        if (isNaN(Number(zipcode))) {
          res.status(400).send("Zipcode must be a number");
          return;
        }

        if (countrycode.length !== 2) {
          res.status(400).send("Country code must be 2 characters");
          return;
        }

        const location = await getLocation(zipcode, countrycode);
        res.status(200).send(location);
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  ).get(
    "/weather/:countrycode/:zipcode",
    async (req: Request, res: Response) => {
      try {
        const zipcode = req.params.zipcode;
        const countrycode = req.params.countrycode;

        if (isNaN(Number(zipcode))) {
          res.status(400).send("Zipcode must be a number");
          return;
        }

        if (countrycode.length !== 2) {
          res.status(400).send("Country code must be 2 characters");
          return;
        }

        // call getlocation
        const location = await getLocation(zipcode, countrycode);
        // call getweather
        const weather = await getWeather(location);
        // return weather
        res.status(200).send({
          location: weather.location,
          temperature: weather.temperature,
          description: weather.description,
        });
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  );



app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
