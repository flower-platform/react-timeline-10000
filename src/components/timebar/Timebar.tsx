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
    label!: string;
    multiple!: number;

    constructor(values?: Partial<TimeUnit>) {
        this.multiple = 1;
        Object.assign(this, values);
    }

    public averageSegmentPeriod(): number {
        throw new Error("averageSegmentPeriod() not implemented");
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
        super({ label: "ss", ...values });
    }

    public averageSegmentPeriod(): number {
        return this.multiple * SECOND_IN_MILLISECONDS;
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().seconds(date.seconds() - date.seconds() % this.multiple).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 's');
    }
}

export class MinuteTimeUnit extends TimeUnit {

    constructor(values?: Partial<MinuteTimeUnit>) {
        super({ label: "mm", ...values });
    }

    public averageSegmentPeriod(): number {
        return this.multiple * MINUTE_IN_MILLISECONDS;
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().minutes(date.minutes() - date.minutes() % this.multiple).seconds(0).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 'm');
    }
}

export class HourTimeUnit extends TimeUnit {

    constructor(values?: Partial<HourTimeUnit>) {
        super({ label: "HH", ...values });
    }

    public averageSegmentPeriod(): number {
        return this.multiple * HOUR_IN_MILLISECONDS;
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().hours(date.hours() - date.hours() % this.multiple).minutes(0).seconds(0).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 'h');
    }
}

export class DayTimeUnit extends TimeUnit {

    constructor(values?: Partial<DayTimeUnit>) {
        super({ label: "ddd, DD", ...values });
    }

    public averageSegmentPeriod(): number {
        return this.multiple * DAY_IN_MILLISECONDS;
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().date(date.date() - date.date() % this.multiple).hours(0).minutes(0).seconds(0).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 'd');
    }
}

export class MonthTimeUnit extends TimeUnit {

    constructor(values?: Partial<MonthTimeUnit>) {
        super({ label: "MMM. YYYY", ...values });
    }

    public averageSegmentPeriod(): number {
        return this.multiple * MONTH_IN_MILLISECONDS;
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().month(date.month() - date.month() % this.multiple).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 'M');
    }
}

export class YearTimeUnit extends TimeUnit {

    constructor(values?: Partial<YearTimeUnit>) {
        super({ label: "YYYY", ...values });
    }

    public averageSegmentPeriod(): number {
        return this.multiple * YEAR_IN_MILLISECONDS;
    }

    public roundFirstSegmentStartDate(date: moment.Moment) {
        return date.clone().year(date.year() - date.year() % this.multiple).month(0).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
    }

    public computeSegmentEnd(date: moment.Moment) {
        return date.clone().add(1 * this.multiple, 'y');
    }
}

export type TimebarProps = {
    start: moment.Moment;
    end: moment.Moment;
    width: number;
    topTimeUnits?: TimeUnit[];
    topMinLabelSizeInPixels?: number;
    bottomTimeUnits?: TimeUnit[];
    bottomMinLabelSizeInPixels?: number;
}

type Interval = {
    label: string,
    width: number,
}

export class Timebar extends React.Component<TimebarProps, { topIntervals: Interval[], bottomIntervals: Interval[] }> {

    static defaultProps = {
        topTimeUnits: [
            new YearTimeUnit(),
            new MonthTimeUnit(),
            new DayTimeUnit(),
            new HourTimeUnit(),
            new HourTimeUnit(),
            new MinuteTimeUnit(),
            new SecondTimeUnit(),
        ],
        topMinLabelSizeInPixels: 50,
        bottomTimeUnits: [
            new YearTimeUnit(),
            new MonthTimeUnit(),
            new HourTimeUnit(),
            new MinuteTimeUnit(),
            new MinuteTimeUnit(),
            new SecondTimeUnit(),
        ],
        bottomMinLabelSizeInPixels: 20,
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

    componentDidUpdate(prevProps: Readonly<TimebarProps>, prevState: Readonly<{}>, snapshot?: any): void {
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
        const pixels_per_ms = this.props.width / duration;

        let timeUnit: TimeUnit | undefined = undefined;
        for (let key in timeUnits) {
            if (timeUnits[Number(key)].averageSegmentPeriod() * 1.5 < duration && timeUnits[Number(key)].averageSegmentPeriod() * pixels_per_ms >= minLabelSizeInPixels
                && (!averageSegmentPeriod || timeUnits[Number(key)].averageSegmentPeriod() < averageSegmentPeriod)
            ) {
                timeUnit = timeUnits[Number(key)];
                break;
            }
        }
        if (!timeUnit) {
            return { intervals: [] }
        }
        let currentDate = timeUnit.roundFirstSegmentStartDate(this.props.start);

        for (let i = 0; i < this.props.width;) {
            const endSegment = timeUnit.computeSegmentEnd(currentDate);
            let width = endSegment.diff(i == 0 ? this.props.start : currentDate) * pixels_per_ms;
            if (i + width > this.props.width) {
                width = this.props.width - i;
            }
            intervals.push({ label: currentDate.format(timeUnit.label), width });
            currentDate = endSegment;
            i += width;
        }
        return { intervals, timeUnit };
    }

    protected calculateIntervals() {
        // the bottom interval need to be less that upper intervals
        const top = this.getIntervals(this.props.topTimeUnits!, this.props.topMinLabelSizeInPixels!);
        const bottom = this.getIntervals(this.props.bottomTimeUnits!, this.props.bottomMinLabelSizeInPixels!, top.timeUnit?.averageSegmentPeriod());
        this.setState({ topIntervals: top.intervals, bottomIntervals: bottom.intervals });
    }

    render() {
        const { topIntervals, bottomIntervals } = this.state;
        return <div className="rct9k-timebar"
            style={{ width: this.props.width }}>
            <div className="rct9k-timebar-outer" style={{ width: this.props.width }}>
                <div className="rct9k-timebar-inner rct9k-timebar-inner-top">
                    {topIntervals.map(interval => {
                        return (
                            <span className='rct9k-timebar-item' style={{ width: intToPix(interval.width) }}>
                                {interval.label}
                            </span>
                        );
                    })}
                </div>
                <div className="rct9k-timebar-inner rct9k-timebar-inner-bottom">
                    {bottomIntervals.map(interval => {
                        return (
                            <span className='rct9k-timebar-item' style={{ width: intToPix(interval.width) }}>
                                {interval.label}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    }
}
