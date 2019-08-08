/// <reference types="react" />
import { React } from 'jimu-core';
import { DropdownMenuProps as BSDropdownMenuProps } from './reactstrap';
interface DropdownMenuProps extends BSDropdownMenuProps {
    appendTo?: HTMLElement;
    appendToBody?: boolean;
}
export declare class _DropdownMenu extends React.PureComponent<DropdownMenuProps> {
    render(): JSX.Element;
}
export declare const DropdownMenu: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
