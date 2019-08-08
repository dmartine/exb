export interface VirtualReferenceOption {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    width?: number;
    height?: number;
}
export declare class VirtualReference {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
    declareClass: string;
    constructor(options: VirtualReferenceOption);
    getBoundingClientRect(): {
        top: number;
        left: number;
        bottom: number;
        right: number;
        width: number;
        height: number;
    };
    readonly clientWidth: number;
    readonly clientHeight: number;
}
