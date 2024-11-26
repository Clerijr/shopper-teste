import { Repository, Driver } from "../../protocols";
import { Collection, Db } from "mongodb";

const fakeDrivers = [
  {
    id: 1,
    name: "Homer Simpson",
    description:
      "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
    review: {
      rating: 2,
      comment:
        "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
    },
    value: 2.5,
    minimum_distance: 1,
  },
  {
    id: 2,
    name: "Dominic Toretto",
    description:
      "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    vehicle: "Dodge Charger R/T 1970 modificado",
    review: {
      rating: 4,
      comment:
        "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
    },
    value: 5.0,
    minimum_distance: 5,
  },
  {
    id: 3,
    name: "James Bond",
    description:
      "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    vehicle: "Aston Martin DB5 clássico",
    review: {
      rating: 5,
      comment:
        "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
    },
    value: 10.0,
    minimum_distance: 10,
  },
];


export class DriverRepository implements Repository {
  private driverCollection: Collection<Driver>

  async initCollection(db: Db) {
    this.driverCollection = db.collection<Driver>("drivers");
  }

  async insert(payload: any): Promise<void> {
  }

  async getDriversByDistance(distance: number): Promise<Array<Driver>> {
    const ride_distance = distance / 1000;
    const driver_payload = fakeDrivers.reduce((arr, driver) => {
      if (ride_distance >= driver.minimum_distance) {
        arr.push({
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          review: driver.review,
          value: driver.value * ride_distance,
        });
      }
      return arr;
    }, []);

    driver_payload.sort((a, b) => a.value - b.value);

    return new Promise((resolve) => resolve(driver_payload));
  }
  async findDriverById(id: number): Promise<Driver> {
    return fakeDrivers.find(driver => driver.id === id)
  }
}
