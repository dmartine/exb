/// <reference types="react" />
import { VirtualReference } from './virtual-reference';
import { Placement, Modifiers } from 'popper.js';
export declare type TargetType = string | HTMLElement | VirtualReference | Function | React.RefObject<any>;
/**
 * More info of popper-option-props, please refer to (https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#Popper).
 */
export interface PopperOptionProps {
    positionFixed?: boolean;
    className?: string;
    baseZIndex?: number;
    modifiers?: Modifiers;
    placement?: Placement;
    /**
     * //Means referenceElement of popper
     */
    reference: TargetType;
    /**
    * Container of createPortal
    */
    container?: TargetType;
    innerRef: (ref: HTMLElement | null) => void;
    /**
    * When this value changes, call scheduleUpdate to recalculate the position
    */
    generation?: number;
}
export declare type PopperProps = PopperOptionProps & {
    /**
     * If `true`, the popper is visible.
     */
    show: boolean;
    /**
     * Clicking on the node of toggleClass will not trigger the toggle function
     */
    toggleClass?: string;
    /**
     * When you click on an area outside popper(and toggleClass node), this function is triggered
     */
    toggle?: (evt?: React.MouseEvent<any> | React.TouchEvent<any>) => any;
    /**
     * [modifiers.offset documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers..offset).
     */
    offset?: number[];
    /**
    * Note that only with the header set can be dragged.
    */
    draggable?: boolean;
    /**
    * The header type is a react node, which will be rendered into `PopperHeader`.
    */
    header?: React.ReactNode;
    /**
    * For drag: When a popper child node (including create portal) is also a popper, enabling this parameter avoids triggering unnecessary drag and drop events
    */
    slefNesting?: boolean;
};
