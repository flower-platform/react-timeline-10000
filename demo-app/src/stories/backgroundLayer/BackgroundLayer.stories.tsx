import React from 'react';
import { Timeline, BackgroundLayer, HighlightedInterval, Marker, Item } from '@famiprog-foundation/react-gantt';
import { startOfCurrentMonth, endOfCurrentMonth, dateAndHourOfCurrentMonth, manyHumanResources, dateAndHourOfMonth, d } from '../sampleData';
import { backgroundLayerScenarios } from './BackgroundLayerScenarios';
import { Table, Column, DataCell} from 'fixed-data-table-2';
import moment from 'moment';

export default {
  title: 'Features/Background Layer',
  includeStories: /^[A-Z]/
};

export const month = moment("2023 11", "YYYY MM");

const tasks: Item[] = [
  {key: 11, row: 1, title: 'Task JD1', start: dateAndHourOfMonth(month, 20, 8), end: dateAndHourOfMonth(month, 28, 11)},
  {key: 12, row: 3, title: 'Task KP1', start: dateAndHourOfMonth(month, 3, 0), end: dateAndHourOfMonth(month, 6, 23)},
  {key: 13, row: 3, title: 'Task KP2', start: dateAndHourOfMonth(month, 11, 18), end: dateAndHourOfMonth(month, 18, 19)}
];

export const Main = () => {
  return (
    <Timeline startDate={d(month.startOf('month'))}
      endDate={d(month.endOf('month'))} groups={manyHumanResources} items={tasks}
      table={<Table width={115} >
                <Column
                    columnKey="title"
                    width={100}
                    header={<DataCell>Title</DataCell>}
                    cell={({rowIndex}) => <DataCell>{rowIndex < manyHumanResources.length ? manyHumanResources[rowIndex].title : ""}</DataCell>}/>
            </Table>}
      backgroundLayer={
        <BackgroundLayer verticalGrid nowMarker highlightWeekends
          highlightedIntervals={[
            <HighlightedInterval start={dateAndHourOfMonth(month, 1)} end={dateAndHourOfMonth(month, 2)} />,
            <HighlightedInterval start={dateAndHourOfMonth(month, 15)} end={dateAndHourOfMonth(month, 18)} />,
            <HighlightedInterval start={dateAndHourOfMonth(month, 20, 19)} end={dateAndHourOfMonth(month, 21, 10)} />
          ]}
          markers={[
            <Marker date={dateAndHourOfMonth(month, 10, 12)} />,
            <Marker date={dateAndHourOfMonth(month, 15, 12)} />
          ]}
        />}
    />
  );
};

Main.parameters = {
  scenarios: [
    backgroundLayerScenarios.verticalGrid,
    backgroundLayerScenarios.nowMarker,
    backgroundLayerScenarios.highlightWeekends,
    backgroundLayerScenarios.markers,
    backgroundLayerScenarios.highlightedIntervals
  ]
}

export const CustomClassNamesAndStyles = () => {
  return (
    <Timeline startDate={startOfCurrentMonth()}
      endDate={endOfCurrentMonth()} groups={manyHumanResources} items={tasks}
      table={<Table width={115} >
                <Column
                    columnKey="title"
                    width={100}
                    header={<DataCell>Title</DataCell>}
                    cell={({rowIndex}) => <DataCell>{rowIndex < manyHumanResources.length ? manyHumanResources[rowIndex].title : ""}</DataCell>}/>
            </Table>}
      backgroundLayer={
        <BackgroundLayer verticalGrid verticalGridClassName='story-custom-vertical-grid-class' verticalGridStyle={{opacity: 0.5}}
          nowMarker nowMarkerClassName='story-custom-now-marker-class' nowMarkerStyle={{opacity: 0.7}}
          highlightWeekends highlightWeekendsClassName='story-custom-highlighted-weekends-class' highlightWeekendsStyle={{opacity: 0.8}}
          highlightedIntervals={[
            <HighlightedInterval className='story-custom-highlighted-interval-class' style={{background: '#f6bea3'}} start={dateAndHourOfMonth(month, 15)} end={dateAndHourOfMonth(month, 18)} />,
            <HighlightedInterval className='story-custom-highlighted-interval-class' style={{background: '#f6bea3'}} start={dateAndHourOfMonth(month, 20, 19)} end={dateAndHourOfMonth(month, 21, 10)} />
          ]}
          markers={[
            <Marker className='story-custom-marker-class' style={{width: '2px'}} date={dateAndHourOfMonth(month, 10, 12)} />,
            <Marker className='story-custom-marker-class' style={{width: '2px'}} date={dateAndHourOfMonth(month, 15, 12)} />
          ]}
        />}
    />
  );
};

CustomClassNamesAndStyles.parameters = {
  scenarios: [
    backgroundLayerScenarios.verticalGridClassName,
    backgroundLayerScenarios.nowMarkerClassName,
    backgroundLayerScenarios.highlightWeekendsClassName,
    backgroundLayerScenarios.classNameForMarker,
    backgroundLayerScenarios.highlightedIntervalClassName
  ]
}