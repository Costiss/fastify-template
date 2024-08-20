export class HttpError extends Error {
    constructor(
        readonly statusCode: number,
        readonly message: string,
        readonly errorCode?: string,
        readonly payload?: unknown
    ) {
        super(message);
    }
}
