export class Response<T> {
    constructor(
        public errCode: number = 0,
        public errMessage: string = '',
        public data: T = undefined as any
    ) {
    }

    isSuccess(): boolean {
        return this.errCode === 0;
    }
}

export class SocketData<T> {
    constructor(
        public eventCode: string = '',
        public from: string = '',
        public to: string = '',
        public data: T = undefined as any
    ) {
    }
}

