export class MissingParamError extends Error {
    constructor(param: string) {
        super(`Missing param: ${param}`)
        this.name = "Missing Param"    
    }
}

export class OriginEqualToDestinationError extends Error {
    constructor() {
        super("Origin can't be equal to Destination")
        this.name = "Origin equal to Destination"    
    }
}

export class ServerError extends Error {
    constructor() {
        super("Internal Server Error")
        this.name = "Server Error"
    }
}

export class InvalidDataError extends Error {
    constructor(){
        super("Os dados fornecidos no corpo da requisição são inválidos")
        this.name = "INVALID_DATA"    
    }
}

export class DriverNotFoundError extends Error {
    constructor(){
        super("Motorista não encontrado")
        this.name = "DRIVER_NOT_FOUND"    
    }
}

export class InvalidDistanceError extends Error {
    constructor(){
        super("Quilometragem inválida para o motorista")
        this.name = "INVALID_DISTANCE"    
    }
}

export class InvalidAddressForGeocodingError extends Error {
    constructor(address: string){
        super(`Geocoding não retornou dados para o endereço: ${address}`)
        this.name = "COORDINATE_NOT_FOUND"    
    }
}

export class NoRoutesFoundError extends Error {
    constructor(){
        super("Não foi encontrada uma rota para as coordenadas informadas")
        this.name = "ROUTE_NOT_FOUND"
    }
}