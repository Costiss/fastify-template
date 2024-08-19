export class HttpError extends Error {
    constructor(
        readonly code: number,
        readonly message: string,
        readonly payload?: unknown
    ) {
        super(message);
    }
}
