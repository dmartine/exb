declare const Inline: any;
import { QuillLinkValue } from '../type';
declare class Link extends Inline {
    static SANITIZED_URL: any;
    statics: any;
    domNode: any;
    static blotName: string;
    static tagName: string;
    static PROTOCOL_WHITELIST: Array<string>;
    static create(value: QuillLinkValue | string): any;
    static formats(domNode: any): {
        id: any;
        href: any;
        target: any;
    };
    static sanitize(url: any): any;
    format(name: any, value: QuillLinkValue | string): any;
}
export default Link;
