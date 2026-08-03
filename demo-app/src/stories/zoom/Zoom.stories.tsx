import React, { useState } from 'react';
import { timelineScenarios } from '../TimelineScenarios';
import { d, someHumanResources, someTasks } from '../sampleData';
import { Table, Column, DataCell } from 'fixed-data-table-2';
import Timeline from '../../../../src/timeline';
import SplitPane from 'react-split-pane';
import { Checkbox, Form, Radio } from 'semantic-ui-react';
import { createTestids } from '@famiprog-foundation/tests-are-demo';

export default {
    title: 'Features/Zoom'
};

export const zoomStoriesTestIds = createTestids('ZoomStory', {zoomEnabledCheckbox:''});

export const Main = () => {
    const [zoomEnabled, setZoomEnabled] = useState<boolean|(() => boolean)>(true);
    const handleZoomEnabledChange = (e, { value }) => {
        if (zoomEnabled) {
            setZoomEnabled(false);
        } else {
            // Here, we could directly set the `zoomEnabled` to `true`. 
            // We set it to a function only to demonstration purposes.
            setZoomEnabled(() => true);
        }
    };
    return (
        <>
            <Form size="mini">
                <Form.Field>
                    <Checkbox 
                        label='Zoom enabled'
                        checked={typeof zoomEnabled === 'boolean' && zoomEnabled ||  typeof zoomEnabled === 'function' && zoomEnabled()}
                        onChange={handleZoomEnabledChange}
                        data-testid={zoomStoriesTestIds.zoomEnabledCheckbox}
                    />
                </Form.Field>
            </Form>
            {/* position: 'relative' was needed because the split pane was overlapping the split pane because of its absolute positioning */}
            <SplitPane defaultSize={"50%"} style={{ position: 'relative' }}>
                <Timeline componentId='1' startDate={d('2018-09-20 00:00:00')} endDate={d('2018-09-21 23:59:59')} groups={someHumanResources} items={someTasks} showZoomShortcuts={true}
                    zoomEnabled={zoomEnabled}
                    table={<Table width={100} >
                        <Column
                            columnKey="title"
                            width={100}
                            header={<DataCell>Title</DataCell>}
                            cell={({ rowIndex }) => <DataCell>{rowIndex < someHumanResources.length ? someHumanResources[rowIndex].title : ""}</DataCell>} />
                    </Table>}
                />
                <Timeline componentId='2' startDate={d('2018-09-20 00:00:00')} endDate={d('2018-09-21 23:59:59')} groups={someHumanResources} items={someTasks} showZoomShortcuts={true}
                    zoomEnabled={zoomEnabled}
                    table={<Table width={100} >
                        <Column
                            columnKey="title"
                            width={100}
                            header={<DataCell>Title</DataCell>}
                            cell={({ rowIndex }) => <DataCell>{rowIndex < someHumanResources.length ? someHumanResources[rowIndex].title : ""}</DataCell>} />
                    </Table>}
                />
            </SplitPane>
        </>
    );
};

Main.parameters = {
    scenarios: [
        timelineScenarios.propertyShowZoomShortcuts,
    ]
};
