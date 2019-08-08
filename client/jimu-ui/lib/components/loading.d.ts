/// <reference types="react" />
import { React } from 'jimu-core';
interface Props {
    className: string;
}
export declare class _Loading extends React.PureComponent<Props> {
    static count: number;
    id: string;
    constructor(props: any);
    render(): JSX.Element;
}
export declare const Loading: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
