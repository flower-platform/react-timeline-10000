import React from 'react';
import Timebar, { HourTimeUnit, MinuteTimeUnit } from './Timebar';
import moment from 'moment';

export default {
    title: 'Features/Timebar'
};

export const Main = () => {
    return <Timebar start={moment('2018-09-20 7:00').valueOf()} end={moment('2018-09-20 8:00').valueOf()} width={400} timeUnits={[new HourTimeUnit({ multiple: 1 }), new MinuteTimeUnit({ multiple: 15 })]} />;
};
