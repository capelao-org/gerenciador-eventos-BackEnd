export default class APIerror extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }

    static badRequest(msg) {
        return new APIerror(msg, 400);
    }

    static notFound(msg) {
        return new APIerror(msg, 404);
    }

    static internalServerError(msg) {
        return new APIerror(msg, 500);
    }

}