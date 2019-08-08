export interface ChangeViewInfo {
    sectionId: string;
    viewId: string;
}
export declare enum ToAppMessage {
    AppConfigChanged = "app_config_changed",
    ChangeAppMode = "change_app_mode",
    ChangeSelectMode = "change_select_mode",
    ChangePage = "change_page",
    ChangeDialog = "change_dialog",
    ChangeView = "change_view",
    ChangeSelection = "change_selection",
    ChangeWidgetsStateProp = "change_widgets_state_prop",
    DraggingWidgetToApp = "dragging_widget_to_app",
    EndDragWidgetToApp = "end_drag_widget_to_app",
    BuilderTriggerKeyboard = "builder_trigger_keyboard",
    ChangeBrowserSizeMode = "change_browser_size_mode"
}
export declare enum ToBuilderMessage {
    AppStateChanged = "app_state_changed",
    PopupChooseWidget = "popup_choose_widget",
    AppAddResource = "app_add_resource",
    AppClearResources = "app_clear_resources",
    AppTriggerKeyboard = "app_trigger_keyboard",
    SetLayoutTools = "app_set_layout_tools"
}
