import _ from "lodash";
import moment from "moment";
import React from "react";
import { intToPix } from "../../utils/commonUtils";

const SECOND_IN_MILLISECONDS: number = 1000;
const MINUTE_IN_MILLISECONDS: number = 60 * SECOND_IN_MILLISECONDS;
const HOUR_IN_MILLISECONDS: number = 60 * MINUTE_IN_MILLISECONDS;
const DAY_IN_MILLISECONDS: number = 24 * HOUR_IN_MILLISECONDS;
const MONTH_IN_MILLISECONDS: number = 30 * DAY_IN_MILLISECONDS;
const YEAR_IN_MILLISECONDS: number = 365 * DAY_IN_MILLISECONDS;

export class TimeUnit {
    multiple!: number;
    milliseconds!: number;
    timeFormat!: string;

    constructor(values?: Partial<TimeUnit>) {
        this.multiple = 1;
        this.milliseconds = 1;
        Object.assign(this, values);
    }

    public averageSegmentPeriod(): number {
        return this.multiple * this.milliseconds;
    }

    public roundFirstSegmentStartDate(date: moment.Moment): moment.Moment {
        throw new Error("roundFirstSegmentStartDate() not implemented");
    }

    public computeSegmentEnd(date: moment.Moment): moment.Moment {
        throw new Error("roundFirstSegmentStartDate() not implemented");
    }
}

export class SecondTimeUnit extends TimeUnit {

    constructor(values?: Partial<SecondTimeUnit>) {
        super({ milliseconds: SECOND_IN_MILLISECONDS, timeFormat: "ss", ...values });
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().seconds(date.seconds() - date.seconds() % this.multiple).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 's');
    }
}

export class FiveSecondTimeUnit extends SecondTimeUnit {
    constructor(values?: Partial<SecondTimeUnit>) {
        super({ multiple: 5, ...values });
    }
}

export class TenSecondTimeUnit extends SecondTimeUnit {
    constructor(values?: Partial<SecondTimeUnit>) {
        super({ multiple: 10, ...values });
    }
}

export class FifteenSecondTimeUnit extends SecondTimeUnit {
    constructor(values?: Partial<SecondTimeUnit>) {
        super({ multiple: 15, ...values });
    }
}

export class ThirtySecondTimeUnit extends SecondTimeUnit {
    constructor(values?: Partial<SecondTimeUnit>) {
        super({ multiple: 30, ...values });
    }
}

export class MinuteTimeUnit extends TimeUnit {

    constructor(values?: Partial<MinuteTimeUnit>) {
        super({ milliseconds: MINUTE_IN_MILLISECONDS, timeFormat: "mm", ...values });
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().minutes(date.minutes() - date.minutes() % this.multiple).seconds(0).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 'm');
    }
}

export class FiveMinuteTimeUnit extends MinuteTimeUnit {
    constructor(values?: Partial<MinuteTimeUnit>) {
        super({ multiple: 5, ...values });
    }
}

export class TenMinuteTimeUnit extends MinuteTimeUnit {
    constructor(values?: Partial<MinuteTimeUnit>) {
        super({ multiple: 10, ...values });
    }
}

export class FifteenMinuteTimeUnit extends MinuteTimeUnit {
    constructor(values?: Partial<MinuteTimeUnit>) {
        super({ multiple: 15, ...values });
    }
}

export class ThirtyMinuteTimeUnit extends MinuteTimeUnit {
    constructor(values?: Partial<MinuteTimeUnit>) {
        super({ multiple: 30, ...values });
    }
}

export class HourTimeUnit extends TimeUnit {

    constructor(values?: Partial<HourTimeUnit>) {
        super({ milliseconds: HOUR_IN_MILLISECONDS, timeFormat: "HH", ...values });
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().hours(date.hours() - date.hours() % this.multiple).minutes(0).seconds(0).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 'h');
    }
}

export class TwoHourTimeUnit extends HourTimeUnit {
    constructor(values?: Partial<HourTimeUnit>) {
        super({ multiple: 2, ...values });
    }
}

export class FourHourTimeUnit extends HourTimeUnit {
    constructor(values?: Partial<HourTimeUnit>) {
        super({ multiple: 4, ...values });
    }
}

export class SixHourTimeUnit extends HourTimeUnit {
    constructor(values?: Partial<HourTimeUnit>) {
        super({ multiple: 6, ...values });
    }
}

export class TwelveHourTimeUnit extends HourTimeUnit {
    constructor(values?: Partial<HourTimeUnit>) {
        super({ multiple: 12, ...values });
    }
}

export class DayTimeUnit extends TimeUnit {

    constructor(values?: Partial<DayTimeUnit>) {
        super({ milliseconds: DAY_IN_MILLISECONDS, timeFormat: "ddd, DD", ...values });
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().date(date.date() - date.date() % this.multiple).hours(0).minutes(0).seconds(0).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 'd');
    }
}

export class TwoDayTimeUnit extends DayTimeUnit {
    constructor(values?: Partial<DayTimeUnit>) {
        super({ multiple: 2, ...values });
    }
}

export class ThreeDayTimeUnit extends DayTimeUnit {
    constructor(values?: Partial<DayTimeUnit>) {
        super({ multiple: 3, ...values });
    }
}

export class WeekTimeUnit extends DayTimeUnit {
    constructor(values?: Partial<DayTimeUnit>) {
        super({ multiple: 7, ...values });
    }
}

export class TwoWeekTimeUnit extends DayTimeUnit {
    constructor(values?: Partial<DayTimeUnit>) {
        super({ multiple: 14, ...values });
    }
}

export class MonthTimeUnit extends TimeUnit {

    constructor(values?: Partial<MonthTimeUnit>) {
        super({ milliseconds: MONTH_IN_MILLISECONDS, timeFormat: "MMM. YYYY", ...values });
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().month(date.month() - date.month() % this.multiple).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 'M');
    }
}

export class TwoMonthTimeUnit extends MonthTimeUnit {
    constructor(values?: Partial<MonthTimeUnit>) {
        super({ multiple: 2, ...values });
    }
}

export class ThreeMonthTimeUnit extends MonthTimeUnit {
    constructor(values?: Partial<MonthTimeUnit>) {
        super({ multiple: 3, ...values });
    }
}

export class SixMonthTimeUnit extends MonthTimeUnit {
    constructor(values?: Partial<MonthTimeUnit>) {
        super({ multiple: 6, ...values });
    }
}

export class YearTimeUnit extends TimeUnit {

    constructor(values?: Partial<YearTimeUnit>) {
        super({ milliseconds: YEAR_IN_MILLISECONDS, timeFormat: "YYYY", ...values });
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().year(date.year() - date.year() % this.multiple).month(0).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 'y');
    }
}

export class TwoYearTimeUnit extends YearTimeUnit {
    constructor(values?: Partial<YearTimeUnit>) {
        super({ multiple: 2, ...values });
    }
}

export class FiveYearTimeUnit extends YearTimeUnit {
    constructor(values?: Partial<YearTimeUnit>) {
        super({ multiple: 5, ...values });
    }
}

export class TenYearTimeUnit extends YearTimeUnit {
    constructor(values?: Partial<YearTimeUnit>) {
        super({ multiple: 10, ...values });
    }
}

export type TimebarProps = {
    start: moment.Moment;
    end: moment.Moment;
    width: number;
    unsupportedSizeMessage: string,
    topTimeUnits?: TimeUnit[];
    topMinLabelSizeInPixels?: number;
    bottomTimeUnits?: TimeUnit[];
    bottomMinLabelSizeInPixels?: number;
}

type Interval = {
    label: string,
    width: number,
}

export const ALL_TIME_UNITS = [
    new SecondTimeUnit(),
    new FiveSecondTimeUnit(),
    new TenSecondTimeUnit(),
    new FifteenSecondTimeUnit(),
    new ThirtySecondTimeUnit(),
    new MinuteTimeUnit(),
    new FiveMinuteTimeUnit(),
    new TenMinuteTimeUnit(),
    new FifteenMinuteTimeUnit(),
    new ThirtyMinuteTimeUnit(),
    new HourTimeUnit(),
    new TwoHourTimeUnit(),
    new FourHourTimeUnit(),
    new SixHourTimeUnit(),
    new TwelveHourTimeUnit(),
    new DayTimeUnit(),
    new TwoDayTimeUnit(),
    new ThreeDayTimeUnit(),
    new WeekTimeUnit(),
    new TwoWeekTimeUnit(),
    new MonthTimeUnit(),
    new TwoMonthTimeUnit(),
    new ThreeMonthTimeUnit(),
    new SixMonthTimeUnit(),
    new YearTimeUnit(),
    new TwoYearTimeUnit(),
    new FiveYearTimeUnit(),
    new TenYearTimeUnit(),
];

export class Timebar extends React.Component<TimebarProps, { topIntervals: Interval[], bottomIntervals: Interval[] }> {

    static defaultProps = {
        topTimeUnits: ALL_TIME_UNITS,
        topMinLabelSizeInPixels: 60,
        bottomTimeUnits: ALL_TIME_UNITS,
        bottomMinLabelSizeInPixels: 30,
        unsupportedSizeMessage: "Time scale unavailable for current view size"
    }

    constructor(props: TimebarProps) {
        super(props);
        this.state = {
            topIntervals: [],
            bottomIntervals: []
        }
    }

    componentDidMount(): void {
        this.calculateIntervals();
    }

    componentDidUpdate(prevProps: Readonly<TimebarProps>): void {
        if (prevProps.start != this.props.start
            || prevProps.end != this.props.end
            || prevProps.width != this.props.width
            || prevProps.topTimeUnits != this.props.topTimeUnits
            || prevProps.topMinLabelSizeInPixels != this.props.topMinLabelSizeInPixels
            || prevProps.bottomTimeUnits != this.props.bottomTimeUnits
            || prevProps.bottomMinLabelSizeInPixels != this.props.bottomMinLabelSizeInPixels
        ) {
            this.calculateIntervals();
        }
    }

    protected getIntervals(timeUnits: TimeUnit[], minLabelSizeInPixels: number, averageSegmentPeriod?: number): { intervals: Interval[], timeUnit?: TimeUnit } {
        const intervals: Interval[] = [];

        const duration = this.props.end.diff(this.props.start);
        const pixelsPerMs = this.props.width / duration;

        let timeUnit: TimeUnit | undefined = undefined;
        for (let key in timeUnits) {
            const msPerSegment = timeUnits[Number(key)].averageSegmentPeriod();
            if (msPerSegment <= duration && msPerSegment * pixelsPerMs >= minLabelSizeInPixels
                && (!averageSegmentPeriod || msPerSegment < averageSegmentPeriod)
            ) {
                timeUnit = timeUnits[Number(key)];
                break;
            }
        }
        if (!timeUnit) {
            return { intervals: [] };
        }
        let currentDate = timeUnit.roundFirstSegmentStartDate(this.props.start);

        for (let i = 0; i < this.props.width;) {
            const endSegment = timeUnit.computeSegmentEnd(currentDate);
            let width = endSegment.diff(i == 0 ? this.props.start : currentDate) * pixelsPerMs;
            if (i + width > this.props.width) {
                width = this.props.width - i;
            }
            intervals.push({ label: currentDate.format(timeUnit.timeFormat), width });
            currentDate = endSegment;
            i += width;
        }
        return { intervals, timeUnit };
    }

    protected calculateIntervals() {
        // the bottom intervals need to be less that upper intervals
        const top = this.getIntervals(this.props.topTimeUnits!, this.props.topMinLabelSizeInPixels!);
        const bottom = this.getIntervals(this.props.bottomTimeUnits!, this.props.bottomMinLabelSizeInPixels!, top.timeUnit?.averageSegmentPeriod());
        this.setState({ topIntervals: top.intervals, bottomIntervals: bottom.intervals });
    }

    render() {
        const { topIntervals, bottomIntervals } = this.state;
        return <div className="rct9k-timebar"
            style={{ width: this.props.width }}>
            <div className="rct9k-timebar-outer" style={{ width: this.props.width }}>
                {topIntervals.length === 0 && bottomIntervals.length === 0 && this.props.unsupportedSizeMessage ?
                    <div style={{ textAlign: 'center' }}>
                        {this.props.unsupportedSizeMessage}
                    </div>
                    : null}
                {topIntervals.length ? <div className="rct9k-timebar-inner rct9k-timebar-inner-top">
                    {topIntervals.map(interval => {
                        return (
                            <span className='rct9k-timebar-item' style={{ width: intToPix(interval.width) }}>
                                {interval.label}
                            </span>
                        );
                    })}
                </div> : null
                }
                {bottomIntervals.length ? <div className="rct9k-timebar-inner rct9k-timebar-inner-bottom">
                    {bottomIntervals.map(interval => {
                        return (
                            <span className='rct9k-timebar-item' style={{ width: intToPix(interval.width) }}>
                                {interval.label}
                            </span>
                        );
                    })}
                </div> : null
                }
            </div>
        </div>
    }
}
