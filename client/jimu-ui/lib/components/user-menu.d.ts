/// <reference types="react" />
import { React } from 'jimu-core';
import { IMUser } from 'jimu-core';
import { AuthenticationProvider } from '@esri/arcgis-rest-auth';
interface UserMenuProps {
    user?: IMUser;
    onSignIn: (provider?: AuthenticationProvider) => void;
    onSignOut: () => void;
    useHub?: boolean;
}
interface UserMenuState {
    dropdownOpen: boolean;
    modalOpen: boolean;
}
export declare class UserMenu extends React.PureComponent<UserMenuProps, UserMenuState> {
    constructor(props: any);
    toggleDropdown(): void;
    toggleModal(): void;
    onSignIn(): void;
    render(): JSX.Element;
}
export {};
