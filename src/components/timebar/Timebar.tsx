import _ from "lodash";
import moment from "moment";
import React from "react";
import { intToPix } from "../../utils/commonUtils";

const SECOND_IN_MILLISECONDS: number = 1000;
const MINUTE_IN_MILLISECONDS: number = 60000;
const HOUR_IN_MILLISECONDS: number = 3600000;
const DAY_IN_MILLISECONDS: number = 86400000;
const MONTH_IN_MILLISECONDS: number = 2592000000;
const YEAR_IN_MILLISECONDS: number = 31104000000;


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

export class Timebar extends React.Component<TimebarProps> {

    static defaultProps = {
        topTimeUnits: [
            new SecondTimeUnit(),
            new MinuteTimeUnit(),
            new HourTimeUnit(),
            new DayTimeUnit(),
            new MonthTimeUnit(),
            new YearTimeUnit(),
        ],
        topMinLabelSizeInPixels: 15,
        bottomTimeUnits: [
            new SecondTimeUnit(),
            new MinuteTimeUnit(),
            new HourTimeUnit(),
            new DayTimeUnit(),

            // new MonthTimeUnit(),
            // new YearTimeUnit(),
        ],
        bottomMinLabelSizeInPixels: 5,
    }

    // render() {
    // render 2 timbars,
    // the timeUnits to get the segments on timebars
    // width for component
    // minLabelSizeInPixels, ce facem cand e mai mare si nu incap toate intervalele, incrementam unitatea?
    // return null;
    // }

    protected getIntervals(timeUnits: TimeUnit[], minLabelSizeInPixels: number): { label: string, size: number, isSelected?: boolean, key?: string }[] {
        const topBarComponent: { label: string, size: number, isSelected?: boolean, key?: string }[] = [];

        const duration = this.props.end.diff(this.props.start);
        const pixels_per_ms = this.props.width / duration;

        let timeUnit: TimeUnit = new SecondTimeUnit({ multiple: 1 });
        for (let key in timeUnits) {
            // trebuie sa ma folosesc de minLabelSizeInPixels pentru a putea seta...
            // if (timeUnits[Number(key)].averageSegmentPeriod() <= duration) {
            //     timeUnit = timeUnits[Number(key)];
            //     break;
            // }
            if (timeUnits[Number(key)].averageSegmentPeriod() / pixels_per_ms >= minLabelSizeInPixels) {
                timeUnit = timeUnits[Number(key)];
                break;
            }
            // if (duration / timeUnits[Number(key)].averageSegmentPeriod() * pixels_per_ms >= minLabelSizeInPixels) {
            //     timeUnit = timeUnits[Number(key)];
            //     break;
            // }
        }
        const diff = duration / timeUnit.averageSegmentPeriod();
        let currentDate = timeUnit.roundFirstSegmentStartDate(this.props.start);


        for (let i = 0; i < this.props.width;) {
            const endSegment = timeUnit.computeSegmentEnd(currentDate);
            let size = endSegment.diff(i == 0 ? this.props.start : currentDate) * pixels_per_ms;
            if (i + size > this.props.width) {
                size = this.props.width - i;
            }
            topBarComponent.push({
                label: currentDate.format(timeUnit.label),
                size
            });
            currentDate = endSegment;
            i += size;
        }
        return topBarComponent;
    }


    render() {
        const topBarComponent = this.getIntervals(this.props.topTimeUnits!, this.props.topMinLabelSizeInPixels!);
        const bottomBarComponent = this.getIntervals(this.props.bottomTimeUnits!, this.props.bottomMinLabelSizeInPixels!);


        return <div className="rct9k-timebar"
            style={{ width: this.props.width }}>
            <div className="rct9k-timebar-outer" style={{ width: this.props.width }}>
                <div className="rct9k-timebar-inner rct9k-timebar-inner-top">
                    {_.map(topBarComponent, i => {
                        let topLabel = i.label;
                        // if (cursorTime && i.key === topBarCursorKey) {
                        //     topLabel += ` [${cursorTime}]`;
                        // }
                        let className = 'rct9k-timebar-item';
                        if (i.isSelected) className += ' rct9k-timebar-item-selected';
                        return (
                            <span className={className} key={i.key} style={{ width: intToPix(i.size) }}>
                                {topLabel}
                            </span>
                        );
                    })}
                </div>
                <div
                    className="rct9k-timebar-inner rct9k-timebar-inner-bottom"
                >
                    {_.map(bottomBarComponent, (i, index) => {
                        let className = 'rct9k-timebar-item';
                        if (i.isSelected) className += ' rct9k-timebar-item-selected';
                        return (
                            <span
                                className={className}
                                key={i.key}
                                style={{ width: intToPix(i.size) }}
                            >
                                {i.label}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    }
}
