import { BackgroundLayer, Item, Timeline } from '@famiprog-foundation/react-gantt';
import { createTestids } from '@famiprog-foundation/tests-are-demo';
import { Column, DataCell, Table } from 'fixed-data-table-2';
import moment from 'moment';
import { useState } from 'react';
import { Checkbox, Form, Input } from 'semantic-ui-react';
import { d, manyHumanResources } from '../sampleData';

export default {
    title: 'Features/Now Marker',
    includeStories: /^[A-Z]/
};

export const nowMarkerStoriesTestIds = createTestids('NowMarkerStory', { liveUpdateCheckbox: '' });

export const Main = () => {
    const [nowMarkerLiveUpdate, setNowMarkerLiveUpdate] = useState(false);
    const [nowMarkerLiveUpdateInterval, setNowMarkerLiveUpdateInterval] = useState(1000);

    const [anchor] = useState(() => moment(Date.now()));
    const startDate = d(anchor.clone().subtract(3, 'minutes'));
    const endDate = d(anchor.clone().add(3, 'minutes'));
    const minDate = d(anchor.clone().subtract(6, 'minutes'));
    const maxDate = d(anchor.clone().add(6, 'minutes'));

    const tasks: Item[] = [
        { key: 0, row: 0, start: d(anchor.clone().subtract(30, 'seconds')), end: d(anchor.clone().add(30, 'seconds')) },
        { key: 1, row: 1, start: d(anchor.clone().subtract(60, 'seconds')), end: d(anchor.clone().add(30, 'seconds')) },
        { key: 2, row: 2, start: d(anchor.clone().subtract(30, 'seconds')), end: d(anchor.clone().add(60, 'seconds')) },
        { key: 3, row: 3, start: d(anchor.clone().subtract(40, 'seconds')), end: d(anchor.clone().add(10, 'seconds')) },
    ];

    return (
        <>
            <div style={{ margin: 24 }}>
                <Form size="mini">
                    <Form.Field>
                        <Checkbox
                            label="Now marker live update"
                            checked={nowMarkerLiveUpdate}
                            onChange={() => setNowMarkerLiveUpdate(!nowMarkerLiveUpdate)}
                            data-testid={nowMarkerStoriesTestIds.liveUpdateCheckbox}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            type="number"
                            label="Now marker live update interval"
                            value={nowMarkerLiveUpdateInterval}
                            onChange={(e, { value }) => setNowMarkerLiveUpdateInterval(Number(value)) }
                        />
                    </Form.Field>
                </Form>
            </div>

            <Timeline
                showCursorTime={false}
                componentId="r9k1"
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                maxDate={maxDate}
                groups={manyHumanResources.slice(0, 4)}
                items={tasks}
                table={
                    <Table width={115}>
                        <Column
                            columnKey="title"
                            width={100}
                            header={<DataCell>Title</DataCell>}
                            cell={({ rowIndex }) => (
                                <DataCell>{rowIndex < 4 ? manyHumanResources[rowIndex].title : ''}</DataCell>
                            )}
                        />
                    </Table>
                }
                backgroundLayer={
                    <BackgroundLayer
                        nowMarker
                        nowMarkerLiveUpdate={nowMarkerLiveUpdate}
                        nowMarkerLiveUpdateInterval={nowMarkerLiveUpdateInterval}
                    />
                }
            />
        </>
    );
};