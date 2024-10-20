/**
 * Timeline body/grid
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Grid} from 'react-virtualized';
import {timelineTestids} from '../timeline';

/**
 * @extends Component<TimelineBody.propTypes>
 */
class TimelineBody extends Component {
  componentDidMount() {
    this.forceUpdate();
  }
  shouldComponentUpdate(nextProps) {
    const {props} = this;
    if (!props.shallowUpdateCheck) {
      return true;
    }

    if (props.columnCount !== nextProps.columnCount) {
      return true;
    }

    // prettier-ignore
    const shallowChange = props.height !== nextProps.height
     || props.width !== nextProps.width
     || props.rowCount !== nextProps.rowCount;

    if (props.forceRedrawFunc) {
      return shallowChange || props.forceRedrawFunc(props, nextProps);
    }

    return shallowChange;
  }
  render() {
    const {width, columnWidth, height, rowHeight, rowCount, columnCount, onScroll, componentId} = this.props;
    const {grid_ref_callback, cellRenderer} = this.props;

    return (
      <Grid
        containerProps={{'data-testid': this.props.componentId + '_' + timelineTestids.ganttBody}}
        ref={grid_ref_callback}
        autoContainerWidth
        cellRenderer={cellRenderer}
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={height}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width={width}
        className={`rct9k-grid rct9k-grid-id-${componentId}`}
        onScroll={onScroll}
        data-testid={this.props.componentId + '_' + timelineTestids.grid}
      />
    );
  }
}

TimelineBody.propTypes = {
  /**
   * The total width of the body; mandatory field.
   * @type { number }
   */
  width: PropTypes.number.isRequired,

  /**
   * Function that returns the width of each column, mandatory field.
   * @type { Function }
   */
  columnWidth: PropTypes.func.isRequired,

  /**
   * The total number of columns, including the timeline (gantt).
   * @type { number }
   */
  columnCount: PropTypes.number,

  /**
   * The total height of the body (without timebar), mandatory field.
   * @type { number }
   */
  height: PropTypes.number.isRequired,

  /**
   * Function that returns the height for each row, mandatory field.
   * @type { Function }
   */
  rowHeight: PropTypes.func.isRequired,

  /**
   * Number of rows in timeline, mandatory field.
   * @type { number }
   */
  rowCount: PropTypes.number.isRequired,

  /**
   * @type { Function }
   */
  grid_ref_callback: PropTypes.func.isRequired,

  /**
   * Renderer for each cell of the grid.
   * @type { Function }
   */
  cellRenderer: PropTypes.func.isRequired,

  /**
   * As e.g. @see Timeline.props.shallowUpdateCheck
   * @type { boolean }
   */
  shallowUpdateCheck: PropTypes.bool,

  /**
   * As e.g. @see Timeline.props.forceRedrawFunc
   * @type { Function }
   */
  forceRedrawFunc: PropTypes.func,

  /**
   * A unique key to identify the component. Only needed when 2 grids are mounted.
   * @type { string }
   */
  componentId: PropTypes.string
};

TimelineBody.defaultProps = {
  columnCount: 1,
  shallowUpdateCheck: false,
  forceRedrawFunc: null
};
export default TimelineBody;
