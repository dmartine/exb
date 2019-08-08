/// <reference types="react" />
import { React } from 'jimu-core';
interface HubSignInModalProps {
    isOpen: boolean;
    toggle: () => void;
    title: string;
    className?: string;
    onSignIn: (provider?: string) => void;
}
export declare class HubSignInModal extends React.PureComponent<HubSignInModalProps, {
    collapseOpen: boolean;
}> {
    constructor(props: any);
    toggleCollapse(): void;
    onAgoClick(): void;
    onFacebookClick(): void;
    onGoogleClick(): void;
    render(): JSX.Element;
}
export {};
