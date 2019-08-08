/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { LayoutProps } from 'jimu-layouts/common';
export declare function withDrop<Props>(): (WrappedComponent: React.ComponentClass<LayoutProps, any>) => React.ComponentClass<LayoutProps & Props, any>;
