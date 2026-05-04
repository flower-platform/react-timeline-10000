import { Table, Column, DataCell} from 'fixed-data-table-2';
import { generateRandomRowsAndItems, lotsOfGroups, lotsOfItems } from "../sampleData";
import { Group, Item, Timeline } from '@famiprog-foundation/react-gantt';
import { Button } from 'semantic-ui-react';
import { useState } from 'react';
import moment from 'moment';
import { createTestids } from '@famiprog-foundation/tests-are-demo';
import { generateRandomRow } from '../sampleData';

export default {
    title: 'Features/Dynamic Configuration',
    includeStories: /^[A-Z]/
};

export const testIds = createTestids('DynamicConfigurationStory', {
    changeDisplayIntervalButton: '',
    changeVerticalScrollPosition: ''
});

export const Main = () => {
    const [hoursAddition, setHoursAddition] = useState<number>(0);
    const [verticalScrollPosition, setVerticalScrollPosition] = useState<number>(0);
    const [rowsAndItems, setRowsAndItems] = useState<[Group[], Item[]]>([lotsOfGroups, lotsOfItems]);
    return <>
            <div>
                <Button primary data-testid={testIds.changeDisplayIntervalButton} onClick={() => setHoursAddition(hoursAddition + 1)}>
                    Change display interval: + 1 day
                </Button>
                <Button primary data-testid={testIds.changeVerticalScrollPosition} onClick={() => setVerticalScrollPosition(verticalScrollPosition == 0 ? 3010 : 0)}>
                    Change vertical scroll position
                </Button>
                <Button primary onClick={() => setRowsAndItems(generateRandomRowsAndItems(100, 30, true, 60, moment('2018-07-31'),  moment('2018-10-30')))}>
                    Reset data provider
                </Button>
                <Button primary onClick={() => {
                    var newRowAndItems = generateRandomRow(rowsAndItems[0].length, 30, true, 60, moment('2018-07-31'),  moment('2018-10-30'));
                    setRowsAndItems([[...rowsAndItems[0], newRowAndItems[0]], [...rowsAndItems[1], ...newRowAndItems[1]]]);
                }}>
                    Add one new row
                </Button>
            </div>
            <Timeline 
                startDate={moment('2018-08-31').clone().add(hoursAddition, 'day').valueOf()} 
                endDate={moment('2018-09-30').clone().add(hoursAddition, 'day').valueOf()}
                groups={rowsAndItems[0]} items={rowsAndItems[1]}
                verticalScrollPosition={verticalScrollPosition}
                table={<Table width={150} >
                            <Column
                                columnKey="title"
                                width={150}
                                header={<DataCell>Title</DataCell>}
                                cell={({rowIndex}) => <DataCell>{rowIndex < rowsAndItems[0].length ? rowsAndItems[0][rowIndex].title : ""}</DataCell>}/>
                        </Table>}>
            </Timeline>
        </>
}