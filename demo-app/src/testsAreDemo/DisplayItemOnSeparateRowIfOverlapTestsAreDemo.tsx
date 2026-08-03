import { Only, Scenario, ScenarioOptions, render, tad } from "@famiprog-foundation/tests-are-demo"
import { FALSE, Main, ONLY_FOR_SELECTED, TRUE, setSelectedRow } from "../stories/displayItemOnSeparateRowIfOverlap/DisplayItemOnSeparateRowIfOverlap.stories";
import { displayItemOnSeparateRowIfOverlapStoryTestIds } from "../stories/displayItemOnSeparateRowIfOverlap/DisplayItemOnSeparateRowIfOverlap.stories";
import { DEFAULT_ITEM_HEIGHT, DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, timelineTestids } from "../../../src/timeline";

export class DisplayItemOnSeparateRowIfOverlapTestsAreDemo {

    async before() {
        render(<Main/>);
    }

    @Scenario("GIVEN there are some segments (items) for which the periods overlap ...")
    async _() {
    }

    /**
     * This is the default behavior.
     *
     * @img displayItemOnSeparateRowIfOverlap_dropdown_click_true
     */
    @Scenario("..., AND displayItemOnSeparateRowIfOverlap is true, WHEN render, THEN they are drawn on different rows, to avoid overlapping")
    async givenTrue() {
        // We need to actual click on true, because even if this property is true by default and even if the test passes when on a first run, it will fail if run second time
        let dropdown = tad.screenCapturing.getByTestId(displayItemOnSeparateRowIfOverlapStoryTestIds.displayItemOnSeparateRowDropdown);
        tad.userEventWaitable.click(dropdown);
        tad.userEventWaitable.click(tad.withinCapturing(dropdown).getByRole("option", { name: TRUE }));

        // Rows expand to fit all the segments
        let ganttBody = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.ganttBody);
        await tad.assertWaitable.approximately(tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_0").offsetHeight, DEFAULT_ITEM_HEIGHT + 2 * DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);
        await tad.assertWaitable.approximately(tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1").offsetHeight, 2 * DEFAULT_ITEM_HEIGHT + 3 * DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);
        await tad.assertWaitable.approximately(tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_2").offsetHeight, 2 * DEFAULT_ITEM_HEIGHT + 3 * DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);

        // Segments that overlap are positioned on different sub-rows
        let item = tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1");
        await tad.assertWaitable.approximately(tad.withinCapturing(item).getByTestId('r9k1_' + timelineTestids.item + "_3").offsetTop, DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);

        item = tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1");
        await tad.assertWaitable.approximately(tad.withinCapturing(item).getByTestId('r9k1_' + timelineTestids.item + "_11").offsetTop, DEFAULT_ITEM_HEIGHT + 2 * DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);

        item = tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1");
        await tad.assertWaitable.approximately(tad.withinCapturing(item).getByTestId('r9k1_' + timelineTestids.item + "_4").offsetTop, DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);
    }

    /**
     * The z index of the segments can be specified (via a callback), so that we can have a deterministic order on the z/depth axis. If you customize `displayItemOnSeparateRowIfOverlap` then you should also use ???.
     *
     * It may also be interesting to play w/ transparency (alpha) of your renderers. E.g. it may be interesting for the ones that are rather on top, to be (a bit) transparent.
     *
     * @img displayItemOnSeparateRowIfOverlap_dropdown_click_false
     */
    @Scenario("..., AND displayItemOnSeparateRowIfOverlap is false, WHEN render, THEN they overlap as well")
    async givenFalse() {
        let dropdown = tad.screenCapturing.getByTestId(displayItemOnSeparateRowIfOverlapStoryTestIds.displayItemOnSeparateRowDropdown);
        tad.userEventWaitable.click(dropdown);
        tad.userEventWaitable.click(tad.withinCapturing(dropdown).getByRole("option", { name: FALSE }));

        // Rows are short
        let ganttBody = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.ganttBody);
        await tad.assertWaitable.approximately(tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1").offsetHeight, DEFAULT_ITEM_HEIGHT + 2 * DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);
        await tad.assertWaitable.approximately(tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_2").offsetHeight, DEFAULT_ITEM_HEIGHT + 2 * DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);

        // All segments are positioned on the same subrow, even if they overlap
        let item = tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1");
        await tad.assertWaitable.approximately(tad.withinCapturing(item).getByTestId('r9k1_' + timelineTestids.item + "_3").offsetTop, DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);

        item = tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1");
        await tad.assertWaitable.approximately(tad.withinCapturing(item).getByTestId('r9k1_' + timelineTestids.item + "_11").offsetTop, DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);

        item = tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1");
        await tad.assertWaitable.approximately(tad.withinCapturing(item).getByTestId('r9k1_' + timelineTestids.item + "_4").offsetTop, DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);
    }

    /**
     * An example use case: have something like an expand/collapse for a row. E.g. w/ a +/- button in the table, or expanding the row that is currently selected.
     *
     * @img displayItemOnSeparateRowIfOverlap_dropdown_click_function
     */
    @Scenario("..., AND displayItemOnSeparateRowIfOverlap is a function, THEN it's used to decide about the overlapping behavior")
    async givenFunction() {
        let dropdown = tad.screenCapturing.getByTestId(displayItemOnSeparateRowIfOverlapStoryTestIds.displayItemOnSeparateRowDropdown);
        tad.userEventWaitable.click(dropdown);
        tad.userEventWaitable.click(tad.withinCapturing(dropdown).getByRole("option", { name: ONLY_FOR_SELECTED }));
        setSelectedRow(1)

        // All rows are short except the one selected
        let ganttBody = tad.screenCapturing.getByTestId('r9k1_' + timelineTestids.ganttBody);
        await tad.assertWaitable.approximately(tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_0").offsetHeight, DEFAULT_ITEM_HEIGHT + 2 * DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);
        await tad.assertWaitable.approximately(tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1").offsetHeight, 2 * DEFAULT_ITEM_HEIGHT + 3 * DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);
        await tad.assertWaitable.approximately(tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_2").offsetHeight, DEFAULT_ITEM_HEIGHT + 2 * DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);

        // Segments that overlapp are positioned on different sub-rows, on the selected row
        let row = tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1");
        await tad.assertWaitable.approximately(tad.withinCapturing(row).getByTestId('r9k1_' + timelineTestids.item + "_3").offsetTop, DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);

        row = tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1");
        await tad.assertWaitable.approximately(tad.withinCapturing(row).getByTestId('r9k1_' + timelineTestids.item + "_11").offsetTop, DEFAULT_ITEM_HEIGHT + 2 * DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);

        row = tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_1");
        await tad.assertWaitable.approximately(tad.withinCapturing(row).getByTestId('r9k1_' + timelineTestids.item + "_4").offsetTop, DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);

        // And on the same subrow, on the other not selected rows
        row = tad.withinCapturing(ganttBody).getByTestId('r9k1_' + timelineTestids.row + "_2");
        await tad.assertWaitable.approximately(tad.withinCapturing(row).getByTestId('r9k1_' + timelineTestids.item + "_12").offsetTop, DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);
        await tad.assertWaitable.approximately(tad.withinCapturing(row).getByTestId('r9k1_' + timelineTestids.item + "_6").offsetTop, DEFAULT_VERTICAL_GAP_BETWEEN_OVERLAPPING_ITEMS, 1);
    }
}
