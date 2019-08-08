/// <reference types="react" />
import { React } from 'jimu-core';
import PopperJS from 'popper.js';
import { Placement, Modifiers, PopperOptions } from 'popper.js';
import { DragData } from '../draggable';
import { VirtualReference } from './virtual-reference';
export declare type TargetType = string | HTMLElement | VirtualReference | Function | React.RefObject<any>;
export interface PopperProps {
    /**
     * This is the DOM element, or a function that returns the DOM element,
     * that may be used to set the position of the popover.
     * The return value will passed as the reference object of the Popper
     * instance.
     */
    reference: TargetType;
    /**
     * Popper render function or node.
     */
    children: React.ReactNode;
    /**
     * A node, component instance, or function that returns either.
     * The `container` will passed to the Modal component.
     * By default, it uses the body of the reference's top-level document object,
     * so it's simply `document.body` most of the time.
     */
    container: TargetType;
    /**
     * Always keep the children in the DOM.
     */
    keepMounted: boolean;
    /**
     * The offset modifier can shift your popper on both its axis.
     * To learn how to use offset, [modifiers.offset documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers..offset).
     */
    offset?: number[];
    /**
     * Clicking on the node of toggleClass will not trigger the toggle function
     */
    toggleClass?: string;
    /**
     * When you click on an area outside popper(and toggleClass node), this function is triggered
     */
    toggle?: (evt?: React.MouseEvent<any> | React.TouchEvent<any>) => any;
    /**
     * A modifier is a function that is called each time Popper.js needs to
     * compute the position of the popper.
     * For this reason, modifiers should be very performant to avoid bottlenecks.
     * To learn how to create a modifier, [read the modifiers documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object).
     */
    modifiers: Modifiers;
    /**
     * If `true`, the popper is visible.
     */
    open: boolean;
    /**
     * Popper placement.
     */
    placement: Placement;
    /**
     * Options provided to the [`popper.js`](https://github.com/FezVrasta/popper.js) instance.
     */
    popperOptions: PopperOptions;
    /**
     *  When this value changes, call scheduleUpdate to recalculate the position
     */
    generation?: number;
    /**
     * Header will be rendered in front of `children`, which Will be set as `draggable handle` if `draggable` is set as `true`.
     */
    header?: React.ReactNode;
    /**
     * Note that only with the header set can be dragged.
     */
    draggable?: boolean;
    zIndex?: number;
    className?: string;
}
interface State {
    left?: number;
    top?: number;
    registered?: boolean;
}
/**
 * Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
export declare class _Popper extends React.Component<PopperProps, State> {
    static defaultProps: Partial<PopperProps>;
    popper: any;
    scheduleUpdate: () => void;
    registered: any;
    domNode: HTMLDivElement;
    constructor(props: any);
    componentDidMount(): void;
    addTargetEvents(): void;
    handleDocumentClick: (evt: React.MouseEvent<any, MouseEvent>) => void;
    _isOut: (target: any, node: any) => boolean;
    componentDidUpdate(prevProps: any): void;
    scheduleUpdatePopper: () => void;
    removeTargetEvents(): void;
    componentWillUnmount(): void;
    baseModifiers: () => {
        offset: {
            offset: string;
        };
        preventOverflow: {
            enabled: boolean;
            boundariesElement: HTMLElement;
        };
    };
    handleOpen: () => void;
    onCreate: (data: PopperJS.Data) => void;
    register: (data: PopperJS.Data) => void;
    handleClose: () => void;
    onDrag: (e: any, data: DragData) => void;
    render(): JSX.Element;
}
export declare const Popper: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
