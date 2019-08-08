/// <reference types="react" />
import { DataRecord, DataRecordSet } from '../data-source/ds-base-types';
import { InjectedIntl } from 'react-intl';
export declare enum MessageType {
    StringSelectionChange = "STRING_SELECTION_CHANGE",
    ExtentChange = "EXTENT_CHANGE",
    DataRecordsSelectionChange = "DATA_RECORDS_SELECTION_CHANGE",
    SpatialDataRecordsSelectionChange = "SPATIAL_DATA_RECORDS_SELECTION_CHANGE",
    DataRecordSetCreate = "DATA_RECORD_SET_CREATE",
    SpatialDataRecordSetCreate = "SPATIAL_DATA_RECORD_SET_CREATE",
    DataRecordSetUpdate = "DATA_RECORD_SET_UPDATE",
    SpatialDataRecordSetUpdate = "SPATIAL_DATA_RECORD_SET_UPDATE",
    SelectDataRecord = "SELECT_DATA_RECORD"
}
export declare function getMessageTypeLabel(messageType: MessageType, intl: InjectedIntl): string;
export interface Message {
    type: MessageType;
    /**
     * The widget id that the message is from. No widget id means the message is from jimu.
     */
    widgetId?: string;
}
export declare class StringSelectionChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    str: string;
    constructor(widgetId: string, str: string);
}
export declare class DataRecordsSelectionChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    records: DataRecord[];
    constructor(widgetId: string, records: DataRecord[]);
}
export declare class SpatialDataRecordsSelectionChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    records: DataRecord[];
    constructor(widgetId: string, records: DataRecord[]);
}
export declare class ExtentChangeMessage implements Message {
    type: MessageType;
    widgetId: string;
    extent: __esri.Extent;
    private relatedWidgetIds?;
    constructor(widgetId: string, extent: __esri.Extent);
    setRelatedWidgetIds(widgetIds: string[]): void;
    getRelatedWidgetIds(): string[];
    addRelatedWidgetId(widgetId: string): void;
}
export declare class DataRecordSetCreateMessage implements Message {
    type: MessageType;
    widgetId: string;
    dataRecordSetId: string;
    dataRecordSet: DataRecordSet;
    constructor(widgetId: string, featureSetId: string, featureSet: DataRecordSet);
}
export declare class SpatialDataRecordSetCreateMessage implements Message {
    type: MessageType;
    widgetId: string;
    dataRecordSetId: string;
    dataRecordSet: DataRecordSet;
    constructor(widgetId: string, featureSetId: string, featureSet: DataRecordSet);
}
export declare class DataRecordSetUpdateMessage implements Message {
    type: MessageType;
    widgetId: string;
    dataRecordSetId: string;
    dataRecordSet: DataRecordSet;
    constructor(widgetId: string, dataRecordSetId: string, dataRecordSet: DataRecordSet);
}
export declare class SpatialDataRecordSetUpdateMessage implements Message {
    type: MessageType;
    widgetId: string;
    dataRecordSetId: string;
    dataRecordSet: DataRecordSet;
    constructor(widgetId: string, dataRecordSetId: string, dataRecordSet: DataRecordSet);
}
export declare class SelectDataRecordMessage implements Message {
    type: MessageType;
    widgetId: string;
    dataSourceId: string;
    recordId: string;
    constructor(widgetId: string, dataSourceId: string, recordId: string);
}
export interface MessageAction {
    /**
     * The unique id
     */
    id: string;
    name?: string;
    label: string;
    /**
     * The widget id that provides the action.  No widget id means the actions is provide by jimu.
     */
    widgetId?: string;
    /**
     * Whether the tyep of message can trigger this action.
     * This method will be used in builder to filter the available actions.
     * @param messageType
     */
    filterMessageType(messageType: MessageType): boolean;
    /**
     * whether a specific message will trigger this action.
     * This method will be used to filter messages in message manager.
     */
    filterMessage(message: Message): boolean;
    onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean;
    /**
     * This component is used to config the action according to the message
     */
    getSettingComponent?(): React.ComponentClass<ActionSettingProps<{}>>;
    destroy: () => void;
}
export interface ActionSettingProps<T> {
    actionId: string;
    widgetId: string;
    messageWidgetId: string;
    config?: T;
    messageType: MessageType;
    intl?: InjectedIntl;
    onSettingChange: ActionSettingChangeFunction;
    onDisableDoneBtn?: (isDisable: boolean) => void;
}
export interface ActionSettingChangeFunction {
    (settingOptions: ActionSettingOptions): void;
}
export interface ActionSettingOptions {
    actionId: string;
    config: any;
}
export interface MessageActionConstructorOptions {
    id: string;
    name?: string;
    widgetId?: string;
    label: string;
}
export interface RegisterMessageActionOptions {
    id: string;
    name?: string;
    uri?: string;
    widgetId?: string;
    label: string;
    ActionClass?: typeof DummyMessageAction;
}
export declare abstract class AbstractMessageAction implements MessageAction {
    id: string;
    name?: string;
    widgetId?: string;
    label: string;
    constructor(options: MessageActionConstructorOptions);
    destroy(): void;
    abstract filterMessageType(messageType: MessageType): boolean;
    abstract filterMessage(message: Message): boolean;
    abstract onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean;
}
/**
 * this class is used for type check
 */
export declare class DummyMessageAction extends AbstractMessageAction {
    filterMessageType(messageType: MessageType): boolean;
    filterMessage(message: Message): boolean;
    onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean;
}
