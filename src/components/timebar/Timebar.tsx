import moment from "moment";
import React from "react";

export type TimebarProps = {
    start: moment.Moment | number;
    end: moment.Moment | number;
    cursorTime?: moment.Moment | number;
    // the maximum size for this array was 2, anothers elements was ignored
    timeUnits?: TimeUnit[];
    minLabelSizeInPixels?: number;
    width: number;
}

export default class Timebar extends React.Component<TimebarProps> {

    render() {
        // render 2 timbars,
        // the timeUnits to get the segments on timebars
        // width for component
        // minLabelSizeInPixels, ce facem cand e mai mare si nu incap toate intervalele, incrementam unitatea?
        return null;
    }
}


export class TimeUnit {
    multiple!: number;

    constructor(value: Partial<TimeUnit>) {
        Object.assign(this, value);
    }
}

export class SecondTimeUnit extends TimeUnit {
    constructor(value: Partial<SecondTimeUnit>) {
        super(value);
    }
}

export class MinuteTimeUnit extends TimeUnit {
    constructor(value: Partial<MinuteTimeUnit>) {
        super(value);
    }
}

export class HourTimeUnit extends TimeUnit {
    constructor(value: Partial<HourTimeUnit>) {
        super(value);
    }
}

export class DayTimeUnit extends TimeUnit {
    constructor(value: Partial<DayTimeUnit>) {
        super(value);
    }
}

export class MonthTimeUnit extends TimeUnit {
    constructor(value: Partial<MonthTimeUnit>) {
        super(value);
    }
}

export class YearTimeUnit extends TimeUnit {
    constructor(value: Partial<YearTimeUnit>) {
        super(value);
    }
}
