export type SomeConstructor = {
    new (s?: string): any;
};

export type functionType = (...args: (string | object)[]) => string | object;
