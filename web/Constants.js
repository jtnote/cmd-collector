// TODO: any better solution? note: const declaration outside class cause compiling error
// https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes

export default class Constants {
    static get DEFAULT_VIEW() {
        return 'login';
    }

    static get PAGE_SIZE() {
        return 10;
    }

    static get ERROR_AUTH_INVALID() {
        return 'invalid';
    }

    static get ERROR_AUTH_EXPIRED() {
        return 'expired';
    }
} 