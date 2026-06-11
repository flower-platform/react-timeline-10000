import { TestsAreDemoCheat, createTestids } from '@famiprog-foundation/tests-are-demo';
import _ from 'lodash';
import React from 'react';
import { Menu, Popup, StrictPopupProps } from 'semantic-ui-react';
import { IAction, IActionParamForRun } from './IAction';

export type Point = { x: number, y: number };

type Position = StrictPopupProps["position"];

type IParamsForAction = {
  selection: any[];
  position?: Position;
  [key: string]: any;
}
interface ContextMenuProps {
  actions: IAction[];

  paramsForAction: IParamsForAction;
  /**
   * if undefined => the menu is closed else {x, y} position where the menu should open
   */
  positionToOpen?: Point;
  /**
   * Callback for extra actions when the menu is closed
   */
  onClose?: () => void;
}

const testids = createTestids('ContextMenu', {
  popup: '',
  menuItem: ''
});
export const contextMenuTestIds = testids;

export type ContextMenuState = {
  isOpened?: boolean,
  isAdjusted: boolean,
  x: number,
  y: number,
}

export class ContextMenu extends React.Component<ContextMenuProps, ContextMenuState> {

  id = _.uniqueId("ContextMenu");

  constructor(props: ContextMenuProps) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      isOpened: props.positionToOpen ? true : false, isAdjusted: false,
      x: props.positionToOpen?.x ?? 0, y: props.positionToOpen?.y ?? 0
    }
  }

  shouldComponentUpdate(nextProps: ContextMenuProps, nextState: ContextMenuState) {
    return (
      !_.isEqual(this.props.positionToOpen, nextProps.positionToOpen) ||
      !_.isEqual(nextProps.actions, this.props.actions) ||
      !_.isEqual(nextProps.paramsForAction, this.props.paramsForAction) ||
      nextState.x !== this.state.x ||
      nextState.y !== this.state.y ||
      nextState.isOpened !== this.state.isOpened ||
      nextState.isAdjusted !== this.state.isAdjusted
    );
  }

  componentDidMount(): void {
    if (this.props.positionToOpen) {
      this.adjustPopup(this.props.positionToOpen.x, this.props.positionToOpen.y);
    }
  }

  componentDidUpdate(prevProps: Readonly<ContextMenuProps>, prevState: Readonly<ContextMenuState>, snapshot?: any): void {
    if (!_.isEqual(this.props.positionToOpen, prevProps.positionToOpen)) {
      this.setState({ isAdjusted: false, isOpened: this.props.positionToOpen ? true : false, x: this.props.positionToOpen?.x ?? 0, y: this.props.positionToOpen?.y ?? 0 }, () => {
        this.props.positionToOpen && this.adjustPopup(this.props.positionToOpen.x, this.props.positionToOpen.y)
      });
    }
  }

  close() {
    this.setState({ isOpened: false });
    this.props.onClose && this.props.onClose();
  }

  /**
   * Adjusts the popup's coordinates to ensure it stays within the viewport boundaries.
   * This method is called exclusively when the popup is opened.
   * * @param x - The initial horizontal cursor coordinate
   * * @param y - The initial vertical cursor coordinate
   */
  adjustPopup(x: number, y: number) {
    // Get the current dimensions of the popup element
    const { width = 0, height = 0 } = document.getElementById(this.id)?.getBoundingClientRect() || {} as DOMRect;

    let finalX = x, finalY = y;
    // If the popup overflows the right edge of the screen, flip it to the left side of the cursor
    if (x + width > window.innerWidth) {
      // Ensure it doesn't go off the left edge of the screen (min boundary of 0)
      finalX = Math.max(0, x - width);
    }

    // If the popup overflows the bottom edge of the screen, flip it above the cursor
    if (y + height > window.innerHeight) {
      // Ensure it doesn't go off the top edge of the screen (min boundary of 0)
      finalY = Math.max(0, y - height);
    }

    // Update the component state with the safe, adjusted coordinates and mark as adjusted
    this.setState({ x: finalX, y: finalY, isAdjusted: true })
  }

  getPopupContext(): HTMLElement {
    const left = this.state.x;
    const top = this.state.y;
    return {
      getBoundingClientRect: () => ({
        left,
        top,
        right: left + 1,
        bottom: top + 1,
        height: 0,
        width: 0
      })
    } as HTMLElement;
  }

  getVisisbleActions(actions: IAction[]): IAction[] {
    return actions.filter(action => action.isVisible ? action.isVisible(this.props.paramsForAction) : true);
  }

  render() {
    const visibleActions = this.getVisisbleActions(this.props.actions);
    return <>
      <TestsAreDemoCheat objectToPublish={this} />
      <Popup id={this.id} basic wide='very' data-testid={testids.popup} context={this.getPopupContext()}
        style={{ maxHeight: '80vh', maxWidth: '80vw', overflow: 'auto', visibility: this.state.isAdjusted ? 'visible' : 'hidden' }}
        positionFixed
        position='bottom left'
        onClose={() => {
          this.close();
        }} open={(this.state.isOpened && visibleActions.length > 0)}>
        <Menu className="rct9k-context-menu" secondary vertical >
          {visibleActions.map((action: IAction) => {
            const key = visibleActions.indexOf(action);
            return (!action.renderInMenu ?
              <Menu.Item
                data-testid={testids.menuItem + "_" + key}
                key={key}
                icon={action.icon}
                disabled={action.isDisabled ? action.isDisabled(this.props.paramsForAction) : false}
                content={action.label instanceof Function ? action.label({ ...this.props.paramsForAction }) : action.label}
                onClick={(event) => {
                  let params: IActionParamForRun = { ...this.props.paramsForAction, closeContextMenu: this.close, eventPoint: { x: event.clientX, y: event.clientY } }
                  action.run && action.run(params);
                  if (!params.dontCloseContextMenuAfterRunAutomatically) {
                    this.close();
                  }
                }}>
              </Menu.Item>
              : React.cloneElement(action.renderInMenu({ ...this.props.paramsForAction, closeContextMenu: this.close }), { key: visibleActions.indexOf(action), "data-testid": testids.menuItem + "_" + key })
            );
          })
          }
        </Menu>
      </Popup>
    </>
  }
}
