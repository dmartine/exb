/// <reference types="react" />
import { React } from 'jimu-core';
import { PopperProps } from 'jimu-ui';
interface WithPopperProps {
    className?: string;
}
export declare const withPopper: (WrappedComponent: React.ComponentClass<{}, any>, popperParams?: WithPopperProps) => {
    new (props: Readonly<PopperProps>): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<PopperProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<PopperProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<PopperProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<PopperProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<PopperProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<PopperProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<PopperProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<PopperProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<PopperProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: PopperProps, context?: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<PopperProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<PopperProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<PopperProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<PopperProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<PopperProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<PopperProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<PopperProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<PopperProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<PopperProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: React.Context<any>;
};
export {};
