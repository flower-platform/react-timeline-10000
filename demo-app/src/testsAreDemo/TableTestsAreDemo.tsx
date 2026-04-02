import { Scenario, render, tad } from "@famiprog-foundation/tests-are-demo";
import { assert } from "chai";
import { Table } from "fixed-data-table-2";
import { ProvidingCustomTable } from "../stories/table/Table.stories";
import { DEMO_TABLE_WIDTH, tableTestIds } from "../stories/table/TableScenarios";
import { timelineTestids as testids } from "../../../src/timeline";

export class TableTestsAreDemo {
    async before() {
        render(<ProvidingCustomTable/>);
        // When pressing run the second time the state of the scrollbars are not reset
        // I thought that render() should reset its state, but it doesn't.
        tad.screenCapturing.getByTestId('r9k1_' + testids.ganttBody).scroll({top:0});
        // TODO DB By running the tests second time, the SplitPane test fails because we need to reset its position
        // Maybe a general mechanism of test sate reset is needed
    }
    
    @Scenario("Both table and gantt diagram have same rows height")
    async bothTableAndGanttHaveSameRowHeight() {
        // Nu le putem verifica pe toate caci gridul este virtualizat
        for (var i = 0; i < 5; i++)  {
            let ganttRow = tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_" + i);
            let tableCell = tad.screenCapturing.getByTestId(tableTestIds.row + "_" + i);
            if (i < 4) { 
                tad.cc("Table row "  + (i + 1) + " and  gantt row " + (i + 1) + " have same height");
            } else {
                tad.cc("And so on... ");
            }
            await tad.assertWaitable.approximately(ganttRow.offsetHeight, (tableCell as HTMLElement).offsetHeight, 1);
        }
    }

    @Scenario("When scrolling in gantt the table is scrolled")
    async whenScrollInGanttThenTableIsScrolled() {
        // We don't focus on last element captured because its height occupies the entire page
        // And the message appears under the gantt and is hidded by the scroll mechanism 
        await tad.showSpotlight({ message: "Gantt is scrolled => Table is scrolled accordingly", focusOnLastElementCaptured: false });
        tad.screenCapturing.getByTestId('r9k1_' + testids.ganttBody).scroll({top:100});
    
        // This is needed in order for the scroll handler to be triggerd before the verification  
        await new Promise(r => setTimeout(r, 20));

        // We "cheated" here because
        // There is no strait forward way to see the scroll position by looking at the html elements
        // Because the table has a special type of scrolling mechanism by absolute positioning (with translate3d) 
        // the rows. 
        // We could have looked at the position of the first row but it was offseted with the
        // height of the header in order to appear right under it. So we should have placed a data-testid on the header also
        // but being in a third library component this was not simple to implement
        assert.approximately((tad.getObjectViaCheat(Table, 'r9k1') as Table).props.scrollTop, 100, 1);
    }

    @Scenario("When scrolling in table the gantt is scrolled")
    async whenScrollInTableThenGanttIsScrolled() {
        await tad.showSpotlight({ message: "Table is scrolled => Gantt is scrolled accordingly", focusOnLastElementCaptured: false });
        (tad.getObjectViaCheat(Table, 'r9k1')as Table).scrollActions.scrollToY(110);
        assert.approximately(tad.screenCapturing.getByTestId('r9k1_' + testids.ganttBody).scrollTop, 110, 1);
    }

    @Scenario("When drag the split pane the table is resized accordingly")
    async whenDragTheSplitPaneTheTableIsResizedAccordingly() {
        tad.cc("Split pane resizer is dragged");

        await tad.drag(tad.screenCapturing.getByTestId(testids.splitPaneResizer), { delta: { x: 150, y: 0 }});
        // We don't understand why there is a difference of some decimals (maximum 1 px) between the expected width and the actual width. 
        // But this is a problem that was seen before
        await tad.assertWaitable.approximately((tad.getObjectViaCheat(Table, 'r9k1')as Table).props.width, DEMO_TABLE_WIDTH + 150, 1);
    }
}