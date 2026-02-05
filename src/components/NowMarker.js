import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Marker} from './Marker';
import moment from 'moment';

/**
 * @extends React.Component<NowMarker.propTypes>
 */
export class NowMarker extends React.Component {
  static propTypes = {
    /**
     * @type { string }
     */
    nowMarkerClassName: PropTypes.string,
    /**
     * @type { object }
     */
    nowMarkerStyle: PropTypes.object,
    /**
     * @type { number }
     */
    height: PropTypes.number,
    /**
     * @type { number }
     */
    topOffset: PropTypes.number,
    /**
     * @type { object }
     */
    startDateTimeline: PropTypes.object,
    /**
     * @type { object }
     */
    endDateTimeline: PropTypes.object,
    /**
     * @type { Function }
     */
    calculateHorizontalPosition: PropTypes.func.isRequired,
    /**
     * When true, the now marker position is updated in real time.
     * The timeline scrolls accordingly to maintain the now marker in the visible area
     * @type {boolean}
     */
    liveUpdate: PropTypes.bool,
    /**
     * Interval in milliseconds for live updates. Defaults to 3 minutes (5 * 60 * 1000).
     * @type {number}
     */
    liveUpdateInterval: PropTypes.number,
    /**
     * @type {(delta: number) => void}
     */
    onUpdate: PropTypes.func
  };

  static defaultProps = {
    nowMarker: false,
    nowMarkerClassName: undefined,
    nowMarkerStyle: undefined,
    height: undefined,
    topOffset: undefined,
    startDateTimeline: undefined,
    endDateTimeline: undefined,
    shouldUpdate: false,
    liveUpdate: false,
    liveUpdateInterval: 3 * 60 * 1000 // 3 minutes
  };

  constructor(props) {
    super(props);
    this.state = {currentTime: moment()};
    this.timer = undefined;
    this.previousTime = moment();
    this.unprocessedScrollInterval = 0;
  }

  componentDidMount() {
    if (this.props.liveUpdate) {
      this.startTimer();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.liveUpdate !== prevProps.liveUpdate) {
      if (this.props.liveUpdate) {
        this.startTimer();
      } else {
        this.clearTimer();
      }
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  startTimer() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      const now = moment();
      const [startDateTimeline, endDateTimeline] = [this.props.startDateTimeline, this.props.endDateTimeline];

      if (
        startDateTimeline &&
        endDateTimeline &&
        startDateTimeline.isSameOrBefore(now) &&
        endDateTimeline.isSameOrAfter(now) &&
        startDateTimeline.isSameOrBefore(this.previousTime) &&
        endDateTimeline.isSameOrAfter(this.previousTime) &&
        this.props.onUpdate
      ) {
        const posPrev = this.props.calculateHorizontalPosition(this.previousTime, this.previousTime);
        const posNow = this.props.calculateHorizontalPosition(now, now);

        if (posPrev && posNow && posNow.left - posPrev.left + this.unprocessedScrollInterval >= 1) {
          this.props.onUpdate(posNow.left - posPrev.left + this.unprocessedScrollInterval);
          this.unprocessedScrollInterval = 0;
        } else {
          this.unprocessedScrollInterval += posNow.left - posPrev.left;
        }
      }

      this.previousTime = now;
      this.setState({currentTime: now});
    }, this.props.liveUpdateInterval);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  render() {
    const currentDate = this.props.liveUpdate ? this.state.currentTime : moment();

    if (
      !this.props.startDateTimeline ||
      !this.props.endDateTimeline ||
      this.props.startDateTimeline.isAfter(currentDate) ||
      this.props.endDateTimeline.isBefore(currentDate)
    ) {
      return null;
    }

    return (
      <Fragment>
        <Marker
          date={currentDate}
          top={0}
          height={this.props.height + this.props.topOffset}
          shouldUpdate={this.props.shouldUpdate}
          calculateHorizontalPosition={date => {
            return this.props.calculateHorizontalPosition(date, date);
          }}
          className={`rct9k-background-layer-now-marker ${this.props.nowMarkerClassName || ''}`}
          style={this.props.nowMarkerStyle}
        />
      </Fragment>
    );
  }
}
