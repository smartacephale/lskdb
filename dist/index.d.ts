export declare class LSKDB {
    private prefix;
    private lockKey;
    constructor(prefix?: string, lockKey?: string);
    getAllKeys(): string[];
    getKeys(n?: number, remove?: boolean): string[];
    hasKey(key: string): boolean;
    removeKey(key: string | number): void;
    setKey(key: string | number): void;
    isLocked(): boolean;
    lock(value: boolean): void;
}

export { }
