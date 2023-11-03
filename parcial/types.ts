type contacto = {
    DNI: string;
    nombre: string;
    eMail: string;
    codigo_postal: string;
    codigo_ISO: string;
}

export type Location = {
    country: string;
    city: string;
    zipcode: string;
  };
  
  export type Weather = {
    location: Location;
    temperature: number;
    description: string;
  };
