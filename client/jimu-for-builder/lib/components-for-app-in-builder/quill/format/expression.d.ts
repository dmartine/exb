declare const Embed: any;
interface Expression {
    expid: string;
    name: string;
}
declare class Expression extends Embed {
    static blotName: string;
    static tagName: string;
    domNode: any;
    static create(value?: Expression): any;
    static formats(domNode: any): {};
    static value(domNode: any): {
        expid: any;
        name: any;
    };
    format(name: any, value: any): void;
}
export default Expression;
