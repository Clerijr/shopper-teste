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
    constructor(description: string){
        super(description)
        this.name = "INVALID_DATA"    
    }
}