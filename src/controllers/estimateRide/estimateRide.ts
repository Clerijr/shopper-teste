import { RouteService, Controller, HttpRequest, HttpResponse } from "../../protocols/index";
import { badRequest, serverError, ok } from "../helpers";
import { estimateRideResponse } from "../../protocols/types";
const fakeData = [
  {
    ID: 1,
    NOME: "Homer Simpson",
    DESCRIÇÃO:
      "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    CARRO: "Plymouth Valiant 1973 rosa e enferrujado",
    AVALIAÇÃO: "2/5",
    COMENTÁRIO:
      "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
    TAXA_KM: "R$ 2,50/km",
    KM_MÍNIMO: 1,
  },
  {
    ID: 2,
    NOME: "Dominic Toretto",
    DESCRIÇÃO:
      "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    CARRO: "Dodge Charger R/T 1970 modificado",
    AVALIAÇÃO: "4/5",
    COMENTÁRIO:
      "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
    TAXA_KM: "R$ 5,00/km",
    KM_MÍNIMO: 5,
  },
  {
    ID: 3,
    NOME: "James Bond",
    DESCRIÇÃO:
      "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    CARRO: "Aston Martin DB5 clássico",
    AVALIAÇÃO: "5/5",
    COMENTÁRIO:
      "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
    TAXA_KM: "R$ 10,00/km",
    KM_MÍNIMO: 10,
  },
];

export class RideController implements Controller {
  private readonly routeService: RouteService;

  constructor(routeService: RouteService) {
    this.routeService = routeService;
  }

  async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["origin", "destination", "customer_id"];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return new Promise((resolve) =>
            resolve(badRequest(`Missing Param: ${field}`))
          );
        }
      }
      const { origin, destination } = req.body;

      if (origin === destination) {
        return new Promise((resolve) =>
          resolve(badRequest("Origin can not be equal to Destination"))
        );
      }

      const payload = await this.routeService.getDriversByDistance(
        origin,
        destination
      );
      return ok(payload);
    } catch (error) {
      return serverError();
    }
  }
}
