// TODO: any better solution? note: const declaration outside class cause compiling error
// https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes

export default class Constants {
    static get DEFAULT_VIEW() {
        return this.VIEW_LOGIN;
    }

    static get VIEW_REGISTER() {
        return 'register';
    }

    static get VIEW_LOGIN() {
        return 'login';
    }

    static get VIEW_EDIT() {
        return 'edit';
    }

    static get VIEW_LIST() {
        return 'list';
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