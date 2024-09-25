class ResponseAPI<T> {
    constructor(private success: boolean, private errors: number[], private value: T) { }
}