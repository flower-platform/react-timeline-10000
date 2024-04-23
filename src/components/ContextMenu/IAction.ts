import React from "react"
import { IconProps, SemanticShorthandItem } from "semantic-ui-react"
import { Point } from "./ContextMenu"

export interface IActionParam {
    selection: any[]
}

export interface IActionParamForRun extends IActionParam {
    closeContextMenu: () => void,
    
    /**
     * By default the context menu closes immediately after the action is run
     * If the user wants to avoid the closing of the menu after action runs he needs to set this property to true
     * and maybe explicitly call closeContextMenu() when needed
     */
    dontCloseContextMenuAfterRunAutomatically?: boolean,

    /**
     * It would contains the mouse coordinates (obtained when click is done on an action) that can be used by an action
     */
    eventPoint?: Point
}

export interface IOnContextMenuShowParam {
    actionParam: IActionParam
    // poate mai bagam pe viitor chestii aici; precum posib de alte customizari; precum o functie de render pentru context menu
}

/**
 * This is a descriptor passed by the user to define an action entry in the context menu.
 * Can have a `run` function that will be called when user will clicks the corresponding menu entry. 
 * It will receive a parameter containing things like: current selection, a close menu function to be run after clicking the action
 */
export interface IAction {
    /**
     * Should return true of false whether or not the action is visible for the selected items received as parameter
     */
    isVisible?: (param: IActionParam) => boolean,
    icon?: SemanticShorthandItem<IconProps>,
    label?: string | ((param: IActionParam) => string),
    disabled?: boolean,
    /**
     * Function that will be called when user will click this menu entry. Will receives as parameter the current selected items
     */
    run?: (param: IActionParamForRun) => void,
    renderInMenu?: (param: IActionParamForRun) => React.ReactElement
}
