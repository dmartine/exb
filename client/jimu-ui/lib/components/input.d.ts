/// <reference types="react" />
import { InputProps } from './reactstrap';
import { React } from 'jimu-core';
interface Props extends InputProps {
    onAcceptValue?: (value: string) => void;
    forwardedRef?: any;
}
interface State {
    value: string | string[] | number;
}
/**
 * This component will use state to manage value.
 * When we need to update something onBlur, it will be easy if use this component.
 */
export declare class _Input extends React.PureComponent<Props, State> {
    static displayName: string;
    constructor(props: Props);
    componentDidUpdate(prevProps: Props): void;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (evt: React.FocusEvent<HTMLInputElement>) => void;
    onKeyUp: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
export declare const Input: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
