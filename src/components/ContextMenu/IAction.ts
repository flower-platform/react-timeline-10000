import React from "react"
import { IconProps, SemanticShorthandItem } from "semantic-ui-react"
import { Point } from "./ContextMenu"

// TODO RM34271 let's get rid of IActionParamForRun. It overcomplicates the inheritance. We'll have here closeContextMenu() that won't do anything.
// export interface IActionParam<S> {
// selection: S[]
export interface IActionParam {
    selection: any[]
}

export interface IActionParamForRun extends IActionParam {
    closeContextMenu?: () => void,
    
    /**
     * By default the context menu closes immediately after the action is run
     * If the user wants to avoid the closing of the menu after action runs he needs to set this property to true
     * and maybe explicitly call closeContextMenu() when needed
     */
    dontCloseContextMenuAfterRunAutomatically?: boolean,

    /**
     * It contains the mouse coordinates, obtained from onClick event of an action
     */
    eventPoint?: Point
}

// TODO RM34271 CS: for the moment it's not clear why we need this. It's not used by the lib. And currently, the task of opening
// the context menu belongs to the user. This interface, judging by its name, seems to be needed for the process of opening the CM
/**
 * We may add in the future further customization possibilities. E.g. a `render()` function, etc.
 */
export interface IOnContextMenuShowParam {
    actionParam: IActionParam
}

/**
 * This is a descriptor passed by the user to define an action entry in the context menu.
 * Can have a `run` function that will be called when user will clicks the corresponding menu entry. 
 * It will receive a parameter containing things like: current selection, a close menu function to be run after clicking the action.
 */
// TODO RM34271 
// export interface IAction<AP extends IActionParam> {
export interface IAction {
    /**
     * Should return true of false whether or not the action is visible for the selected items received as parameter
     */
    isVisible?: (param: IActionParam) => boolean,
    isDisabled?: (param: IActionParam) => boolean,
    icon?: SemanticShorthandItem<IconProps>,
    label?: string | ((param: IActionParam) => string),
    /**
     * Function that will be called when user will click this menu entry. Will receives as parameter the current selected items
     */
    run?: (param: IActionParamForRun) => void,
    renderInMenu?: (param: IActionParamForRun) => React.ReactElement
}
