export declare class KeyValueDB<T> {
    data: {
        [k: string]: T;
    };
    location?: string;
    syncTimer?: any;
    threshold?: number;
    constructor(location?: string, syncThreshold?: number);
    set(key: string, value: T): string;
    get(key: string): T;
    has(key: string): boolean;
    getAll(): [string, T][];
    private sync;
}
