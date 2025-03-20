export class HttpError extends Error {
    public readonly statusCode: number;
    public readonly tag?: string;
    public readonly payload?: unknown;

    constructor({
        statusCode,
        message,
        tag,
        payload
    }: {
        statusCode: number;
        message: string;
        tag?: string;
        payload?: unknown;
    }) {
        super(message);
        this.statusCode = statusCode;
        this.tag = tag;
        this.payload = payload;
    }
}
