import React from 'react';
import { Menu, Popup, StrictPopupProps } from 'semantic-ui-react';
import { IAction, IActionParamForRun } from './IAction';
import { TestsAreDemoCheat, createTestids } from '@famiprog-foundation/tests-are-demo';

export type Point = { x: number, y: number };

type Position = StrictPopupProps["position"];

type IParamsForAction = {
  selection: any[];
  isOpened: boolean;
  /**
   * Position for the popover.
   */
  position?: Position;
  /**
   * The coordinates {x, y} of position where the menu should be rendered when it's opened
   */
  positionToOpen?: Point;
  /**
   * Callback for extra actions when the menu is closed
   */
  onClose?: () => void;
  [key: string]: any;
}
interface ContextMenuProps {
  actions: IAction[];

  actionParam: IParamsForAction;
}

const testids = createTestids('ContextMenu', {
  popup: '',
  menuItem: ''
});
export const contextMenuTestIds = testids;

export class ContextMenu extends React.Component<ContextMenuProps> {

  constructor(props: ContextMenuProps) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.actionParam.onClose && this.props.actionParam.onClose();
  }

  getPopupContext(): HTMLElement {
    const x = this.props.actionParam.positionToOpen?.x;
    const y = this.props.actionParam.positionToOpen?.y;
    return {
      getBoundingClientRect: () => ({
        left: x,
        top: y,
        right: x + 1,
        bottom: y + 1,
        height: 0,
        width: 0
      })
    } as HTMLElement;
  }

  getVisisbleActions(actions: IAction[]): IAction[] {
    return actions.filter(action => action.isVisible ? action.isVisible(this.props.actionParam) : true);
  }

  render() {
    const visibleActions = this.getVisisbleActions(this.props.actions);
    return <>
      <TestsAreDemoCheat objectToPublish={this} />
      <Popup basic wide='very' data-testid={testids.popup} context={this.getPopupContext()}
        position={this.props.actionParam.position}
        onClose={() => {
          this.close();
        }} open={(this.props.actionParam.isOpened && visibleActions.length > 0)}>
        <Menu className="rct9k-context-menu" secondary vertical>
          {visibleActions.map((action: IAction) => {
            const key = visibleActions.indexOf(action);
            return (!action.renderInMenu ?
              <Menu.Item
                data-testid={testids.menuItem + "_" + key}
                key={key}
                icon={action.icon}
                disabled={action.isDisabled ? action.isDisabled(this.props.actionParam) : false}
                content={action.label instanceof Function ? action.label({ ...this.props.actionParam }) : action.label}
                onClick={(event) => {
                  let params: IActionParamForRun = { ...this.props.actionParam, closeContextMenu: this.close, eventPoint: { x: event.clientX, y: event.clientY } }
                  action.run && action.run(params);
                  if (!params.dontCloseContextMenuAfterRunAutomatically) {
                    this.close();
                  }
                }}>
              </Menu.Item>
              : React.cloneElement(action.renderInMenu({ ...this.props.actionParam, closeContextMenu: this.close }), { key: visibleActions.indexOf(action), "data-testid": testids.menuItem + "_" + key })
            );
          })
          }
        </Menu>
      </Popup>
    </>
  }
}
