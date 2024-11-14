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
