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