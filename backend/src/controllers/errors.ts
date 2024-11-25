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