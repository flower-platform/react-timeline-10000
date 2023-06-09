import React from 'react';
import {Column} from '../types';

/**
 * Renderer for column header.
 * @param { object } props - Component props
 * @param { Column } props.column - The properties of the column
 * @param { string } props.column.headerLabel - The header's label
 */
export class GroupHeaderRenderer extends React.Component {
  /**
   * Returns the label of the header.
   * @returns { string }
   */
  getLabel() {
    return this.props.column && this.props.column.headerLabel ? this.props.column.headerLabel : '';
  }

  render() {
    return <span>{this.getLabel()}</span>;
  }
}
