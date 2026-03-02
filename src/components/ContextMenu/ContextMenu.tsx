import React from 'react';
import { Menu, Popup, StrictPopupProps } from 'semantic-ui-react';
import { IAction, IActionParamForRun } from './IAction';
import { TestsAreDemoCheat, createTestids } from '@famiprog-foundation/tests-are-demo';
import _ from 'lodash';

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

export class ContextMenu extends React.Component<ContextMenuProps, { isOpened?: boolean }> {

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      isOpened: props.positionToOpen ? true : false
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.positionToOpen !== this.props.positionToOpen ||
      !_.isEqual(nextProps.actions, this.props.actions) ||
      !_.isEqual(nextProps.paramsForAction, this.props.paramsForAction) ||
      nextState.isOpened !== this.state.isOpened
    );
  }

  componentDidUpdate(prevProps: Readonly<ContextMenuProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.positionToOpen != prevProps.positionToOpen) {
      this.setState({ isOpened: this.props.positionToOpen ? true : false });
    }
  }

  close() {
    this.setState({ isOpened: false });
    this.props.onClose && this.props.onClose();
  }

  getPopupContext(): HTMLElement {
    const x = this.props.positionToOpen?.x;
    const y = this.props.positionToOpen?.y;
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
    return actions.filter(action => action.isVisible ? action.isVisible(this.props.paramsForAction) : true);
  }

  render() {
    const visibleActions = this.getVisisbleActions(this.props.actions);
    return <>
      <TestsAreDemoCheat objectToPublish={this} />
      <Popup basic wide='very' data-testid={testids.popup} context={this.getPopupContext()}
        position={this.props.paramsForAction.position}
        onClose={() => {
          this.close();
        }} open={(this.state.isOpened && visibleActions.length > 0)}>
        <Menu className="rct9k-context-menu" secondary vertical>
          {visibleActions.map((action: IAction) => {
            const key = (action.key instanceof Function ? action.key({ ...this.props.paramsForAction }) : action.key) || visibleActions.indexOf(action);
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
              : React.cloneElement(action.renderInMenu({ ...this.props.paramsForAction, closeContextMenu: this.close }), { key: key, "data-testid": testids.menuItem + "_" + key })
            );
          })
          }
        </Menu>
      </Popup>
    </>
  }
}
